"use client"

import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading"
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import { ChatCompletionMessage, ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

import { MessageCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

import { formSchema } from "./constants";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessage[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const userMessage: ChatCompletionMessageParam = {
            role: "user",
            content: values.prompt,
        }
        const newMessages = [...messages, userMessage]

        const response = await axios.post("/api/conversation", {
            messages: newMessages,
            api: secureLocalStorage.getItem('openapi')
        })

        setMessages((current) => [...current, userMessage, response.data])

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
            title="Conversation"
            description="Chat with AI"
            icon={MessageCircle}
            iconColor="text-green-500"
            bgColor="bg-green-500/20"
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
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input
                                            className="border-0 outline-none
                                            focus-visible:ring-0
                                            focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Send a message"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-span-2
                        w-full" disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="space-y-4 mt-4">
                {isLoading && (
                    <div className="p-8 rounded-lg w-full flex items-cemter justify-center bg-muted">
                        <Loader />
                    </div>
                )}
                {messages.length === 0 && !isLoading && (
                    <Empty label="No Conversation" />
                )}
                <div className="flex flex-col-reverse gap-y-4">
                    {messages.map((message) => (
                        <div 
                        key={message.content}
                        className={cn(
                            "p-8 w-full items-start gap-x-8 rounded-lg",
                            message.role === "assistant" ? "bg-muted"
                            : "bg-white border border-black/10"
                        )}
                        >
                            {message.role === "assistant" ? <BotAvatar />:
                            <UserAvatar /> }
                            <p className="text-sm mt-5">
                                {message.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConversationPage