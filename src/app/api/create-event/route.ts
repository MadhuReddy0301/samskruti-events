import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        branch: body.branch,
        price: Number(body.price),
        date: new Date(body.date),
        maxParticipants: Number(body.maxParticipants),
        posterUrl: body.posterUrl || "",
        videoUrl: body.videoUrl || "",
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    return NextResponse.json({ success: false });
  }
}