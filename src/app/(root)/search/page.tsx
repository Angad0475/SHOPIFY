"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchProduct } from "../../../../Request/requests";
import { Product } from "../../../../typing";
import ProductCard from "../../../components/homepage/product/ProductCard"; // adjust path

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await searchProduct(query);
        setProducts(data);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [query]);

  return (
    <section>
      <div className="container px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">
          Search results for "{query}"
        </h1>

        {/* Loading */}
        {loading && <p>Loading...</p>}

        {/* No Results */}
        {!loading && products.length === 0 && (
          <p className="text-gray-500">No products found.</p>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
