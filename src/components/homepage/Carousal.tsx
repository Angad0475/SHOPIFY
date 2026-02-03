"use client";

import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";

interface ImageProps {
  images: StaticImageData[];
}

const Carousel = ({ images }: ImageProps) => {
  const slides = [...images, images[0]]; // clone only at end

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [ispaused, setisPaused] = useState(false);


  const stopslide = () => {
    setisPaused(true);
  }
  const startSlide = () => {
    setisPaused(false);
  } 

  // auto forward slide
  useEffect(() => {
    if (ispaused) return;
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(timer);
  }, [ispaused]);

  // reset after clone
  useEffect(() => {
    if (index === slides.length - 1) {
      setTimeout(() => {
        setAnimate(false);
        setIndex(0);
      }, 500);
    }
  }, [index, slides.length]);

  // re-enable animation
  useEffect(() => {
    if (!animate) requestAnimationFrame(() => setAnimate(true));
  }, [animate]);

  const forward = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex ${
          animate ? "transition-transform duration-500 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((src, i) => (
          <div key={i} className="min-w-full" onMouseEnter={stopslide} onMouseLeave={startSlide}>
            <Image
              src={src}
              alt=""
              width={1700}
              height={550}
              className="rounded-2xl object-cover"
            />
          </div>
        ))}
      </div>

      {/* Prev (also forward) */}
      <button
        onClick={forward}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full"
      >
        ‹
      </button>

      {/* Next (forward) */}
      <button
        onClick={forward}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
};

export default Carousel;
