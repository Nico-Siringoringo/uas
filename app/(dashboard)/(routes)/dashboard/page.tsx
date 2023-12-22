"use client";

import { ArrowRight, Code2Icon, ImageIcon, MessageCircle, Music2Icon, VideoIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const features = [
  {
    label: "Conversation",
    icon: MessageCircle,
    color: "text-green-500",
    bgColor: "bg-green-500/20",
    href: "/conversation"
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-red-500",
    bgColor: "bg-red-500/20",
    href: "/image"
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/20",
    href: "/video"
  },
  
  {
    label: "Music Generation",
    icon: Music2Icon,
    color: "text-rose-500",
    bgColor: "bg-rose-500/20",
    href: "/music"
  },
  {
    label: "Code Generation",
    icon: Code2Icon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/20",
    href: "/code"
  }
]

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Experience the power of AI
        </h2>
        <p className="text-muted-foreground font-semibold text-sm
        md:text-lg text-center">
          Select one of these features
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {features.map((feature) => (
          <Card
            onClick={() => router.push(feature.href)}
            key={feature.href}
            className="p-4 border-black/5 flex items-center
            justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md",
                feature.bgColor
              )}>
                <feature.icon className={cn("w-8 h-8", feature.color)}/>
              </div>
              <div className="font-semibold">
                {feature.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DashboardPage;