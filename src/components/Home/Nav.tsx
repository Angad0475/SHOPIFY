"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { SearchIcon, HeartIcon, ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { motion, AnimatePresence } from "framer-motion";

const Nav = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  const items = useSelector((state: RootState) => state.cart.items);
  const TotalQuantity = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`h-auto md:h-[12vh] sticky top-0 z-[1000] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-xl"
          : "bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/30 backdrop-blur-sm shadow-md"
      }`}
    >
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div
  className="relative container mx-auto px-4 md:px-8 lg:px-16
             h-[70px] md:h-[12vh]
             flex items-center justify-between"
>

        {/* Left Side: Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] drop-shadow-lg"
            />
          </motion.div>
          <motion.p
            className="text-black 
                       text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight" style={{fontFamily: "cursive"}}
            whileHover={{ scale: 1.02 }}
          >
            Shopify
          </motion.p>
        </Link>

        {/* Center: Search Box */}
        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSearch}
          className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2.5 
                     w-full sm:w-56 md:w-72 lg:w-96 shadow-lg border border-indigo-100/50
                     order-3 md:order-2 hover:shadow-xl transition-all duration-300
                     focus-within:ring-2 focus-within:ring-indigo-300"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-grow bg-transparent outline-none px-2 text-sm sm:text-base 
                       text-gray-700 placeholder-gray-400"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <SearchIcon size={20} className="cursor-pointer" />
          </motion.button>
        </motion.form>

        {/* Right Side: Icons - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-6 order-2 md:order-3"
        >
          <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
            <HeartIcon
              size={24}
              className="text-gray-700 cursor-pointer hover:text-red-500 transition-colors hidden md:block drop-shadow-sm"
            />
          </motion.div>
          
          {/* Shopping Cart with Badge - Desktop */}
          <motion.div
            className="relative hidden md:block"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/cart">
              <ShoppingCart size={24} className="text-gray-700 cursor-pointer drop-shadow-sm" />
              <AnimatePresence>
                {TotalQuantity > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full 
                               bg-gradient-to-r from-red-500 to-pink-500 
                               flex justify-center items-center text-white text-xs font-bold 
                               shadow-lg ring-2 ring-white"
                  >
                    {TotalQuantity}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu
            className="block md:hidden cursor-pointer text-gray-700"
            onClick={() => setIsopen(true)}
            size={28}
          />
        </motion.div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[280px] 
                           bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 
                           backdrop-blur-xl shadow-2xl z-50 border-l border-indigo-100"
              >
                <div className="p-6 flex flex-col gap-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text 
                                   bg-gradient-to-r from-indigo-600 to-blue-600">
                      Menu
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsopen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <X size={24} className="text-gray-700" />
                    </motion.button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl 
                               bg-white/70 backdrop-blur-sm shadow-md 
                               hover:shadow-lg transition-all cursor-pointer
                               border border-indigo-100/50"
                  >
                    <HeartIcon size={24} className="text-gray-700 hover:text-red-500 transition-colors" />
                    <span className="text-gray-700 font-medium">Favorites</span>
                  </motion.div>
                  
                  {/* Shopping Cart with Badge - Mobile */}
                  <Link href="/cart">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 p-4 rounded-xl 
                                 bg-white/70 backdrop-blur-sm shadow-md 
                                 hover:shadow-lg transition-all cursor-pointer
                                 border border-indigo-100/50"
                    >
                      <div className="relative">
                        <ShoppingCart size={24} className="text-gray-700" />
                        {TotalQuantity > 0 && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full 
                                         bg-gradient-to-r from-red-500 to-pink-500 
                                         flex justify-center items-center text-white text-xs font-bold 
                                         shadow-lg">
                            {TotalQuantity}
                          </div>
                        )}
                      </div>
                      <span className="text-gray-700 font-medium">Cart</span>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsopen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Nav;