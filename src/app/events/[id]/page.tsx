import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function EventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: { status?: string };
}) {
  const { id } = await params;
  const status = searchParams?.status;

  const event = await prisma.event.findFirst({
    where: { id },
  });

  if (!event) {
    return <div className="text-white p-10">Event not found</div>;
  }

  const count = await prisma.registration.count({
    where: { eventId: id },
  });

  const isFull = count >= event.maxParticipants;
  const seatsLeft = event.maxParticipants - count;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">

      {/* EVENT INFO */}
      <div className="max-w-5xl mx-auto mb-10">
        <img
          src={event.posterUrl}
          alt="poster"
          className="w-full h-[300px] object-cover rounded-2xl shadow-lg"
        />

        <h1 className="text-4xl font-bold mt-6">{event.title}</h1>
        <p className="text-gray-400 mt-2">{event.description}</p>

        <div className="flex gap-4 mt-4 text-sm text-gray-300 flex-wrap">
          <span>📅 {new Date(event.date).toDateString()}</span>
          <span>💰 ₹{event.price}</span>
          <span>👥 {count}/{event.maxParticipants}</span>
        </div>

        <p className={`mt-3 font-semibold ${
          isFull ? "text-red-400" : "text-green-400"
        }`}>
          {isFull ? "❌ No seats left" : `🔥 ${seatsLeft} seats left`}
        </p>
      </div>

      {/* STATUS */}
      <div className="max-w-2xl mx-auto mb-4">
        {status === "success" && (
          <p className="text-green-400">✅ Registered successfully</p>
        )}
        {status === "duplicate" && (
          <p className="text-yellow-400">⚠️ Already registered</p>
        )}
        {status === "full" && (
          <p className="text-red-400">❌ Event full</p>
        )}
      </div>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-white/5 p-6 rounded-2xl">

        <h2 className="text-2xl font-semibold mb-4">Register Now</h2>

        <form
          action={async (formData) => {
            "use server";

            const name = formData.get("name") as string;
            const rollNo = formData.get("rollNo") as string;
            const email = formData.get("email") as string;
            const phone = formData.get("phone") as string;

            const teamName = formData.get("teamName") as string;
            const member1 = formData.get("member1") as string;
            const member2 = formData.get("member2") as string;
            const member3 = formData.get("member3") as string;

            const file = formData.get("file") as File;

            // 🔥 UPLOAD TO CLOUDINARY
            const uploadForm = new FormData();
            uploadForm.append("file", file);

            const res = await fetch("http://localhost:3000/api/upload", {
              method: "POST",
              body: uploadForm,
            });

            const data = await res.json();
            const paymentUrl = data.secure_url as string;

            const teamInfo = [member1, member2, member3]
              .filter((m) => m && m.trim() !== "")
              .join(", ");

            const existing = await prisma.registration.findFirst({
              where: { email, eventId: id },
            });

            if (existing) {
              redirect(`/events/${id}?status=duplicate`);
            }

            const count = await prisma.registration.count({
              where: { eventId: id },
            });

            if (count >= event.maxParticipants) {
              redirect(`/events/${id}?status=full`);
            }

            await prisma.registration.create({
              data: {
                name,
                rollNo,
                email,
                phone,
                eventId: id,
                teamName: teamName || null,
                teamInfo: teamInfo || null,
                paymentUrl,
              },
            });

            redirect(`/events/${id}?status=success`);
          }}
          className="space-y-4"
        >
          <input name="name" placeholder="Name" className="input" required />
          <input name="rollNo" placeholder="Roll No" className="input" required />
          <input name="email" placeholder="Email" className="input" required />
          <input name="phone" placeholder="Phone" className="input" required />

          <input name="teamName" placeholder="Team Name" className="input" />
          <input name="member1" placeholder="Member 1" className="input" />
          <input name="member2" placeholder="Member 2" className="input" />
          <input name="member3" placeholder="Member 3" className="input" />

          {/* 🔥 FILE UPLOAD */}
          <input type="file" name="file" className="input" required />

          <button
            disabled={isFull}
            className={`w-full p-3 rounded-lg font-semibold ${
              isFull
                ? "bg-gray-600"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {isFull ? "Event Full ❌" : "Register 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}