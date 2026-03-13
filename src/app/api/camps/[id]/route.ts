import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        const camp = await prisma.camp.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                location: data.location,
                capacity: data.capacity ? parseInt(data.capacity.toString(), 10) : null,
                establishedAt: data.establishedAt ? parseInt(data.establishedAt.toString(), 10) : null,
                contactPhone: data.contactPhone,
                contactEmail: data.contactEmail,
                website: data.website,
                imageUrl: data.imageUrl,
                ageCategories: data.ageCategories,
                campDirection: data.campDirection,
                locationMapUrl: data.locationMapUrl,
                shiftsData: data.shiftsData,
                programsData: data.programsData,
                groupsData: data.groupsData,
                isActive: data.isActive !== undefined ? data.isActive : true,
            },
        });
        return NextResponse.json(camp);
    } catch (error) {
        console.error("Error updating camp:", error);
        return NextResponse.json({ error: "Зуслангийн мэдээллийг шинэчлэхэд алдаа гарлаа" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await prisma.camp.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting camp:", error);
        return NextResponse.json({ error: "Зусланг устгахад алдаа гарлаа" }, { status: 500 });
    }
}
