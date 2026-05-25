import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, rollNo, branch, eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID missing" },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        name,
        email,
        phone,
        rollNo,
        branch,
        eventId, // VERY IMPORTANT
      },
    });

    return NextResponse.json({ success: true, registration });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Registration failed" },
      { status: 500 }
    );
  }
}