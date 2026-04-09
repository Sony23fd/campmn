import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all active events
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type");

        // Default fetch future events that are open
        const whereClause: any = {
            isOpen: true,
        };

        if (type) {
            whereClause.eventType = type;
        }

        const events = await prisma.event.findMany({
            where: whereClause,
            orderBy: {
                startDate: "asc", // Show upcoming first
            },
            include: {
                _count: {
                    select: { registrations: true }
                }
            }
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}

// POST new event (Admin)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.title || !body.startDate || !body.eventType) {
            return NextResponse.json(
                { error: "Title, startDate, and eventType are required" },
                { status: 400 }
            );
        }

        const event = await prisma.event.create({
            data: {
                title: body.title,
                description: body.description,
                content: body.content,
                startDate: new Date(body.startDate),
                endDate: body.endDate ? new Date(body.endDate) : null,
                location: body.location,
                imageUrl: body.imageUrl,
                eventType: body.eventType,
                isOpen: body.isOpen ?? true,
                isFeatured: body.isFeatured ?? false,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}
