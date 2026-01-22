"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "@/../../typing";
import { addItem } from "@/../../store/cartSlice";
import { useDispatch } from "react-redux";
import { AddDispatch } from "@/../../store/store";
import { motion } from "framer-motion";

interface Props {
  id: string;
}

export default function ProductDetails({ id }: Props) {
  const dispatch = useDispatch<AddDispatch>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAddItem = () => {
    if (product) dispatch(addItem(product));
  };

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await axios.get<Product>(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(res.data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        Product not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >
        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-gray-100 flex items-center justify-center p-10"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={350}
            height={350}
            className="object-contain rounded-xl"
            priority
          />
        </motion.div>

        {/* Details Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="p-8 flex flex-col justify-between"
        >
          <div>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-sm uppercase tracking-wide text-gray-500"
            >
              {product.category}
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl font-bold text-gray-900 mt-2"
            >
              {product.title}
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-gray-600 mt-4 leading-relaxed"
            >
              {product.description}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-center mt-4"
            >
              <span className="text-yellow-500 text-lg">★</span>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating
                  ? `${product.rating} / 5 rating`
                  : "No ratings yet"}
              </span>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-3xl font-semibold text-gray-900 mt-6"
            >
              ${product.price}
            </motion.p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddItem}
            className="mt-8 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            🛒 Add to Cart
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
