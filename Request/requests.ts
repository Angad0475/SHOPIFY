import axios from "axios";

export async function getAllCategory() {
  const res = await axios.get("https://dummyjson.com/products/categories");
  return res.data;
}

export async function getAllProduct(limit: number, skip: number) {
  const res = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  return res.data.products;
}

export async function getProductsByCategory(
  category: string,
  // limit: number,
  // skip: number
) {
  const res = await axios.get(
    `https://dummyjson.com/products/category/${category}?limit=0`
  );
  return res.data.products;
}

export async function searchProduct(query: string) {
  const res = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return res.data.products;
}
