// components/product-details/productDetails.tsx
"use client";
import Image from "next/image";
import { Product } from "@/schemas/product";

interface ProductProps {
  product: Product
}

const ProductDetails = ({product}: ProductProps) => {
  return (
    <div>
      <div className="flex justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      <h1 className="text-2xl font-bold mt-6">{product.title}</h1>
      <p className="text-gray-500 capitalize mt-1">{product.category}</p>
      <p className="text-2xl font-semibold text-black mt-3">${product.price}</p>
      <p className="text-gray-700 mt-4 leading-relaxed">{product.description}</p>

      <div className="flex items-center mt-4">
        <span className="text-yellow-500">★</span>
        <span className="ml-1 text-sm text-gray-600">
          {product.rating.rate} ({product.rating.count} reviews)
        </span>
      </div>
    </div>
  );
};

export default ProductDetails;
