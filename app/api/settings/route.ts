import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (
    req : Request
) {
    try {
        const { userId } = auth();
        const  body  = await req.json();
        const { email, openai, replicateai } = body;

        if (!userId) {
          return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await prisma.api.findUnique({
          where: {
            email: email.emailAddress,
          },
        });

        if (!user) {
            await prisma.api.create({
                data : {
                    email: email.emailAddress,
                    openai: openai,
                    replicateai: replicateai
                }
            })
        } else {
            await prisma.api.update({
                where: { email: email.emailAddress },
                data: { 
                    openai: openai,
                    replicateai: replicateai
                }
            })
        }

        return NextResponse.json('success')
        
    } catch (err) {
        console.error(err);
        return new NextResponse("Internal error", { status: 500 });
    }  
}