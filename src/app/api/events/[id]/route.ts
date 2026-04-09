import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        const data = await request.json();
        
        let startDate;
        try {
            startDate = new Date(data.startDate).toISOString();
        } catch (e) {
            startDate = new Date().toISOString(); 
        }

        const event = await prisma.event.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                content: data.content,
                startDate: startDate,
                endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
                location: data.location,
                imageUrl: data.imageUrl,
                eventType: data.eventType,
                isOpen: data.isOpen !== undefined ? data.isOpen : true,
                isFeatured: data.isFeatured !== undefined ? data.isFeatured : false,
            },
        });
        return NextResponse.json(event);
    } catch (error) {
        console.error("Error updating event:", error);
        return NextResponse.json({ error: "Арга хэмжээний мэдээллийг шинэчлэхэд алдаа гарлаа" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;
        await prisma.event.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting event:", error);
        return NextResponse.json({ error: "Арга хэмжээг устгахад алдаа гарлаа" }, { status: 500 });
    }
}
