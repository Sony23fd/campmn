import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const params = await context.params;
    try {
        const data = await request.json();
        const item = await prisma.activityItem.update({
            where: { id: params.id },
            data: {
                title: data.title,
                content: data.content,
                imageUrl: data.imageUrl,
                order: data.order,
            },
        });
        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const params = await context.params;
    try {
        await prisma.activityItem.delete({ where: { id: params.id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
