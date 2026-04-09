import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(request: Request, context: { params: { id: string } }) {
    const params = await context.params;
    try {
        const doc = await prisma.document.findUnique({ where: { id: params.id } });
        if (doc?.fileUrl) {
            try {
                const oldPath = join(process.cwd(), "public", doc.fileUrl);
                await unlink(oldPath);
            } catch (e) {}
        }

        await prisma.document.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
    const params = await context.params;
    try {
        const contentType = request.headers.get("content-type") || "";
        
        // Handle simple JSON for order updates (quick sort)
        if (contentType.includes("application/json")) {
            const body = await request.json();
            const doc = await prisma.document.update({
                where: { id: params.id },
                data: { order: typeof body.order === 'number' ? body.order : undefined }
            });
            return NextResponse.json(doc);
        }

        // Handle full edit with FormData
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const documentType = formData.get("documentType") as string;
        const file = formData.get("file") as File | null;
        const order = formData.get("order") ? parseInt(formData.get("order") as string) : undefined;

        const currentDoc = await prisma.document.findUnique({ where: { id: params.id } });
        if (!currentDoc) return NextResponse.json({ error: "Not found" }, { status: 404 });

        let fileUrl = currentDoc.fileUrl;

        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Delete old file if exists
            if (currentDoc.fileUrl) {
                try {
                    const oldPath = join(process.cwd(), "public", currentDoc.fileUrl);
                    await unlink(oldPath);
                } catch (e) {}
            }

            const uploadDir = join(process.cwd(), "public", "uploads", "documents");
            const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const path = join(uploadDir, filename);
            await writeFile(path, buffer);
            fileUrl = `/uploads/documents/${filename}`;
        }

        const updatedDoc = await prisma.document.update({
            where: { id: params.id },
            data: {
                title: title || undefined,
                documentType: documentType || undefined,
                fileUrl: fileUrl,
                order: order,
            },
        });

        return NextResponse.json(updatedDoc);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
