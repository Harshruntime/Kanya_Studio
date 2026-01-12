'use client'

import React from 'react'
import { Playfair_Display } from 'next/font/google'
import Footer from '../Componets/Footer'
import Header from '../Componets/Header'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const TermsPage = () => {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      id: "01",
      slug: "covenant",
      title: "The Covenant",
      content: "By engaging Kanya Studio, you are commissioning a bespoke artistic service. All bookings are formalized only upon the receipt of a non-refundable retainer and a signed digital agreement."
    },
    {
      id: "02",
      slug: "sovereignty",
      title: "Artistic Sovereignty",
      content: "We document truth. While we welcome your vision, the final selection of frames, cinematic color grading, and narrative sequence remains at the sole creative discretion of Kanya Studio."
    },
    {
      id: "03",
      slug: "property",
      title: "Intellectual Property",
      content: "The copyright of all visual assets remains the property of the Studio. Clients are granted a private license for personal display. Commercial use, resale, or third-party modifications are strictly prohibited."
    },
    {
      id: "04",
      slug: "timeline",
      title: "The Delivery Timeline",
      content: "Great art takes time. Standard delivery for a Cinematic Film is 12-16 weeks. Expedited 'First Look' galleries are typically delivered within 14 business days."
    }
  ];

  // FUNCTION TO HANDLE SMOOTH SCROLL
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Adjust this based on your header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-[#f0e9e0] min-h-screen text-[#1a1a1a] selection:bg-[#a0884d] selection:text-white">
      <Header/>
      {/* DECORATIVE BACKGROUND TEXT */}
      <div className={`fixed top-40 right-[-5%] text-[25vw] font-bold text-black/[0.01] leading-none pointer-events-none select-none ${playfair.className}`}>
        LEGAL
      </div>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-20 pb-32 relative z-10">
        
        {/* HEADER SECTION */}
        <header className="max-w-4xl border-l-4 border-[#a0884d] pl-8 mb-32">
          <p className="text-[10px] uppercase tracking-[0.8em] font-bold text-[#a0884d]">Protocol & Agreement</p>
          <h1 className={`${playfair.className} text-6xl md:text-8xl italic mt-6 leading-tight`}>
            Terms of <br /> <span className="opacity-40">Engagement</span>
          </h1>
          <p className="mt-8 text-sm uppercase tracking-widest opacity-50 font-light">
            Last Updated // January {currentYear}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-24">
          
          {/* LEFT: STICKY NAVIGATION (NOW FUNCTIONAL) */}
          <aside className="lg:w-1/3 hidden lg:block">
            <div className="sticky top-40 space-y-12">
              <div className="h-[1px] w-full bg-black/10 relative">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#a0884d]"></div>
              </div>
              <ul className="space-y-6">
                {sections.map((s) => (
                  <li 
                    key={s.id} 
                    onClick={() => scrollToSection(s.slug)}
                    className="group flex items-center gap-4 cursor-pointer"
                  >
                    <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">
                      {s.id}
                    </span>
                    <span className="text-xs uppercase tracking-[0.4em] font-bold group-hover:text-[#a0884d] transition-colors">
                      {s.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* RIGHT: TEXT CONTENT */}
          <div className="lg:w-2/3">
            <div className="space-y-32">
              {sections.map((section) => (
                <section 
                  key={section.id} 
                  id={section.slug} // ADDED ID FOR ANCHORING
                  className="group border-b border-black/5 pb-20 scroll-mt-40"
                >
                  <div className="flex items-baseline gap-6 mb-8">
                    <span className={`text-6xl md:text-8xl font-bold text-black/[0.03] ${playfair.className} group-hover:text-[#a0884d]/10 transition-colors`}>
                      {section.id}
                    </span>
                    <h2 className={`${playfair.className} text-3xl md:text-5xl italic tracking-tighter`}>
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-lg md:text-xl font-light leading-relaxed text-gray-700 max-w-xl">
                    {section.content}
                  </p>
                  
                  <div className="mt-12 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                    <div className="h-[1px] w-12 bg-[#a0884d]"></div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#a0884d]">Section Acknowledged</span>
                  </div>
                </section>
              ))}
            </div>

            {/* CALL TO ACTION */}
            <div className="mt-40 p-12 bg-black text-[#f0e9e0] text-center space-y-8 rounded-sm">
               <p className={`${playfair.className} text-3xl italic`}>Ready to secure your legacy?</p>
               <button className="px-10 py-4 border border-[#a0884d] text-[#a0884d] uppercase text-[10px] tracking-[0.5em] font-bold hover:bg-[#a0884d] hover:text-white transition-all duration-500">
                  Proceed to Booking
               </button>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default TermsPage;