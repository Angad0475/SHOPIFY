import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-[calc(100vh-12vh)]
                 bg-gradient-to-br from-slate-50 via-white to-indigo-50
                 flex items-center px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Soft background blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid items-center
                      grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

        {/* Left Content */}
        <div>
          <p className="text-xs uppercase tracking-widest text-indigo-600 font-medium mb-3">
            Limited Time Offer
          </p>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold
                         text-gray-900 leading-tight">
            Mega Sale{" "}
            <span className="text-indigo-600">Special</span> Offer
            <br />
            <span className="text-gray-700 text-xl md:text-2xl lg:text-3xl font-medium">
              Up to <span className="text-rose-600 font-semibold">60%</span> off
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-600 mt-5 leading-relaxed max-w-xl">
            Discover premium products at unbeatable prices. Upgrade your style,
            refresh your essentials, and shop confidently with our curated
            collection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button
              className="px-6 py-3 rounded-full
                         bg-indigo-600 text-white text-sm md:text-base font-medium
                         hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Shop Now
            </button>

            <button
              className="px-6 py-3 rounded-full
                         border border-gray-300 bg-white text-gray-800
                         text-sm md:text-base font-medium
                         hover:bg-gray-100 transition-all"
            >
              Explore More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/images/hero.svg"
            alt="hero"
            width={600}
            height={600}
            priority
            className="w-[75%] md:w-[60%] lg:w-[90%] h-auto rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
