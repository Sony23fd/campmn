import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: { id: string } }) {
    const params = await context.params;
    try {
        const data = await request.json();
        const faq = await prisma.faq.update({
            where: { id: params.id },
            data: {
                question: data.question,
                answer: data.answer,
                category: data.category,
                order: data.order,
                isActive: data.isActive,
            },
        });
        return NextResponse.json(faq);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
    const params = await context.params;
    try {
        await prisma.faq.delete({ where: { id: params.id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
