import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all camps
export async function GET() {
    try {
        const camps = await prisma.camp.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(camps);
    } catch (error) {
        console.error("Error fetching camps:", error);
        return NextResponse.json(
            { error: "Failed to fetch camps" },
            { status: 500 }
        );
    }
}

// POST new camp (Admin)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Check if name is provided
        if (!body.name) {
            return NextResponse.json(
                { error: "Camp name is required" },
                { status: 400 }
            );
        }

        // Create actual camp
        const camp = await prisma.camp.create({
            data: {
                name: body.name,
                description: body.description,
                location: body.location,
                capacity: body.capacity ? parseInt(body.capacity) : null,
                establishedAt: body.establishedAt ? parseInt(body.establishedAt) : null,
                contactPhone: body.contactPhone,
                contactEmail: body.contactEmail,
                website: body.website,
                imageUrl: body.imageUrl,
                ageCategories: body.ageCategories,
                campDirection: body.campDirection,
                locationMapUrl: body.locationMapUrl,
                shiftsData: body.shiftsData,
                programsData: body.programsData,
                groupsData: body.groupsData,
                isActive: body.isActive ?? true,
            },
        });

        return NextResponse.json(camp, { status: 201 });
    } catch (error) {
        console.error("Error creating camp:", error);
        return NextResponse.json(
             { error: "Failed to create camp" },
             { status: 500 }
        );
    }
}
