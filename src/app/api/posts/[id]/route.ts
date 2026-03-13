import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        const data = await request.json();
        const updateData: any = {
            title: data.title,
            content: data.content || "",
            excerpt: data.excerpt,
            imageUrl: data.imageUrl,
            type: data.type,
            published: data.published !== undefined ? data.published : true,
        };

        if (data.createdAt) {
            updateData.createdAt = new Date(data.createdAt);
        }

        const post = await prisma.post.update({
            where: { id: params.id },
            data: updateData,
        });
        return NextResponse.json(post);
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Мэдээ мэдээллийг шинэчлэхэд алдаа гарлаа" }, { status: 500 });
    }
}

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
    try {
        const params = await props.params;
        await prisma.post.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Мэдээг устгахад алдаа гарлаа" }, { status: 500 });
    }
}
