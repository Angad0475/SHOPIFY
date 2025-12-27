import React from "react";

const Footer = () => {
  return (
    <div className="pt-20 pb-12 bg-white">
      {/* Top Section */}
      <div className="container w-11/12 md:w-4/5 border-b border-slate-300 pb-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand / Info */}
        <div>
          <h1 className="text-2xl uppercase font-semibold text-black mb-4">SHOPIFY</h1>
          <p className="text-sm text-black opacity-70 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat inventore consectetur 
            laboriosam totam ut officia quibusdam unde fugit optio a, minima mollitia voluptatum, 
            facilis, odit atque! Delectus velit facere nobis.
          </p>
          <p className="text-sm mt-6 text-black opacity-80">
            (+000) 1234 5678 90
            <br />
            info@example.com
          </p>
        </div>

        {/* Links Section */}
        <div className="col-span-1 md:col-span-1 lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            
            {/* Information */}
            <div className="flex flex-col">
              <h1 className="text-md font-medium text-black mb-4">Information</h1>
              <ul className="list-none space-y-3">
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">About us</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Privacy Policy</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Return Policy</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Shipping Policy</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Dropshipping</li>
              </ul>
            </div>

            {/* Account */}
            <div className="flex flex-col">
              <h1 className="text-md font-medium text-black mb-4">Account</h1>
              <ul className="list-none space-y-3">
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Dashboard</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">My Orders</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Account Details</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Track My Orders</li>
              </ul>
            </div>

            {/* Shop */}
            <div className="flex flex-col">
              <h1 className="text-md font-medium text-black mb-4">Shop</h1>
              <ul className="list-none space-y-3">
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Affiliate</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Best sellers</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Latest Products</li>
                <li className="text-sm text-black opacity-70 hover:text-yellow-500 cursor-pointer">Sale Products</li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-black opacity-60 mt-8">
        © {new Date().getFullYear()} Shopify. All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
