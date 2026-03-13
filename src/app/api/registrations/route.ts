import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.eventId || !body.firstName || !body.lastName || !body.email || !body.phone) {
            return NextResponse.json(
                { error: "Бүх шаардлагатай талбаруудыг бөглөнө үү" },
                { status: 400 }
            );
        }

        // Check if event exists and is open
        const event = await prisma.event.findUnique({
            where: { id: body.eventId }
        });

        if (!event) {
            return NextResponse.json(
                { error: "Арга хэмжээ олдсонгүй" },
                { status: 404 }
            );
        }

        if (!event.isOpen) {
            return NextResponse.json(
                { error: "Энэхүү арга хэмжээний бүртгэл хаагдсан байна" },
                { status: 400 }
            );
        }

        // Create registration
        const registration = await prisma.registration.create({
            data: {
                eventId: body.eventId,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phone: body.phone,
                age: body.age ? parseInt(body.age.toString(), 10) : null,
                school: body.school,
            }
        });

        return NextResponse.json(registration, { status: 201 });
    } catch (error) {
        console.error("Error creating registration:", error);
        return NextResponse.json(
            { error: "Бүртгүүлэх үед алдаа гарлаа. Та дахин оролдоно уу." },
            { status: 500 }
        );
    }
}
