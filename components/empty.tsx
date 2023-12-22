import Image from "next/image";

interface EmptyProps {
    label: string;
}

import { Poppins } from "next/font/google";

const poppins = Poppins({ 
    weight : "600",
    subsets : ["latin"]
})

export const Empty = ({
    label
}: EmptyProps) => {
    return (
       <div className="h-full p-20 flex flex-col items-center mt-10
       justify-center">
        <div className="relative h-[60px] w-[60px]">
            <Image
                alt="empty"
                fill
                src="/logo.png"
            />
        </div>
        <p className="text-muted-foreground text-md text-center mt-10">
            {label}
        </p>
       </div> 
    );
}