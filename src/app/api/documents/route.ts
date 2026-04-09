import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const docs = await prisma.document.findMany({
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
        return NextResponse.json(docs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string;
        const documentType = formData.get("documentType") as string || "LEGISLATION";
        let fileUrl = "";

        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Ensure directory exists
            const uploadDir = join(process.cwd(), "public", "uploads", "documents");
            try {
                await mkdir(uploadDir, { recursive: true });
            } catch (e) {}

            const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
            const path = join(uploadDir, filename);
            await writeFile(path, buffer);
            fileUrl = `/uploads/documents/${filename}`;
        }

        const doc = await prisma.document.create({
            data: {
                title,
                fileUrl,
                documentType,
            },
        });
        return NextResponse.json(doc, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
