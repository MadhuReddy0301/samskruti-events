import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const name = formData.get("name") as string;
  const rollNo = formData.get("rollNo") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  const teamName = formData.get("teamName") as string;
  const member1 = formData.get("member1") as string;
  const member2 = formData.get("member2") as string;
  const member3 = formData.get("member3") as string;

  const paymentUrl = formData.get("paymentUrl") as string;
  const eventId = formData.get("eventId") as string;

  const teamInfo = [member1, member2, member3]
    .filter((m) => m && m.trim() !== "")
    .join(", ");

  await prisma.registration.create({
    data: {
      name,
      rollNo,
      email,
      phone,
      eventId,
      teamName: teamName || null,
      teamInfo: teamInfo || null,
      paymentUrl,
    },
  });

  return NextResponse.json({ success: true });
}