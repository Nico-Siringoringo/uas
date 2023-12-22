"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { 
    LayoutDashboard, 
    MessageCircle,
    ImageIcon,
    Music2Icon,
    VideoIcon,
    Code2Icon,
    Settings } 
from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const poppins = Poppins({ 
    weight : "600",
    subsets : ["latin"]
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageCircle,
        href: "/conversation",
        color: "text-green-500",
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-red-500",
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-indigo-400",
    },
    {
        label: "Music Generation",
        icon: Music2Icon,
        href: "/music",
        color: "text-rose-500",
    },
    {
        label: "Code Generation",
        icon: Code2Icon,
        href: "/code",
        color: "text-blue-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings"
    }
]

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 flex flex-col h-full
    bg-[#111827] text-white">
        <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex
            items-center pl-3 mb-14">
                <div className="relative w-6 h-6 mr-3 ml-10">
                   <Image 
                    fill
                    alt="Logo"
                    src="/logo.png"
                   />
                </div>
                <h1 className={cn("text-2xl font-bold", poppins.className)}>
                    Power
                </h1>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text
                bg-gradient-to-l from-[#3C00FF] to-[#860EE8]">
                    AI
                </h1>
            </Link>
            <div className="space-y-1">
                {routes.map((route) => (
                    <Link 
                      href={route.href}
                      key={route.href}
                      className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                        pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                      )}
                    >
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                            {route.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar