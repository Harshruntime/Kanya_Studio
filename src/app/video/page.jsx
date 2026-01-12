'use client'

import React, { useRef, useEffect, useState } from 'react'
import Header from '../Componets/Header'
import { Playfair_Display } from 'next/font/google'
import Footer from '../Componets/Footer'
import Link from 'next/link'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const VideographyPage = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const videoRefs = useRef([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const result = await res.json();
        if (result.success) {
          setVideos(result.data);
        }
      } catch (error) {
        console.error("Error fetching videography data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (i !== index && video) {
        video.pause();
      }
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#fcfaf8] overflow-hidden">
      <div className="absolute top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[70vh] md:h-screen overflow-hidden">
        <video
          src="/photo/WeddingVideo/video.mp4"
          autoPlay loop muted playsInline
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-[10px] md:text-xs tracking-[0.6em] uppercase mb-4 opacity-80 animate-fade-in">The Art of Motion</span>
          <h1 className={`${playfair.className} text-4xl md:text-8xl italic font-light tracking-tight`}>Rare Moments</h1>
        </div>
      </div>

       {/* Unique "Statement" Section */}
      <section className="py-24 md:py-40 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <h2 className={`${playfair.className} text-4xl md:text-6xl text-gray-900 leading-tight`}>
              We don't just <br />
              <span className="text-[#a0884d]">record events.</span>
            </h2>
          </div>
          <div className="md:col-start-7 md:col-span-6">
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed">
              We translate the atmosphere, the tension, and the unspoken promises into a 
              visual symphony. Our approach is purely observational, ensuring your story 
              remains yours—unscripted and authentic.
            </p>
          </div>
        </div>
      </section>

      {/* Video Gallery with Asymmetric Spacing */}
      <div className="container mx-auto px-6 pb-32">
        {isLoading ? (
          <div className="flex justify-center py-20 text-gray-400 italic">Curating...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-32 gap-x-16 lg:gap-x-24">
            {videos.map((video, index) => (
              <div 
                key={video._id || index} 
                className={`group relative ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                <div className="relative overflow-hidden shadow-2xl bg-black">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video.videoUrl}
                    controls
                    className="w-full aspect-[16/9] object-cover transition-transform duration-1000 group-hover:scale-105"
                    onPlay={() => handlePlay(index)}
                  />
                  {/* Subtle Numbering */}
                  <span className="absolute top-4 left-4 text-white/20 font-mono text-4xl">0{index + 1}</span>
                </div>
                
                <div className="mt-8">
                  <h3 className={`${playfair.className} text-2xl text-gray-800`}>{video.title || "Untitled Story"}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#a0884d]">Cinematography</span>
                    <div className="h-px w-8 bg-[#a0884d]/30" />
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">4K UHD</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* The Craft (Experience) Section */}
      <section className="bg-[#1a1a1a] py-32 text-white relative">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
             <div className="w-12 h-px bg-[#a0884d]" />
             <h4 className={`${playfair.className} text-3xl italic`}>The Composition</h4>
             <p className="text-sm text-gray-400 leading-loose">
               Every frame is treated as a painting. We focus on natural light, balanced color palettes, and intentional movement.
             </p>
          </div>
          <div className="space-y-6">
             <div className="w-12 h-px bg-[#a0884d]" />
             <h4 className={`${playfair.className} text-3xl italic`}>The Soundscape</h4>
             <p className="text-sm text-gray-400 leading-loose">
               We use high-fidelity audio to capture the tremor in the vows and the laughter of the crowd, making the film a time machine.
             </p>
          </div>
          <div className="space-y-6">
             <div className="w-12 h-px bg-[#a0884d]" />
             <h4 className={`${playfair.className} text-3xl italic`}>The Edit</h4>
             <p className="text-sm text-gray-400 leading-loose">
               Our editing process is where the soul is born. We rhythmically align the visuals with an emotive musical score.
             </p>
          </div>
        </div>
      </section>

      {/* Luxury Call to Action Section */}
      <section className="relative py-40 bg-white flex flex-col items-center">
        <div className="text-center space-y-8 z-10">
          <h2 className={`${playfair.className} text-4xl md:text-7xl text-gray-900`}>
            Ready to tell <br /><span className="italic text-[#a0884d]">your story?</span>
          </h2>
          <p className="text-gray-500 uppercase tracking-[0.4em] text-xs">Limited commissions available for {currentYear}</p>
          
          <div className="pt-10">
            <Link href='/contact-us'>
              <button className="group relative px-16 py-5 overflow-hidden border border-gray-200 rounded-full transition-all hover:border-[#a0884d]">
                <span className="relative z-10 text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-500">
                  Begin the Experience
                </span>
                <div className="absolute inset-0 bg-[#a0884d] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute left-10 top-20 text-[15vw] font-serif opacity-[0.03] select-none">Cinema</div>
        <div className="absolute right-10 bottom-20 text-[15vw] font-serif opacity-[0.03] select-none">Legacy</div>
      </section>

      <Footer />
    </div>
  )
}

export default VideographyPage;