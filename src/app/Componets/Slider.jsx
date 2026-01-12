"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Removed Pagination module
import "swiper/css";
import "swiper/css/autoplay";
// import "swiper/css/pagination"; // No longer needed

import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

export default function Slider() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await fetch("/api/photography");
        const result = await res.json();
        if (result.success) {
          setImages(result.data);
        }
      } catch (error) {
        console.error("Slider fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  if (isLoading) return null;

  return (
    <div className="py-10 md:py-20 mx-2">
      <Swiper
        modules={[Autoplay]} // Only keeping Autoplay
        spaceBetween={10}
        slidesPerView={1}
        // pagination={{ clickable: true }} // REMOVED THIS LINE
        speed={800}
        breakpoints={{
          480: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
          1536: { slidesPerView: 5 },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={images.length > 5}
        className="max-w-full mx-auto px-4 sm:px-8"
      >
        {images.map((img, index) => (
          <SwiperSlide key={img._id || index}>
            <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-sm">
              <img
                src={img.imageUrl}
                alt={img.name || "Storyteller Image"}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}