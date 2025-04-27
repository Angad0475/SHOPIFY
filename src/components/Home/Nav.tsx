import Link from "next/link";
import React from "react";
import Image from "next/image";
import SearchBox from "@/components/Helper/SearchBox";
import { HeartIcon } from "lucide-react";
import ShopingCartButton from '@/components/Helper/ShopingCartButton';

const Nav = () => {
  return (
    <div className="h-[12vh] sticky top-0 z-[1] bg-white shadow-md">

      <div className="flex items-center mx-36 space-x-136 ">

        {/* Left Side */}
        <Link href="/">
          <div className="flex flex-row items-center space-x-5 ">
            <Image src="/images/logo.png" alt="logo" width={50} height={50} />
            <p className="text-black text-5xl">Shopify</p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          <SearchBox />
          <HeartIcon size={26} className="text-black cursor-pointer relative top-[-5]" />
          <ShopingCartButton />
        </div>

      </div>

    </div>
  );
}

export default Nav;
