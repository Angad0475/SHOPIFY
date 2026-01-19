"use client";

import { useState } from "react";
import { Product } from "../../../../typing";
import ProductCard from "./ProductCard";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const PRODUCTS_PER_PAGE = 4;

interface Props {
  category: string;
  products: Product[];
}

const CategorySection = ({ category, products }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold capitalize">{category}</h2>

      <div className="flex items-center gap-4">
        {/* Prev Arrow */}
        {totalPages > 1 && (
          <ArrowLeftIcon
            onClick={() =>
              currentPage > 1 && setCurrentPage(currentPage - 1)
            }
            className="cursor-pointer"
          />
        )}

        {/* Products (ALWAYS RENDER) */}
        <div className="flex gap-6 overflow-x-auto md:overflow-x-hidden">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Next Arrow */}
        {totalPages > 1 && (
          <ArrowRightIcon
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CategorySection;
