import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate"

export async function POST (
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, api } = body;

        const replicate = new Replicate({
            auth: api,
        });
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status : 500});
        }

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                prompt
              }
            }
        );

        return NextResponse.json(response);

    } catch (error) {
        console.log("[VIDEO_ERROR]", error);
        return new NextResponse("Internal error", { status : 500 });
    }
}