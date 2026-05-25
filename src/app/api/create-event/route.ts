import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const event = await prisma.event.create({
    data: {
      title: body.title,
      description: body.description,
      branch: body.branch,
      price: Number(body.price),
      date: new Date(body.date),
      maxParticipants: Number(body.maxParticipants),
      posterUrl: body.posterUrl,
      videoUrl: body.videoUrl || "", // ✅ ADD THIS
    },
  });

  return NextResponse.json({ event });
}