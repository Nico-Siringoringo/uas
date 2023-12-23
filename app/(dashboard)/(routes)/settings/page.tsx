"use client"

import Heading from "@/components/heading"
import secureLocalStorage from "react-secure-storage"

import { SettingsIcon } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { formSchema } from "./constants"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import CryptoJS from "crypto-js"

const SettingsPage = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      openapi: "",
      replicateapi: ""
    }
  })

  const { user } = useUser();
  const email = user?.primaryEmailAddress
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        secureLocalStorage.setItem("openapi", values.openapi)
        secureLocalStorage.setItem("replicateapi", values.replicateapi)

        await axios.post("/api/settings", {
          email: email,
          openai: CryptoJS.SHA256(values.openapi).toString(),
          replicateai: CryptoJS.SHA256(values.replicateapi).toString()
        })

        form.reset()
      } catch (err) {
        console.log(err)
        form.reset()
      } finally {
        router.refresh()
      }
  }

  const onDelete = async () => {
      try {
        await axios.post("/api/delete", { email: email })

      } catch (err) {
        console.log(err)
        form.reset()
      } finally {
        router.refresh()
      }
  }

  return (
    <div>
        <Heading
            title="Settings"
            description="Manage your API keys"
            icon={SettingsIcon}
            iconColor="text-gray-800"
            bgColor="bg-gray-700/20"
        />
        <div className="px-4 lg:px-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
              rounded-lg
              w-full
              p-4
              px-3 md:px-6
              focus-within:shadow-sm
              grid
              grid-row-2
              gap-4"
            >
              <FormField
                control={form.control}
                name="openapi"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormLabel className="font-semibold">OPENAI API</FormLabel>
                    <FormControl className="m-0 p-0">
                      <Input  type="password"
                              className="
                              border-0 outline"
                              {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Open this <Link className="text-blue-700 underline" href="https://platform.openai.com/api-keys">account/api-keys</Link> and sign in with your openai account to get the API key.
                      This key is <b>only stored locally in your device</b>. <br></br>
                      We recommend to <b>delete</b> your key after using this website. Click this link again <Link className="text-blue-700 underline" href="https://platform.openai.com/api-keys">account/api-keys</Link> and press delete button 
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="replicateapi"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormLabel className="font-semibold">REPLICATE API</FormLabel>
                    <FormControl className="m-0 p-0">
                      <Input  type="password"
                              className="
                              border-0 outline"
                              {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Open this <Link className="text-blue-700 underline" href="https://replicate.com/account/api-tokens">account/api-tokens</Link> and sign in with your github account to get the API key.
                      This key is <b>only stored locally in your device</b>. <br></br>
                      We recommend to <b>delete</b> your key after using this website. Click this link again <Link className="text-blue-700 underline" href="https://replicate.com/account/api-tokens">account/api-tokens</Link> and press delete button
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button>
                Save Settings
              </Button>
            </form>
          </Form>
          <Button 
          className="sm:ml-3 lg:ml-6 md:ml-6"
          onClick={onDelete}>
            Delete
          </Button>
        </div>
    </div>
  )
}

export default SettingsPage