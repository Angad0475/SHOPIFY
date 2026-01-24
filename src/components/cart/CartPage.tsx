"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AddDispatch } from "../../../store/store";
import Image from "next/image";
import Link from "next/link";
import {
  addItem,
  removeItem,
  clearCart,
  CartItem,
} from "../../../store/cartSlice";
import PaypalButton from "../../components/ui/PaypalButton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CartPage = () => {
  const dispatch = useDispatch<AddDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = Number(
    items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    ).toFixed(2)
  );

  const vat = Number((subtotal * 0.15).toFixed(2));
  const totalPriceVat = Number((subtotal + vat).toFixed(2));

  const addItemHandler = (product: CartItem["product"]) => {
    dispatch(addItem(product));
  };

  const removeItemHandler = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleSuccess = (details: any) => {
    console.log("Payment Success:", details);
    dispatch(clearCart());
    router.push("/success");
  };

  return (
    <div className="mt-10 min-h-[60vh]">
      {/* EMPTY CART */}
      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center w-full h-[80vh] flex-col justify-center text-center"
        >
          <Image
            src="/images/cart.svg"
            alt="empty_cart"
            width={360}
            height={360}
          />
          <h1 className="mt-8 text-xl font-semibold text-gray-800">
            Your cart is empty
          </h1>
          <Link href="/" className="mt-5">
            <button className="bg-black px-6 py-3 text-sm text-white rounded-xl hover:scale-105 transition">
              Shop Now
            </button>
          </Link>
        </motion.div>
      )}

      {/* CART CONTENT */}
      {items.length > 0 && (
        <div className="md:w-4/5 w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* CART ITEMS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden lg:col-span-4"
          >
            <h1 className="px-6 py-4 text-lg font-medium text-gray-800 border-b">
              Your Cart <span className="text-gray-500">({totalQuantity})</span>
            </h1>

            {items.map((item) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-6 p-6 border-b last:border-none"
              >
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  width={140}
                  height={140}
                  className="rounded-lg border"
                />

                <div className="flex-1">
                  <h2 className="text-base font-medium text-gray-800">
                    {item.product.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.product.category}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="font-semibold text-gray-800">
                      ${item.product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition"
                      onClick={() => addItemHandler(item.product)}
                    >
                      Add More
                    </button>
                    <button
                      className="text-sm text-red-500 hover:underline"
                      onClick={() => removeItemHandler(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* SUMMARY */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 p-6 rounded-2xl shadow-xl lg:sticky lg:top-24">
              <h1 className="text-center mb-6 text-white text-lg font-medium">
                Order Summary
              </h1>

              <div className="flex text-sm text-indigo-100 justify-between">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex text-sm text-indigo-100 justify-between mt-2">
                <span>VAT (15%)</span>
                <span>${vat}</span>
              </div>

              <div className="flex text-white justify-between mt-4 text-base font-semibold">
                <span>Total</span>
                <span>${totalPriceVat}</span>
              </div>

              <div className="mt-6">
                <PaypalButton
                  amount={String(totalPriceVat)}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
