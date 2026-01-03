import axios from "axios";
import { Product, ProductSchema } from "@/schemas/product";

// Fetch all categories
export async function getAllCategory(): Promise<string[]> {
  try {
    const { data } = await axios.get<string[]>(
      "https://fakestoreapi.com/products/categories"
    );
    return data;
  } catch (err) {
    console.error("Failed to fetch categories", err);
    return [];
  }
}

// Fetch all products
export async function getAllProduct(): Promise<Product[]> {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    // Validate with Zod
    return ProductSchema.array().parse(data);
  } catch (err) {
    console.error("Failed to fetch or validate products", err);
    return [];
  }
}
