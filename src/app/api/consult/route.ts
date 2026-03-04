import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { consultSubmission } from "@/schemas/consult";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = consultSubmission.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { fullName, email, phone, dateOfBirth, timezone, responses } =
      parsed.data;

    const consult = await prisma.consult.create({
      data: {
        fullName,
        email,
        phone,
        dateOfBirth: new Date(dateOfBirth),
        timezone,
        responses: {
          create: responses.map((r) => ({
            questionId: r.questionId,
            answer: r.answer,
          })),
        },
      },
      include: { responses: true },
    });

    return NextResponse.json(consult, { status: 201 });
  } catch (error) {
    console.error("Consult creation failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
