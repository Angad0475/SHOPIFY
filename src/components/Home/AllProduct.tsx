'use client';
import { Product } from '../../../typing';
import React, { useEffect, useState } from "react";
import { getAllProduct } from '../../../Request/requests';
import { Loader } from 'lucide-react';
import ProductCard from './ProductCard';

const AllProduct = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const products = await getAllProduct();
                console.log("Fetched products:", products);

                if (Array.isArray(products)) {
                    setProducts(products);
                } else {
                    console.warn("Unexpected products format:", products);
                    setProducts([]);
                }
            } catch (error: any) {
                console.error("Failed to fetch products:", error?.message || error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    return (
        <div className="pt-16 pb-12">
            <h1 className="text-center font-bold text-2xl mb-8">All Products</h1>

            {loading ? (
                <div className="flex justify-center items-center mt-16">
                    <Loader size={32} className="animate-spin" />
                </div>
            ) : products.length === 0 ? (
                <p className="text-center text-gray-500 mt-8">No products found.</p>
            ) : (
                <div className="container w-11/12 md:w-4/5 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllProduct;
