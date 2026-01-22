import axios from "axios";
export async function getAllCategory() {
  const res = await axios.get("https://dummyjson.com/products/categories");
  return res.data;//.categories
}

export async function getAllProduct() {
  const res = await axios.get("https://dummyjson.com/products?limit=0");
  return res.data.products;
}

export async function searchProduct(query: string) {
  const res = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
  return res.data.products;
}