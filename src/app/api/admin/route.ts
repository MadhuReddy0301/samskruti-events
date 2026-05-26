import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        id: "desc",
      },
    });

    return Response.json(registrations);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
}