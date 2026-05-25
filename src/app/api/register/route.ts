import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const registration = await prisma.registration.create({
      data: {
        name: body.name ,
        email: body.email,
        phone: body.phone,
        rollNo: body.rollNo,
        teamName: body.teamName ?? null,
        teamInfo: body.teamInfo ?? null,
        paymentUrl: body.paymentUrl,
        status: "pending",
      } as any ,
    });

    return NextResponse.json({
      success: true,
      registration,
    });

  } catch (error: any) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        error: "Registration failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}