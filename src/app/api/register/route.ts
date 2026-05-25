import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { name, email, phone, rollNo, branch, eventId } = data;

    // Basic validation
    if (!name || !email || !phone || !rollNo || !branch || !eventId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newRegistration = await prisma.registration.create({
      data: {
        name,
        email,
        phone,
        rollNo,
        branch,
        eventId,
        paymentUrl: "", // important fix
      },
    });

    return NextResponse.json({
      message: "Registration successful",
      data: newRegistration,
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Registration failed", details: error.message },
      { status: 500 }
    );
  }
}