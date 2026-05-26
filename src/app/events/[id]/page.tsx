"use client";

import { useParams } from "next/navigation";

const events: any = {
  "1": {
    title: "Coding Hub",
    desc: "DSA Competition",
    price: "₹100",
    branch: "CSE",
    image:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
  },
  "2": {
    title: "Treasure Hunt",
    desc: "Find Treasure",
    price: "₹150",
    branch: "ECE",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
};

export default function EventPage() {
  const params = useParams();
  const event = events[params.id as string];

  if (!event) return <div className="text-white">Event not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-black text-white flex items-center justify-center p-10">
      
      <div className="grid md:grid-cols-2 gap-10 w-full max-w-6xl">

        {/* 🔥 LEFT SIDE (EVENT CARD) */}
        <div className="bg-[#111827]/70 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
          
          <img
            src={event.image}
            className="w-full h-64 object-cover"
          />

          <div className="p-6 space-y-3">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-gray-400">{event.desc}</p>

            <div className="text-gray-300 space-y-1 mt-3">
              <p>💰 {event.price}</p>
              <p>🎓 {event.branch}</p>
              <p>📅 Sep 09 2026</p>
            </div>
          </div>
        </div>

        {/* 🔥 RIGHT SIDE (FORM) */}
        <div className="bg-[#111827]/70 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
          
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register Now ✨
          </h2>

          <form className="space-y-4">
            <input className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Name" />
            <input className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Email" />
            <input className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Phone" />
            <input className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Roll No" />
            <input className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Branch" />

            <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition">
              Register →
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}