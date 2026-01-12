"use client";

import React, { useEffect, useState } from 'react';
import { Playfair_Display } from 'next/font/google';
import Videos from './Videos'; // This import expects a "default" export

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const result = await res.json();
        if (result.success) {
          setVideoData(result.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to load videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="py-20 mb-20">
      <section className="relative w-full h-[70vh] md:h-screen overflow-hidden text-white bg-black">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <video
            src="/photo/WeddingImage/Demo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-100 scale-105 animate-slow-zoom"
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80" />

          {/* Luxury Top Border (Angled) */}
          <div className="absolute top-0 w-full h-20 sm:h-32 bg-[#f0e9e0] [clip-path:polygon(0_0,100%_0,100%_40%,0_100%)] opacity-105" />

          {/* Luxury Bottom Border (Angled) */}
          <div className="absolute bottom-0 w-full h-20 sm:h-32 bg-[#f0e9e0] [clip-path:polygon(0_60%,100%_0,100%_100%,0_100%)] opacity-105" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          {/* Floating Subtitle */}
          <span className="mb-4 text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#a0884d] font-medium animate-fade-in-up">
            Kanya Studios Presents
          </span>

          {/* Main Title with Elegant Shadow */}
          <h1
            className={`${playfair.className} italic text-4xl md:text-8xl text-[#f7dcba] tracking-tight md:tracking-widest uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]`}
          >
            Cinematic <br className="md:hidden" /> Weddings
          </h1>

          {/* Decorative Line */}
          <div className="w-12 h-[1px] bg-[#a0884d] my-8 animate-width-expand" />

          {/* Minimalist Call to Action */}
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-light text-gray-300">
            Stories worth telling
          </p>
        </div>

        {/* Aesthetic Scroll Indicator */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
            <div className="w-full h-1/2 bg-[#a0884d] absolute top-0 animate-scroll-line" />
          </div>
        </div>
      </section>

      <div className="w-full py-16 px-4 md:px-32 text-center">
        <h1 className={`${playfair.className} italic text-3xl md:text-5xl font-bold mb-12`}>
          Wedding Videos
        </h1>

        {/* This is where the error happens if Videos.jsx isn't exported correctly */}
        {isLoading ? (
          <div className="text-gray-400 italic">Loading cinematic stories...</div>
        ) : (
          <Videos videoItems={videoData} />
        )}
      </div>
      <div className="flex justify-center mt-10">
        <button
          onClick={() => window.location.href = '/video'}
          className={`${playfair.className} bg-[#a0884d] px-8 py-3 text-xs sm:text-base rounded-md text-white md:font-medium hover:bg-[#8c7643] transition shadow-lg`}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default Video;