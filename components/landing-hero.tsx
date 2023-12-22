"use client";

import { useAuth } from "@clerk/nextjs"
import TypewriterComponent from "typewriter-effect";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
        <div className={cn("text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold", font.className)}>
            {/* <span>
                Power
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#3C00FF] to-[#860EE8]">
                AI
            </span> */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#3C00FF] to-[#860EE8]">
                    Power Up
                </span> 
                <span className="ml-2">
                    Yourself
                </span>
            </div>
            <div className="text-transparent bg-clip-text bg-gradient-to-tr from-black via-white to-black pb-2">
                <TypewriterComponent 
                    options={{
                        strings: [
                            "Text Generation",
                            "Code Generation",
                            "Music Generation",
                            "Video Generation",
                            "Image Generation"
                        ],
                        autoStart: true,
                        loop: true
                    }}
                />
            </div>
        </div>
        <div>
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant="purple" className="md-text-lg p-4 md:p-6 rounded-full font-semibold">
                    Get Started
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default LandingHero