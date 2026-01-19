"use client";

import { useEffect, useState } from "react";
import { Product } from "../../../../typing";
import { getAllProduct } from "../../../../Request/requests";
import { ClipLoader } from "react-spinners";
import CategorySection from "./CategorySection";

const AllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  if (loading) {
    return (
      <div className="flex justify-center">
        <ClipLoader size={35} />
      </div>
    );
  }

  return (
    <section className="pt-20 pb-16">
      <div className="container w-11/12 md:w-4/5 mx-auto space-y-16">
        {categories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            products={products.filter((p) => p.category === category)}
          />
        ))}
      </div>
    </section>
  );
};

export default AllProduct;
