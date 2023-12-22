"use client";

import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";  

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav className="p-4 bg-transparent flex items-center
    justify-between">
        <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-3">
                <Image
                    fill
                    alt="Logo"
                    src="/logo.png"
                />
            </div>
            <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Power
            </h1>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text
                bg-gradient-to-l from-[#3C00FF] to-[#860EE8]">
                    AI
            </h1>
        </Link>
        <div className="flex items-center gap-x-2">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button  variant="destructive" className="rounded-full 
                bg-violet-700 text-white outline-none 
                hover:bg-violet-900">
                    Sign In
                </Button>
            </Link>
        </div>
    </nav>
  )
}

export default LandingNavbar
