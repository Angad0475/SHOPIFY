import { Product, ProductSchema } from "@/schemas/product";
import { error } from "console";

export async function getAllCategory() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  return res.json();
}

export async function getAllProduct(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) throw new Error("Failed to fetch products");

  const data: unknown = await res.json();

  try {
    return ProductSchema.array().parse(data);
  } catch (err) {
    console.error("Invalid product data", err);
    return [];
  }
}

