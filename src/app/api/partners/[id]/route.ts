import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const partner = await prisma.partner.update({
            where: { id },
            data: {
                name: data.name,
                type: data.type,
                logo: data.logo,
                isActive: data.isActive,
            },
        });
        return NextResponse.json(partner);
    } catch (error) {
        console.error("Error updating partner:", error);
        return NextResponse.json({ error: "Хамтрагчийн мэдээллийг шинэчлэхэд алдаа гарлаа" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await prisma.partner.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting partner:", error);
        return NextResponse.json({ error: "Хамтрагчийг устгахад алдаа гарлаа" }, { status: 500 });
    }
}
