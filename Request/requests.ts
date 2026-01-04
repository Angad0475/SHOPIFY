import { Product, ProductSchema } from "@/schemas/product";

// Prevent static build-time fetch
export const dynamic = "force-dynamic";

async function safeJson(res: Response) {
  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error("Expected JSON but received HTML");
  }

  return res.json();
}

export async function getAllCategory(): Promise<string[]> {
  const res = await fetch(
    "https://fakestoreapi.com/products/categories",
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch categories");

  return safeJson(res);
}

export async function getAllProduct(): Promise<Product[]> {
  const res = await fetch(
    "https://fakestoreapi.com/products",
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  try {
    const data: unknown = await safeJson(res);
    return ProductSchema.array().parse(data);
  } catch (err) {
    console.error("Invalid product data", err);
    return [];
  }
}
