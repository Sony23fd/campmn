import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const event = await prisma.timelineEvent.update({
            where: { id },
            data: {
                year: data.year,
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                videoUrl: data.videoUrl,
                order: data.order,
                isActive: data.isActive,
            },
        });
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update timeline event" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await prisma.timelineEvent.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete timeline event" }, { status: 500 });
    }
}
