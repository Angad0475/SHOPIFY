"use client";
import { Product } from "../../../typing";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../../Request/requests";
import { Loader } from "lucide-react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const AllProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const products = await getAllProduct();
        if (Array.isArray(products)) {
          setProducts(products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <motion.div
  initial={{ opacity: 0, y: 16 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="text-center mb-10"
>
  <h1 className="text-base md:text-lg font-medium text-gray-800 tracking-wide text-center mb-8">
  All Products
</h1>

  <div className="w-12 h-[2px] bg-indigo-500 mx-auto mt-3 rounded-full" />
</motion.div>
        {/* Loading */}
        {loading ? (
          <div className="flex flex-col justify-center items-center mt-24 gap-3">
            <Loader size={36} className="animate-spin text-indigo-600" />
            <p className="text-sm text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 mt-12">
            No products found.
          </p>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 },
              },
            }}
            className="container w-11/12 md:w-4/5 mx-auto
                       grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AllProduct;
