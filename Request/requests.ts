import axios from "axios";
export async function getAllCategory() {
  const res = await axios.get("https://dummyjson.com/products/categories");
  return res;
}

export async function getAllProduct() {
  const res = await fetch("https://dummyjson.com/products");
  return (await res.json()).products;
}