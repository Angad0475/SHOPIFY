"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HeartIcon, ShoppingCart, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { motion, AnimatePresence } from "framer-motion";
import SearchBox from "../ui/SearchBox";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-[100] w-full transition-all ${
          scrolled
            ? "bg-white/95 backdrop-blur shadow-md"
            : "bg-white"
        }`}
      >
        <nav className="container mx-auto px-4 h-[70px] flex items-center justify-between gap-3">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={44}
              height={44}
              priority
            />
            <span className="text-xl sm:text-2xl font-bold">
              Shopify
            </span>
          </Link>

          {/* SEARCH BAR (DESKTOP) */}
          <div className="hidden md:block w-full max-w-md">
            <SearchBox />
          </div>

          {/* ICONS (DESKTOP) */}
          <div className="hidden md:flex items-center gap-6">
            <HeartIcon className="cursor-pointer hover:text-red-500" />

            <Link href="/cart" className="relative">
              <ShoppingCart />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </nav>

        {/* SEARCH BAR (MOBILE — ALWAYS VISIBLE) */}
        <div className="md:hidden px-4 pb-3">
          <SearchBox />
        </div>
      </motion.header>

      {/* ===================== */}
      {/* MOBILE SIDEBAR LAYER */}
      {/* ===================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* OVERLAY */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
            />

            {/* SIDEBAR */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              className="
                absolute right-0 top-0 h-full
                w-[85%] max-w-[320px]
                bg-white
                shadow-2xl
                overflow-y-auto
              "
            >
              <div className="p-6 flex flex-col gap-6">
                
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Menu</h3>
                  <button onClick={() => setIsOpen(false)}>
                    <X size={24} />
                  </button>
                </div>

                {/* FAVORITES */}
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <HeartIcon />
                  <span>Favorites</span>
                </div>

                {/* CART */}
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  <ShoppingCart />
                  <span>Cart</span>
                  {totalQuantity > 0 && (
                    <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
