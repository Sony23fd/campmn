import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const events = await prisma.timelineEvent.findMany({
            orderBy: { order: "asc" },
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch timeline events" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const event = await prisma.timelineEvent.create({
            data: {
                year: data.year,
                title: data.title,
                description: data.description,
                imageUrl: data.imageUrl,
                videoUrl: data.videoUrl,
                order: data.order || 0,
                isActive: data.isActive !== undefined ? data.isActive : true,
            },
        });
        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create timeline event" }, { status: 500 });
    }
}
