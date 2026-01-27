"use client";

import { useEffect, useState } from "react";
import { Product } from "../../../../typing";
import ProductCard from "./ProductCard";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { getProductsByCategory } from "../../../../Request/requests";

interface Props {
  category: string;
}

const LIMIT = 5; // number of products to fetch each time

const CategorySection = ({ category }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const skip = (page - 1) * LIMIT;

      const data = await getProductsByCategory(
        category,
        LIMIT,
        skip
      );

      setProducts(data);
    };

    fetchProducts();
  }, [page, category]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold capitalize">{category}</h2>

      <div className="flex items-center gap-4">
        {/* Prev */}
        <ArrowLeftIcon
          className={`cursor-pointer ${page === 1 ? "opacity-30" : ""}`}
          onClick={() => page > 1 && setPage(page - 1)}
        />

        {/* Products */}
        <div className="flex gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Next */}
        <ArrowRightIcon
          className="cursor-pointer"
          onClick={() => setPage(page + 1)}
        />
      </div>
    </div>
  );
};

export default CategorySection;
