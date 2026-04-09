import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const faqs = await prisma.faq.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const faq = await prisma.faq.create({
            data: {
                question: data.question,
                answer: data.answer,
                category: data.category || "Ерөнхий",
                order: data.order || 0,
                isActive: true,
            },
        });
        return NextResponse.json(faq, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
