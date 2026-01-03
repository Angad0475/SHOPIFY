"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AddDispatch } from "../../../../store/store";
import Image from "next/image";
import Link from "next/link";
import {
  addItem,
  CartItem,
  removeItem,
  clearCart,
} from "../../../../store/cartSlice";
import PaypalButton from "@/components/Helper/PaypalButton";
import { useRouter } from "next/navigation";

const Cart = () => {
  const dispatch = useDispatch<AddDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = Number(
    items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  );

  const vat = Number((subtotal * 0.15).toFixed(2));
  const totalPriceVat = Number((subtotal + vat).toFixed(2));

  const addItemHandler = (item: CartItem) => {
    dispatch(addItem(item));
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
    <div className="mt-8 min-h-[60vh]">
      {/* EMPTY CART */}
      {items.length === 0 && (
        <div className="flex items-center w-full h-[80vh] flex-col justify-center text-center">
          <Image
            src="/images/cart.svg"
            alt="empty_cart"
            width={400}
            height={400}
            className="object-cover mx-auto"
          />
          <h1 className="mt-8 text-2xl font-semibold">
            Your Cart is empty
          </h1>
          <Link href="/" className="mt-4">
            <button className="bg-black px-6 py-3 text-white rounded-xl hover:scale-105 transition">
              Shop Now
            </button>
          </Link>
        </div>
      )}

      {/* CART CONTENT */}
      {items.length > 0 && (
        <div className="md:w-4/5 w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* CART ITEMS */}
          <div className="rounded-lg shadow-md overflow-hidden lg:col-span-4">
            <h1 className="p-4 text-xl md:text-3xl font-bold text-white bg-blue-400">
              Your Cart ({totalQuantity} Items)
            </h1>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-5 border-b border-gray-300"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={160}
                  height={160}
                  className="mx-auto sm:mx-0"
                />

                <div className="flex-1">
                  <h1 className="text-lg md:text-xl font-bold">
                    {item.title}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Category: {item.category}
                  </p>
                  <p className="text-base font-semibold mt-1">
                    ${item.price}
                  </p>
                  <p className="text-sm mt-1">
                    Quantity: {item.quantity}
                  </p>

                  <div className="flex gap-3 mt-4">
                    <button
                      className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
                      onClick={() => addItemHandler(item)}
                    >
                      Add More
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => removeItemHandler(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}
          <div className="lg:col-span-2 col-span-1">
            <div className="bg-indigo-950 p-6 rounded-xl shadow-lg w-full lg:sticky lg:top-24">
              <h1 className="text-center mb-6 text-white text-2xl font-semibold">
                Summary
              </h1>

              <div className="h-px bg-white/20 mb-4" />

              <div className="flex text-white justify-between text-base">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex text-white justify-between text-base mt-2">
                <span>VAT (15%)</span>
                <span>${vat}</span>
              </div>

              <div className="h-px bg-white/20 my-4" />

              <div className="flex text-white justify-between text-lg font-bold">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
