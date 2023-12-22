"use client"

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading"
import { useRouter } from "next/navigation";

import { Download, ImageIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema, resolutionOptions, styleOptions } from "./constants";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";

import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import secureLocalStorage from "react-secure-storage";

const ImagePage = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        prompt: "",
        style: "vivid",
        resolution: "1024x1024"
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        setImages([]);

        const response = await axios.post("/api/image", {
            prompt: values.prompt,
            style: values.style,
            resolution: values.resolution,
            api: secureLocalStorage.getItem('openapi')
        });

        const urls = response.data.map((image: {url: string }) => image.url);
        setImages(urls);

        form.reset()
    } catch (error: any) {
        console.log(error);
        form.reset()
    } finally {
        router.refresh();
    }
  };

  return (
    <div>
        <Heading
            title="Image Generation"
            description="Transform your imagination into images using AI"
            icon={ImageIcon}
            iconColor="text-red-500"
            bgColor="bg-red-500/20"
        />
        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                        rounded-lg
                        border
                        w-full
                        p-4
                        px-3 md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                        "
                    >
                        <FormField 
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-12">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none
                                            focus-visible:ring-0
                                            focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="A picture of a lion"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="style"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {styleOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="resolution"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-6">
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value}/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                >
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-12
                        w-full" disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-20">
                        <Loader />
                    </div>
                )}
                {images.length === 0 && !isLoading && (
                    <Empty label="No Images Generated" />
                )}
                <div className="mt-8f">
                    {images.map((src) => (
                        <Card
                            key={src}
                            className="rounded-lg overflow-hidden"
                        >
                            <div className="relative aspect-square">
                                <Image
                                    alt="image"
                                    fill
                                    src={src}
                                    className="object-contain"
                                />
                            </div>
                            <CardFooter className="p-2">
                                <Button
                                onClick={() => window.open(src)} 
                                variant="secondary" 
                                className="w-full"
                                >
                                    <Download className="h-4 w-4 mr-2"/>
                                        Download
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImagePage