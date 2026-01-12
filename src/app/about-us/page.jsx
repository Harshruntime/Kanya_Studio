'use client'

import React from 'react'
import Header from '../Componets/Header'
import Footer from '../Componets/Footer'
import { Playfair_Display } from 'next/font/google'
import Slider from '../Componets/Slider'
import Image from 'next/image'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const AboutPage = () => {
  return (
    <div className='relative  bg-[#f0e9e0] text-[#1a1a1a] selection:bg-[#c26e00] selection:text-white overflow-x-hidden'>
      <Header />

      {/* --- HERO SECTION: THE SIGNATURE PORTRAIT --- */}
      <section className="relative w-full min-h-screen flex flex-col justify-center items-center lg:top-20 lg:py-60 lg:pt-0 mb-20 lg:mb-0">

        {/* Massive Background Decorative Text */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[22vw] font-bold text-black/[0.02] whitespace-nowrap pointer-events-none select-none z-0 ${playfair.className}`}>
          THE LEGACY
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-16 relative z-10">

          {/* LEFT: EDITORIAL IMAGE BOX */}
          <div className="lg:col-span-5 relative group">
            {/* Architectural Frame Behind Image */}
            <div className="absolute -inset-4 border border-[#c26e00]/30 translate-x-8 translate-y-8 -z-10 transition-transform duration-1000 group-hover:translate-x-4 group-hover:translate-y-4"></div>

            <div className="relative h-[60vh] lg:h-[85vh] w-full overflow-hidden shadow-2xl">
              <img
                src="DiveshAboutus.png"
                alt="Divesh Paswan Portrait"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
              {/* Subtle Overlay on Image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Label */}
            <div className="absolute -bottom-6 -right-6 bg-[#c26e00] text-white p-6 hidden lg:block">
              <p className="text-[10px] tracking-[0.4em] uppercase font-bold">Director's Profile</p>
            </div>
          </div>

          {/* RIGHT: BOLD BRAND STATEMENT */}
          <div className="lg:col-span-7 space-y-10 lg:pl-10">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.8em] text-[#c26e00] font-bold block mb-4">Established 2024 — Mumbai</span>
              <h1 className={`${playfair.className} text-7xl md:text-9xl italic leading-[0.85] tracking-tighter`}>
                Crafting <br />
                <span className="text-[#c26e00] not-italic">Visual</span> <br />
                Poetry.
              </h1>
            </div>

            <div className="max-w-md space-y-6">
              <div className="h-[1px] w-20 bg-[#c26e00]"></div>
              <p className="text-sm md:text-base leading-relaxed opacity-80 font-light tracking-widest uppercase italic">
                Kanya Studio is a sanctuary where light meets legacy. Specialized in cinematic documentation and high-fashion wedding preservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE PHILOSOPHY (STAGGERED) --- */}
      <div className='py-32 bg-white/30 backdrop-blur-sm px-6 relative'>
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className={`${playfair.className} text-4xl md:text-5xl italic text-[#c26e00]`}>
            "Every frame is a heartbeat preserved in gold."
          </h2>
          <div className="h-[1px] w-24 bg-[#c26e00] mx-auto opacity-30"></div>
          <p className="text-sm md:text-xl font-light max-w-2xl mx-auto leading-relaxed italic">
            At KANYA STUDIO, we believe in the quiet power of a glance. We don't just record weddings; we curate the visual heritage of your family.
          </p>
        </div>
      </div>
      {/* --- SECTION 3: THE DRAMA HERO --- */}
      <div className="relative w-full h-[50vh] md:h-full overflow-hidden">
        <img src="/photo/WeddingImage/About.jpg" alt="About" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center lg:top-0 text-center px-4">
          <h1 className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#030303] leading-tight`}>
            FROM <br /> <span className="italic text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">Romance & Magic</span>
            <br />TO RAW<br />HUMAN DRAMA
          </h1>
        </div>
      </div>

      {/* --- SECTION 4: THE FOUNDER (PREMIUM ARCHITECTURAL) --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            {/* Profile Image with modern offset box */}
            <div className="aspect-[3/4] relative z-10">
              <img src="divesh.png" alt="Divesh Paswan" className="w-full h-full object-cover rounded-sm shadow-2xl" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#c26e00] -z-10 opacity-10"></div>
            <div className="absolute top-10 -left-10 text-[10px] rotate-90 origin-left uppercase tracking-[1em] opacity-20 whitespace-nowrap">
              THE ARCHITECT OF MEMORIES
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.6em] text-[#c26e00] font-bold">The Creative Director</p>
              <h3 className={`${playfair.className} text-5xl md:text-7xl italic font-bold text-[#c26e00]`}>Divesh Paswan</h3>
            </div>

            <div className="space-y-6 text-justify text-gray-700 font-light leading-loose md:text-lg">
              <p>
                <strong className="text-black uppercase tracking-widest text-sm">CEO & Post Production Head</strong> of Kanya Studio, Divesh Paswan is a visionary whose portfolio spans over <span className="text-[#c26e00] font-bold">3,000+ high-quality edits</span>.
              </p>
              <p>
                Having pioneered visual storytelling for Asia’s top-tier wedding firms, his approach is defined by an obsession with <span className="italic">lighting, composition, and emotional nuance.</span>
              </p>
              <p>
                With a decade of mastery in fashion photography, Divesh brings a distinctive high-end flair to the wedding industry—blending the grit of raw human emotion with the polish of high-fashion styling.
              </p>
            </div>
          </div>
        </div>
      </section >



      {/* --- WIDE ARCHIVAL SECTION --- */}
      < section className="" >
        <div className='w-full h-[40vh] md:h-[100vh] overflow-hidden transition-all duration-[2s] cursor-crosshair relative group'>
          <img src="/photo/WeddingImage/Haldi.png" alt="Process" className='w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105' />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
            <span className="text-white text-[10px] uppercase tracking-[1em] border border-white/50 px-8 py-4 backdrop-blur-md">View Archival Frames</span>
          </div>
        </div>
      </section >

      {/* --- SLIDER SECTION --- */}
      < div className="bg-white py-32 border-t border-black/5 text-center" >
        <p className="text-[#c26e00] text-[10px] uppercase tracking-[0.8em] font-bold mb-4">Motion & Still</p>
        <h4 className={`${playfair.className} text-5xl italic`}>The Gallery.</h4>
        <Slider />
      </div >

      <Footer />
    </div >
  )
}

export default AboutPage