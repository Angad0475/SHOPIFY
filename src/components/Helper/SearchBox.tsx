"use client";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";

const SearchBox = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  return (
    <form onSubmit={handleSearch} className="space-x-10">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // ✅ fixed this line
        placeholder="Search" className=" bg-gray-300 rounded-lg px-6 py-2  outline-none
        "
      />
      <button type="submit" className="text-black "><SearchIcon className="cursor-pointer"/></button>
    </form>
  );
};

export default SearchBox;
