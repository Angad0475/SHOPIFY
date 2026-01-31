"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ImageProps {
  images: StaticImageData[];
}

const Carousel = ({ images }: ImageProps) => {
  const slides = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Infinite loop logic
  useEffect(() => {
    if (index === slides.length - 1) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(1);
      }, 500);
    }
  }, [index, slides.length]);

  // Re-enable animation
  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [animate]);

  return (
    <div className="container mx-auto w-full overflow-hidden py-5">
      <div
        className={`flex ${
          animate ? "transition-transform duration-500 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((src, i) => (
          <div
            key={i}
            className="min-w-full md:h-[550px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src={src}
              alt=""
              width={1700}
              height={550}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
