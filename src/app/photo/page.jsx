"use client"; // Required for fetching data in the component

import React, { useEffect, useState } from 'react';
import Header from '../Componets/Header';
import Footer from '../Componets/Footer';
import { Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const Page = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH DYNAMIC DATA
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/photography");
      const result = await res.json();
      if (result.success) {
        setImages(result.data);
      }
    } catch (error) {
      console.error("Failed to load images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      <div className="relative w-full h-[100vh] overflow-hidden">
        <Image
          src="/photo/WeddingImage/Photo.jpg"
          alt="Wedding Hero"
          fill
          className="object-cover brightness-75 scale-105 animate-subtle-zoom"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="text-[14px] uppercase tracking-[1.8em] text-white/80 mb-6 translate-y-4 animate-fade-in">Selected Works</span>
          <h1 className={`${playfair.className} text-5xl md:text-8xl text-white italic tracking-tighter drop-shadow-2xl`}>
            Rare <span className="opacity-70">Moments</span>
          </h1>
          <div className="mt-10 w-[1px] h-24 bg-gradient-to-b from-white to-transparent animate-bounce"></div>
        </div>
      </div>

      <section className="py-32 px-6 flex justify-center bg-white/30">
        <div className="max-w-4xl text-center space-y-8">
          <p className="text-[16px] uppercase tracking-[0.8em] text-[#a0884d] font-semibold">The Vision</p>
          <h2 className={`${playfair.className} text-3xl md:text-5xl leading-tight text-gray-800 italic`}>
            "We don't just capture how it looked, <br />
            we capture how it <span className="text-[#a0884d] not-italic underline decoration-1 underline-offset-8">felt</span>."
          </h2>
          <div className="flex justify-center gap-4 pt-6">
            <div className="w-12 h-[1px] bg-black/20 self-center"></div>
            <span className="text-[10px] uppercase tracking-widest opacity-40 italic">Kanya Studio Philosophy</span>
            <div className="w-12 h-[1px] bg-black/20 self-center"></div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-20 ">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-10 mb-10">
          {images.map((img, index) => (
            <div
              key={img._id || index}
              className="relative w-full h-120 overflow-hidden"
            >
              <Image
                src={img.imageUrl} // Fetched from your MongoDB
                alt={img.name || "Wedding Gallery Image"}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* --- SECTION 3: THE SIGNATURE SERVICE (Staggered Layout) --- */}
      <section className="py-40 bg-black text-[#f0e9e0] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative h-[600px] w-full border border-white/10 p-4">
            <Image
              src="/photo/WeddingImage/Photo.jpg" // Change to a different highlight image
              alt="Service Detail"
              fill
              className="object-cover p-4"
            />
            <div className="absolute -bottom-10 -right-10 bg-[#a0884d] p-10 hidden md:block">
              <p className={`${playfair.className} text-4xl italic`}>Digital <br /> Heirloom</p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[#a0884d] text-sm tracking-[.3em] uppercase">Cinematic Preservation</span>
              <h3 className={`${playfair.className} text-5xl md:text-7xl italic`}>The Kanya <br /> Standard.</h3>
            </div>
            <p className="text-gray-400 font-light leading-relaxed max-w-md">
              Every image undergoes a proprietary color-grading process inspired by 35mm film stocks. We don't just deliver photos; we deliver a legacy that ages with grace.
            </p>
            <ul className="space-y-4 border-l border-[#a0884d] pl-6">
              <li className="text-[11px] uppercase tracking-widest font-bold">01. Artistic Direction</li>
              <li className="text-[11px] uppercase tracking-widest font-bold">02. 4K High-Bitrate Documentation</li>
              <li className="text-[11px] uppercase tracking-widest font-bold">03. Archival Cloud Storage</li>
            </ul>
            <Link href={'/contact-us'}>
            <button className="px-12 py-5 border border-[#a0884d] text-[#a0884d] text-[10px] uppercase tracking-[.4em] font-bold hover:bg-[#a0884d] hover:text-black transition-all duration-500">
              Book Your Session
            </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Page;