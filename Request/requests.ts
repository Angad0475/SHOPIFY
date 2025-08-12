export async function getAllCategory() {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  return res.json();
}

export async function getAllProduct() {
  const res = await fetch("https://fakestoreapi.in/api/products");
  return (await res.json()).products;
}
