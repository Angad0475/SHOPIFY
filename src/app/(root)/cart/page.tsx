"use client"
import React from "react";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
const Cart = () => {
    //get our cart items
    const items = useSelector((state: RootState) => state.cart.items);
    // calaculating Total Quantity
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    //calculating total price
    const totalPrice = Number(items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2));
    //calculating vat (15%)
    const vat = Number(totalPrice * 0.15).toFixed(2);
    const totalPriceVat = Number(totalPrice + vat).toFixed(2);
    
    
    return (
        <div className="mt-8 min-h-[60vh]">
          {items.length === 0 && (
            <div className="flex items-center w-full h-[80vh] flex-col justify-center">
               <Image src="/images/cart.svg" alt="empty_cart" width={400} height={400} className="object-cover mx-auto"/>
               <h1 className="mt-8 text-2xl font-semibold">Your Cart is empty</h1>
               <Link href="/">
               <br/>
               <button className="bg-black px-2 py-2 text-white rounded-xl cursor-pointer hover:scale-110 transition duration-300">Shop Now</button>
               </Link>
            </div>
          )}  

          {items.length > 0 && (
            <div className="md:w-4/5 w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-6 gap-12">
              <div className="rounded-lg shadow-md overflow-hidden lg:col-span-4">
                <h1 className="p-4 text-xl md:text-3xl font-bold text-white bg-blue-400">Your Cart ({totalQuantity} Items)</h1>
                {items.map((item) => {
                  return <div key={item.id}>
                  <div className="flex pb-6 mt-2 p-5 border-b-[1.5px] border-opacity-25 border-gray-700 items-center space-x-10">
                    <div>
                      <Image src={item.image} alt={item.title} width={180} height={180}/>
                  </div>
                  <div>
                    <h1 className="md:text-xl text-base font-bold text-black">{item.title}</h1>
                    <h1 className="md:text-lg text-sm font-semibold">Category: {item.category}</h1>
                    <h1 className= "md:text-lg text-sm font-semibold">${item.price}</h1>
                    <h1>Quantity: {item.quantity}</h1>
                  </div>
                  </div>
                  </div>
                })}
              </div>
              </div>
          )}

        </div>
    )
}

export default Cart;