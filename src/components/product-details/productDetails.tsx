"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../../typing";
import { addItem } from "../../../store/cartSlice";
import { useDispatch, UseDispatch } from "react-redux";
import { AddDispatch } from "../../../store/store";
interface Props {
  id: string;
}

export default function ProductDetails({ id }: Props) {
  const dispatch = useDispatch<AddDispatch>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAdditem = ()=> {
    if (product)
    dispatch(addItem(product))
  }

  useEffect(() => {
    // 🔒 Validate ID before API call
    if (!id || isNaN(Number(id))) {
      console.error("Invalid product ID:", id);
      setLoading(false);
      setProduct(null);
      return;
    }

    const fetchProduct = async () => {
      try {
        const res = await axios.get<Product>(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(res.data);
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.error("Product not found:", id);
          setProduct(null);
        } else {
          console.error("Failed to fetch product", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="p-6 text-center">Product not found</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-center">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      <h1 className="text-2xl font-bold mt-6">{product.title}</h1>
      <p className="text-gray-500 capitalize mt-1">{product.category}</p>

      <p className="text-2xl font-semibold mt-3">${product.price}</p>

      <p className="text-gray-700 mt-4">{product.description}</p>

      <div className="flex items-center mt-4">
        <span className="text-yellow-500">★</span>
        <span className="ml-1 text-sm text-gray-600">
          {product.rating ? `${product.rating} / 5` : "No ratings yet"}
        </span>
      </div>
       <button
        onClick={handleAdditem}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}
