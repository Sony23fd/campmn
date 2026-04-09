import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const slug = data.title
            .toLowerCase()
            .replace(/[^\u0430-\u044f\u04e9\u04af\u0451a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim() || `item-${Date.now()}`;

        const item = await prisma.activityItem.create({
            data: {
                categoryId: data.categoryId,
                title: data.title,
                slug,
                content: data.content || "",
                imageUrl: data.imageUrl || null,
                order: data.order || 0,
            },
        });
        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
