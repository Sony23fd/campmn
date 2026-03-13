import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany();

        // Массивийг {key: value} хэлбэр рүү хөрвүүлнэ (Урьдчилан ачаалахын тулд)
        const settingsMap = settings.reduce((acc, current) => {
            acc[current.key] = current.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(settingsMap);
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Тохиргоог дуудахад алдаа гарлаа" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Хандах эрхгүй байна" }, { status: 401 });
        }

        const data = await request.json();

        // key-value (Түлхүүр үг ба Утга) байдлаар хадгалах логик
        const updates = Object.entries(data).map(async ([key, value]) => {
            if (typeof value === 'string') {
                return prisma.siteSetting.upsert({
                    where: { key },
                    update: { value },
                    create: { key, value, description: `Сайтын тохиргоо: ${key}` }
                });
            }
        });

        await Promise.all(updates);

        return NextResponse.json({ success: true, message: "Тохиргоо амжилттай хадгалагдлаа" });
    } catch (error) {
        console.error("Error saving settings:", error);
        return NextResponse.json({ error: "Тохиргоо хадгалахад алдаа гарлаа" }, { status: 500 });
    }
}
