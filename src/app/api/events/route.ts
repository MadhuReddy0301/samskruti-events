import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET EVENTS
export async function GET() {
  const events = await prisma.event.findMany();
  console.log("GET EVENTS:", events);
  return NextResponse.json(events);
}

// CREATE EVENT
export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const event = await prisma.event.create({
      data: {
        title: String(body.title),
        description: String(body.description),
        branch: String(body.branch),
        price: Number(body.price),
        date: new Date(body.date || Date.now()),
        maxParticipants: Number(body.maxParticipants || 0),
        posterUrl: "",
        videoUrl: body.videoUrl || null,
      },
    });

    console.log("EVENT CREATED:", event);

    return NextResponse.json(event);
  } catch (error: any) {
    console.log("ERROR FULL:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}