import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const partners = await prisma.partner.findMany({
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(partners);
    } catch (error) {
        console.error("Error fetching partners:", error);
        return NextResponse.json({ error: "Хамтрагчдыг дуудахад алдаа гарлаа" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const partner = await prisma.partner.create({
            data: {
                name: data.name,
                type: data.type,
                logo: data.logo,
                isActive: data.isActive ?? true,
            },
        });
        return NextResponse.json(partner, { status: 201 });
    } catch (error) {
        console.error("Error creating partner:", error);
        return NextResponse.json({ error: "Хамтрагч үүсгэхэд алдаа гарлаа" }, { status: 500 });
    }
}
