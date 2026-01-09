import axios from "axios";
export async function getAllCategory() {
  const res = await axios.get("https://dummyjson.com/products/categories");
  return res.data;//.categories
}

export async function getAllProduct() {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data.products;
}