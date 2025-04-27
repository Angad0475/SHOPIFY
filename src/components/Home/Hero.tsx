import React from "react";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-12vh)] flex flex-col justify-center ">
      <div className="w-4/5 mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-black font-bold uppercase">
            mega sale <span className="text-rose-600">Special</span> Offer up to{" "}
            <span className="text-orange-500 ">60%</span> off
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-black text-opacity-70 mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe iusto
            eaque exercitationem, laboriosam temporibus repudiandae magni iste,
            necessitatibus cupiditate odio commodi veritatis voluptatem
            dignissimos tenetur, blanditiis ipsam incidunt! Maiores, mollitia.
          </p>
          <div className="flex mt-6 items-center space-x-4">
            <button className=" text-[20px] 2xl:text-lg bg-blue-700 2xl:px-2 2xl:py-2 rounded-lg text-white">
              Shop Now
            </button>
            <button className=" text-[20px] 2xl:text-lg bg-black text-white 2xl:px-2 2xl:py-2 rounded-lg">
              Explore More
            </button>
          </div>
        </div>
        <div className="hidden lg:block">
          <Image
            src="/images/hero.svg"
            alt="hero"
            width={600}
            height={600}
            className="w-[10%] h-[10%] lg:h-[50%] lg:w-[50%] xl:w-[80%] xl:h-[80%] 2xl:w-[100%] 2xl:h-[100%]"
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
