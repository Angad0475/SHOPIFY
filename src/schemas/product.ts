import { title } from "process"
import {z} from "zod"

export const ProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.coerce.number(),
    description: z.string(),
    category: z.string(),
    image: z.string().url(),
    rating: z.object({
        rate: z.number(),
        count: z.number(),
    })
})

export type Product = z.infer<typeof ProductSchema>