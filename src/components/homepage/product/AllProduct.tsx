"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "../../../../typing";
import { getProductsByCategory } from "../../../../Request/requests";

interface CategoryProductProps {
  categorySlug: string;
}

const Allproducts = ({ categorySlug }: CategoryProductProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProductByCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductsByCategory(categorySlug);
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProductByCategory();
  }, [categorySlug]);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="py-10 text-center text-gray-500">
        No products found in this category.
      </div>
    );
  }

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold capitalize mb-6">
        {categorySlug}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/product/product-details/${product.id}`)}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition"
          >
            <div className="relative h-48 mb-3">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover rounded"
              />
            </div>

            <h2 className="font-medium text-sm line-clamp-2">
              {product.title}
            </h2>

            <p className="mt-1 font-semibold">₹{product.price}</p>

            <p className="text-xs text-gray-500 mt-1">
              {product.brand}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Allproducts;
