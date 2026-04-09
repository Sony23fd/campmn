import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const categories = await prisma.activityCategory.findMany({
            orderBy: { order: "asc" },
            include: {
                items: {
                    orderBy: { order: "asc" },
                },
            },
        });
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const slug = data.name
            .toLowerCase()
            .replace(/[^\u0430-\u044f\u04e9\u04af\u0451a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim() || `cat-${Date.now()}`;

        const category = await prisma.activityCategory.create({
            data: {
                name: data.name,
                slug,
                description: data.description || null,
                order: data.order || 0,
            },
        });
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
