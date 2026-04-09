import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload path inside public
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure directory exists
        if (!fs.existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const ext = path.extname(file.name);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        // Return public URL path
        return NextResponse.json({ url: `/uploads/${fileName}` });
    } catch (e) {
        console.error("Upload error:", e);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}
