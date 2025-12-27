// app/product/product-details/[id]/page.tsx
import ProductDetails from "@/components/product-details/productDetails";
import AddToCart from "../[id]/add-cart";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function ProductDetailsPage({ params }: Props) {
  // Fetch current product
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const product = await res.json();

  // Fetch related products (same category, exclude current product)
  const relatedRes = await fetch(
    `https://fakestoreapi.com/products/category/${product.category}`
  );
  let relatedProducts = await relatedRes.json();
  relatedProducts = relatedProducts.filter((p: any) => p.id !== product.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product details */}
      <ProductDetails product={product} />
      <br />
      <AddToCart product={product} />

      {/* Related products */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((item: any) => (
            <Link
              key={item.id}
              href={`/product/product-details/${item.id}`}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-sm font-medium line-clamp-2">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
