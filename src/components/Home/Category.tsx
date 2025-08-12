import React from "react";
import { getAllCategory } from "../../../Request/requests";

const Category = async () => {
  const categories = await getAllCategory();

  if (!Array.isArray(categories) || categories.length === 0) {
    return (
      <div className="pt-16 pb-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">No categories found</h1>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12">
      <h1 className="text-center font-bold text-2xl capitalize">
        Shop by category
      </h1>

      <div className="mt-12 w-11/12 md:w-4/5 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category}
            className="p-6 rounded-lg cursor-pointer text-center hover:scale-110 transition-all duration-300 bg-gray-200 shadow-md"
          >
            <p className="capitalize font-medium text-lg text-gray-800">
              {category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
