import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// ✅ Fix for Vercel (important)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ✅ GET API
export async function GET() {
  try {
    const events = await prisma.event.findMany();

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}