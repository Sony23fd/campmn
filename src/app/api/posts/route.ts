import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET published news/posts
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get("type") || "NEWS";
        const isAdmin = searchParams.get("admin") === "true";

        const whereClause: any = { type: type as any };
        if (!isAdmin) {
            whereClause.published = true;
        }

        const posts = await prisma.post.findMany({
            where: whereClause,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: {
                    select: { name: true, email: true },
                },
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

// POST new post/content (Admin)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.title || !body.slug || !body.content) {
            return NextResponse.json(
                { error: "Title, slug, and content are required" },
                { status: 400 }
            );
        }

        // Handle author automatically if not logged in
        let authorIdToUse = body.authorId;
        const existingAuthor = await prisma.user.findFirst({
            where: { id: authorIdToUse }
        });

        if (!existingAuthor) {
            // Find any valid user
            const fallbackUser = await prisma.user.findFirst();
            if (fallbackUser) {
                authorIdToUse = fallbackUser.id;
            } else {
                // Create a temporary default admin if database is completely empty
                const newAdminUser = await prisma.user.create({
                    data: {
                        email: "admin@zus.mn",
                        name: "System Admin",
                        role: "SUPERADMIN"
                    }
                });
                authorIdToUse = newAdminUser.id;
            }
        }

        const postData: any = {
            title: body.title,
            slug: body.slug,
            content: body.content,
            excerpt: body.excerpt,
            imageUrl: body.imageUrl,
            type: body.type || "NEWS",
            published: body.published ?? false,
            authorId: authorIdToUse,
        };

        if (body.createdAt) {
            postData.createdAt = new Date(body.createdAt);
        }

        const post = await prisma.post.create({
            data: postData,
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);

        // Prisma unique constraint violation code
        if ((error as any).code === 'P2002') {
            return NextResponse.json(
                { error: "A post with this slug already exists" },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}
