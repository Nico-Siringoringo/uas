import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { email } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.api.findUnique({
      where: {
        email: email.emailAddress,
      },
    });

    if (user) {
      await prisma.api.delete({
        where: {
            email: email.emailAddress
        }
      });
    } else {
        return NextResponse.json("there is no data");
    }

    return NextResponse.json("success")
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
