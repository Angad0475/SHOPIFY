"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { SearchIcon, HeartIcon } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Menu } from "lucide-react";

const Nav = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsopen]= useState<boolean>(false);
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  return (
    <div className="h-auto md:h-[12vh] sticky top-0 z-[10] bg-white shadow-md w-full">
      <div className="flex flex-col md:flex-row items-center justify-between 
                      px-4 md:px-8 lg:px-16 py-3 md:py-0 container mx-auto gap-3 md:gap-0">

        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
          />
          <p className="text-black text-2xl md:text-3xl lg:text-4xl font-bold">
            Shopify
          </p>
        </Link>

        {/* Center: Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 
                     w-full sm:w-56 md:w-72 lg:w-96 shadow-sm border border-gray-200 
                     order-3 md:order-2"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-grow bg-transparent outline-none px-2 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="text-gray-500 hover:text-black transition-colors"
          >
            <SearchIcon size={18} className="cursor-pointer" />
          </button>
        </form>

        {/* Right Side: Icons */}
        <div className="flex items-center gap-4 order-2 md:order-3">
          <HeartIcon
            size={24}
            className="text-black cursor-pointer hover:text-red-500 transition-colors hidden md:block"
          />
          <ShoppingCart className="hidden md:block"/>
        </div>
        <Menu className="block md:hidden" onClick={()=>setIsopen(true)}/>

          <div
  className={`fixed top-0 right-0 h-full w-[200px] bg-white shadow-lg  transition-transform duration-300 ease-in-out 
    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
>
  <div className="p-4 flex flex-col gap-4">
    <HeartIcon className="cursor-pointer" />
    <ShoppingCart className="cursor-pointer" />
    <button
      onClick={() => setIsopen(false)}
      className="mt-4 px-3 py-1 bg-gray-200 rounded"
    >
      Close
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default Nav;
