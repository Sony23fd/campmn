import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all registrations for a specific event
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: eventId } = await params;

        // Ensure the event exists
        const event = await prisma.event.findUnique({
            where: { id: eventId },
        });

        if (!event) {
            return NextResponse.json({ error: "Арга хэмжээ олдсонгүй" }, { status: 404 });
        }

        const registrations = await prisma.registration.findMany({
            where: { eventId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            eventTitle: event.title,
            eventType: event.eventType,
            registrations,
        });
    } catch (error) {
        console.error("Error fetching event registrations:", error);
        return NextResponse.json(
            { error: "Бүртгэлүүдийг татахад алдаа гарлаа." },
            { status: 500 }
        );
    }
}
