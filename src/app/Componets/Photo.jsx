"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'],
    style: ['normal', 'italic'],
});

const Photo = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch("/api/photography");
        const result = await res.json();
        if (result.success) {
          // SLICE logic: Only take the first 15 items from the database
          setImages(result.data.slice(0, 15));
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="w-full text-center py-16">
      {/* Heading */}
      <h1 className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl italic font-extralight px-4`}>
        “SOME OF THE MOST{" "}
        <span className="italic font-semibold text-3xl sm:text-4xl md:text-5xl">
          CAPTIVATING
        </span>{" "}
        WEDDING IMAGES”
      </h1>

      {/* Image Grid */}
      {loading ? (
        <div className="py-20 text-slate-400">Loading Captivating Moments...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 mt-10">
          {images.map((img, index) => (
            <div
              key={img._id || index}
              className="relative w-full aspect-square overflow-hidden"
            >
              <Image
                src={img.imageUrl} // Dynamic Cloudinary URL
                alt={img.name || "Wedding Image"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      )}

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => window.location.href = '/photo'} 
          className={`${playfair.className} bg-[#a0884d] px-8 py-3 text-xs sm:text-base rounded-md text-white md:font-medium hover:bg-[#8c7643] transition shadow-lg`}
        >
          Photography More
        </button>
      </div>
    </div>
  );
};

export default Photo;