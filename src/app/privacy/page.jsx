'use client'

import React, { useState, useEffect } from 'react'
import Header from '../Componets/Header'
import Footer from '../Componets/Footer'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const PrivacyPage = () => {
  // Fix: Initialize with null to prevent hydration mismatch
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Correct way to set the date on the client side
    const date = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric', // This must be "numeric", not a number like 2026
    });
    setLastUpdated(date);
  }, []);

  return (
    <div className="bg-[#f0e9e0] min-h-screen selection:bg-[#a0884d] selection:text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24">
        {/* HERO SECTION */}
        <div className="border-b border-black/10 pb-12 mb-16">
          <div className="overflow-hidden">
             <span className="inline-block text-[10px] uppercase tracking-[0.5em] text-[#a0884d] font-bold animate-slide-up">
               Legal Transparency
             </span>
          </div>
          <h1 className={`${playfair.className} text-5xl md:text-8xl italic mt-4 text-[#1a1a1a] tracking-tighter`}>
            Privacy <span className="opacity-30">&</span> Data
          </h1>
          
          {/* Last Updated with subtle pulse until loaded */}
          <p className={`mt-6 text-sm text-gray-500 font-light italic transition-opacity duration-500 ${lastUpdated ? 'opacity-100' : 'opacity-0'}`}>
            Last Updated: {lastUpdated}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* LEFT: STICKY NAVIGATION (Hidden on Mobile, Clean on Desktop) */}
          <aside className="lg:w-1/4">
            <div className="sticky top-32 space-y-8 hidden lg:block">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-30 mb-6">Contents</p>
                <nav className="flex flex-col gap-6 text-[10px] uppercase tracking-[0.2em] border-l border-black/5 pl-6">
                  <a href="#collection" className="hover:text-[#a0884d] transition-all hover:pl-2">01. Information Collection</a>
                  <a href="#usage" className="hover:text-[#a0884d] transition-all hover:pl-2">02. Data Usage</a>
                  <a href="#protection" className="hover:text-[#a0884d] transition-all hover:pl-2">03. Digital Security</a>
                  <a href="#rights" className="hover:text-[#a0884d] transition-all hover:pl-2">04. Your Rights</a>
                </nav>
              </div>

              {/* Quick Contact Box */}
              <div className="p-6 bg-black/5 rounded-sm">
                <p className="text-[9px] uppercase tracking-widest font-bold mb-2">Need Clarity?</p>
                <p className="text-xs text-gray-500 font-light leading-relaxed mb-4">Our privacy officer is available for direct consultation.</p>
                <a href="mailto:flyproductionhouse.info@gmail.com" className="text-[10px] font-bold border-b border-black pb-1 uppercase tracking-tighter hover:text-[#a0884d] hover:border-[#a0884d] transition-colors">
                    Request Info
                </a>
              </div>
            </div>
          </aside>

          {/* RIGHT: CONTENT AREA */}
          <div className="lg:w-3/4 space-y-32">
            
            {/* SECTION 01 */}
            <section id="collection" className="scroll-mt-32 group">
              <div className="flex items-center gap-6 mb-8">
                <span className="text-xs font-mono opacity-20 group-hover:opacity-100 transition-opacity">/ 01</span>
                <h2 className={`${playfair.className} text-3xl md:text-4xl italic`}>Information Collection</h2>
              </div>
              <div className="text-gray-700 leading-relaxed font-light space-y-6 max-w-2xl">
                <p className="text-lg">
                  At Kanya Studio, we value the intimacy of your events. We collect personal information specifically to provide our cinematic services.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#a0884d]">Direct Data</p>
                        <p className="text-sm opacity-70">Names, Emails, Phone Numbers, and Event Locations.</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-[#a0884d]">Media Data</p>
                        <p className="text-sm opacity-70">Raw footage, voice recordings, and candid photography.</p>
                    </div>
                </div>
              </div>
            </section>

            {/* SECTION 02 */}
            <section id="usage" className="scroll-mt-32 group">
              <div className="flex items-center gap-6 mb-8">
                <span className="text-xs font-mono opacity-20 group-hover:opacity-100 transition-opacity">/ 02</span>
                <h2 className={`${playfair.className} text-3xl md:text-4xl italic`}>Data Usage</h2>
              </div>
              <p className="text-gray-700 leading-relaxed font-light max-w-2xl text-lg">
                Your data is exclusively used to coordinate logistics and deliver your final cinematic products. 
                <span className="block mt-4 text-sm italic opacity-60 italic underline decoration-[#a0884d]/30">
                  We never sell your personal narrative to third-party advertisers.
                </span>
              </p>
            </section>

            {/* SECTION 03 */}
            <section id="protection" className="scroll-mt-32 group">
              <div className="flex items-center gap-6 mb-8">
                <span className="text-xs font-mono opacity-20 group-hover:opacity-100 transition-opacity">/ 03</span>
                <h2 className={`${playfair.className} text-3xl md:text-4xl italic`}>Digital Security</h2>
              </div>
              <div className="relative p-10 border border-black/5 bg-white/40 backdrop-blur-md rounded-sm overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <p className={`${playfair.className} text-xl md:text-2xl text-gray-800 leading-relaxed italic`}>
                  "We treat your footage like a family heirloom. All raw files are stored on encrypted local drives and secure cloud environments."
                </p>
              </div>
            </section>

            {/* CTA SECTION */}
            <div className="pt-20 border-t border-black/10">
              <div className="bg-[#1a1a1a] p-12 text-center space-y-6">
                <h3 className={`${playfair.className} text-white text-3xl italic`}>Privacy Concerns?</h3>
                <p className="text-sm font-light text-gray-400 max-w-md mx-auto">
                    Our legal team and studio manager are available to clarify how we protect your legacy.
                </p>
                <div className="pt-4">
                    <a 
                        href="mailto:flyproductionhouse.info@gmail.com" 
                        className="inline-block text-[10px] uppercase tracking-[0.4em] border border-white/20 text-white px-12 py-5 hover:bg-white hover:text-black transition-all duration-500"
                    >
                        Email Privacy Officer
                    </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default PrivacyPage;