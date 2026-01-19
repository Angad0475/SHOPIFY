"use client";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

const SearchBox = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-gray-300 rounded-lg px-2 py-1 
                 w-40 sm:w-48 md:w-64 lg:w-80"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="flex-grow bg-transparent outline-none px-2 
                   text-xs sm:text-sm md:text-base"
      />
      <button type="submit" className="text-black p-1">
        <SearchIcon size={18} className="cursor-pointer" />
      </button>
    </form>
  );
};

export default SearchBox;
