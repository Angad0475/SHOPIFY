"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllProduct } from "../../../Request/requests";
import { Product } from "../../../typing";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    router.push(`/search?query=${trimmedQuery}`);
    setShowSuggestions(false);
  };

  // Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProduct();
        setProducts(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = products
      .filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 6);

    setSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
  }, [query, products]);

  return (
    <div className="relative w-full flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="
            flex items-center
            rounded-full
            border border-gray-300
            bg-white
            transition
            focus-within:ring-2 focus-within:ring-blue-500
          "
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="
              flex-1
              rounded-l-full
              px-4 py-2
              text-sm sm:text-base
              text-gray-700
              placeholder-gray-400
              outline-none
            "
          />

          <button
            type="submit"
            className="
              rounded-r-full
              bg-blue-600
              px-4 py-2 sm:px-6
              text-sm sm:text-base
              font-medium
              text-white
              transition
              hover:bg-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            Search
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div
            className={`
              absolute z-50 mt-2 w-full
              rounded-2xl
              bg-white/80 backdrop-blur-lg
              shadow-2xl
              border border-gray-200
              overflow-hidden
              transform transition-all duration-200 ease-out
              ${
                showSuggestions
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              }
            `}
          >
            {suggestions.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  router.push(`/product/product-details/${item.id}`);
                  setQuery("");
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="
                  px-4 py-3
                  cursor-pointer
                  text-sm text-gray-700
                  hover:bg-blue-50
                  transition
                  border-b last:border-b-0
                "
              >
                <span className="font-medium">{item.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
