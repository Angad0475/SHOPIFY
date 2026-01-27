"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    router.push(`/search?query=${trimmedQuery}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        flex w-full max-w-lg
        items-center
        rounded-full
        border border-gray-300
        bg-white
        transition
        focus-within:ring-2 focus-within:ring-blue-500
        sm:max-w-lg
        md:max-w-2xl
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
          text-sm
          text-gray-700
          placeholder-gray-400
          outline-none
          sm:text-base
        "
      />

      <button
        type="submit"
        className="
          rounded-r-full
          bg-blue-600
          px-4 py-2
          text-sm font-medium
          text-white
          transition
          hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
          sm:px-6 sm:text-base
        "
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
