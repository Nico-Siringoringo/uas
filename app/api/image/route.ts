import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST (
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, style = "vivid", resolution = "1024x1024", api } = body;

        const openai = new OpenAI({
            apiKey: api,
        })
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("No API Key", { status : 500});
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status : 500});
        }

        if (!style) {
            return new NextResponse("Style is required", { status : 500});
        }

        if (!resolution) {
            return new NextResponse("Resolution is required", { status : 500});
        }

        const response = await openai.images.generate({
            prompt,
            style,
            model: "dall-e-3",
            n: 1,
            size: resolution,
        });

        return NextResponse.json(response.data);

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", { status : 500 });
    }
}