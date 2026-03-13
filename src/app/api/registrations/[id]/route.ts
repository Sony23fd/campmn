import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT to update registration status (APPROVED/REJECTED)
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;
        const body = await request.json();

        if (!body.status) {
            return NextResponse.json(
                { error: "Төлөв (status) шаардлагатай" },
                { status: 400 }
            );
        }

        const updated = await prisma.registration.update({
            where: { id },
            data: { status: body.status },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating registration status:", error);
        return NextResponse.json(
            { error: "Бүртгэлийн төлөв өөрчлөхөд алдаа гарлаа." },
            { status: 500 }
        );
    }
}

// DELETE to remove a single registration
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        await prisma.registration.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting registration:", error);
        return NextResponse.json(
            { error: "Бүртгэл устгахад алдаа гарлаа." },
            { status: 500 }
        );
    }
}
