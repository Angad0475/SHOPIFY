import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="w-full min-h-[calc(100vh-12vh)] flex flex-col justify-center px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Text Section */}
        <div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl text-black font-bold uppercase">
            mega sale <span className="text-rose-600">Special</span> Offer up to{" "}
            <span className="text-orange-500">60%</span> off
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-black text-opacity-70 mt-4 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iusto
            eaque exercitationem, laboriosam temporibus repudiandae magni iste,
            necessitatibus cupiditate odio commodi veritatis voluptatem
            dignissimos tenetur, blanditiis ipsam incidunt! Maiores, mollitia.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <button className="text-base md:text-lg lg:text-xl bg-blue-700 px-4 py-2 rounded-lg text-white hover:bg-blue-800 transition">
              Shop Now
            </button>
            <button className="text-base md:text-lg lg:text-xl bg-black px-4 py-2 rounded-lg text-white hover:bg-gray-900 transition">
              Explore More
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/images/hero.svg"
            alt="hero"
            width={600}
            height={600}
            className="w-3/4 md:w-1/2 lg:w-[90%] h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
