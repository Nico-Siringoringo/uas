import * as z from "zod"

export const formSchema = z.object({
    openapi: z.string().min(1, {
      message: "API key is required"
    }),
    replicateapi: z.string().min(1, {
      message: "API key is required"
    })
})