"use client";

import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../../Request/requests";
import { useRouter } from "next/navigation";
const Category = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getAllCategory();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);

  // ✅ Conditional rendering belongs HERE (not in useEffect)
  if (loading) {
    return (
      <div className="pt-16 pb-12 text-center text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="pt-16 pb-12 text-center">
        <p className="text-sm text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container w-11/12 md:w-4/5 mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-base md:text-7xl font-bold text-gray-800">
            Shop by Category
          </h1>
          <div className="w-10 h-[2px] bg-indigo-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="p-6 rounded-xl bg-white border text-center cursor-pointer hover:shadow-md" onClick={() => router.push(`category/${category.name.replace(" ", "-")}`)}
            >
              <p className="capitalize font-medium">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
