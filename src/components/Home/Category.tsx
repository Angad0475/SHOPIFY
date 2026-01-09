import React from "react";
import { getAllCategory } from "../../../Request/requests";

const Category = async () => {
  const categories = await getAllCategory();

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="pt-16 pb-12 text-center">
        <p className="text-sm text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <section className="relative pt-20 pb-16
                        bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      
      {/* Soft decorative blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-base md:text-lg font-medium tracking-wide text-gray-800">
            Shop by Category
          </h1>
          <div className="w-10 h-[2px] bg-indigo-500 mx-auto mt-3 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="container w-11/12 md:w-4/5 mx-auto
                        grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.slug}
              className="
                group
                p-6 rounded-xl
                bg-white/80 backdrop-blur-sm
                border border-gray-200
                text-center cursor-pointer
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
              "
            >
              <p className="capitalize text-sm md:text-base font-medium text-gray-800
                            group-hover:text-indigo-600 transition-colors">
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
