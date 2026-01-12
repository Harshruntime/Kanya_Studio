'use client'

import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#f0e9e0] text-[#1a1a1a] pt-32 md:pt-48 pb-12 overflow-hidden border-t border-black/5">
      
      {/* 1. CINEMATIC MARQUEE - Adjusted for Mobile height */}
      <div className="absolute top-0 left-0 w-full overflow-hidden border-b border-black/5 py-6 md:py-10 select-none pointer-events-none bg-white/5 backdrop-blur-[2px]">
        <div className="flex whitespace-nowrap animate-marquee-slow">
          {[...Array(8)].map((_, i) => (
            <span key={i} className={`${playfair.className} text-[12px] md:text-[18px] uppercase tracking-[0.8em] md:tracking-[1.2em] opacity-30 px-6 md:px-12 font-light`}>
              The Art of Cinematic Storytelling • Kanya Studio • Est. 2024 •
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 40s linear infinite;
        }
      `}</style>

      {/* 2. ARCHITECTURAL BACKGROUND - Hidden on mobile/tablet to avoid clutter */}
      <div className={`absolute mt-20 top-0 right-10 text-[15vw] font-bold text-black/[0.03] leading-none pointer-events-none select-none flex flex-col uppercase tracking-tighter ${playfair.className} hidden xl:flex`}>
        <span>Kanya</span>
        <span className="ml-20">Studio</span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch">

          {/* LEFT: THE SIGNATURE BOX - Responsive padding & alignment */}
          <div className="w-full lg:w-2/5 py-10 lg:pr-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-black/5">
            <div className="space-y-8 md:space-y-12">
              <Link href="/" className="inline-block relative group">
                <img src="/logo.png" alt="logo" className="w-48 md:w-80 transition-transform duration-700" />
                <span className="absolute -bottom-4 left-0 text-[10px] uppercase tracking-[0.5em] text-[#a0884d] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Est. 2024</span>
              </Link>

              <h2 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl italic leading-tight text-gray-900 tracking-tighter`}>
                Preserving <br />
                <span className="text-[#a0884d] relative inline-block">
                  Essence
                  <span className="absolute -right-8 md:-right-12 top-1/2 w-6 md:w-8 h-[1px] bg-[#a0884d]"></span>
                </span> <br />
                Over Image.
              </h2>
            </div>
          </div>

          {/* RIGHT: INTERACTIVE DIRECTORY - Grid scales from 1 to 2 columns */}
          <div className="w-full lg:w-3/5 bg-black/[0.01] lg:bg-black/[0.02] p-6 md:p-10 lg:p-20 relative">
            <div className="absolute top-0 right-0 w-10 md:w-20 h-10 md:h-20 border-t border-r border-black/10"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 md:gap-20">
              {/* NAV LINKS */}
              <div className="space-y-8 md:space-y-12">
                <p className="text-[11px] md:text-[12px] uppercase tracking-[0.6em] font-bold text-[#a0884d]">The Archive</p>
                <nav className="flex flex-col gap-6 md:gap-8">
                  {[
                    { label: 'Photography', path: '/photo' },
                    { label: 'Cinematography', path: '/video' },
                    { label: 'About us', path: '/about-us' },
                    { label: 'Contact us', path: '/contact-us' }
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.path}
                      className="group flex items-center gap-4 w-fit"
                    >
                      <span className="text-[9px] font-mono opacity-30 group-hover:text-[#a0884d] transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="text-lg md:text-xl uppercase tracking-[0.2em] font-light group-hover:translate-x-3 group-hover:text-[#a0884d] transition-all duration-500">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* CONTACT CARD */}
              <div className="space-y-10 md:space-y-12 flex flex-col justify-between">
                <div className="space-y-6 md:space-y-8">
                  <p className="text-[11px] md:text-[12px] uppercase tracking-[0.6em] font-bold text-[#a0884d]">Electronic Mail</p>
                  <a href="mailto:flyproductionhouse.info@gmail.com" className={`${playfair.className} block text-lg md:text-xl italic hover:text-[#a0884d] transition-colors break-words leading-relaxed`}>
                    flyproductionhouse.info <br className="hidden sm:block" /> @gmail.com
                  </a>
                  <div className="pt-4 space-y-2">
                    <p className="text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-bold text-[#a0884d]">Main Headquarters</p>
                    <p className="text-sm md:text-md font-light leading-relaxed opacity-80">
                      3068, Rustomjee Eaze Zone <br />
                      Mall, Vasari Hill Rd, <br />
                      Malad West, Mumbai, 400104
                    </p>
                  </div>
                </div>

                {/* SOCIALS */}
                <div className="flex gap-8 pt-8 border-t border-black/10">
                  <a href="#" className="hover:text-[#a0884d] transition-colors transform hover:-translate-y-1 duration-300"><FaInstagram size={18} /></a>
                  <a href="#" className="hover:text-[#a0884d] transition-colors transform hover:-translate-y-1 duration-300"><FaYoutube size={20} /></a>
                  <a href="#" className="hover:text-[#a0884d] transition-colors transform hover:-translate-y-1 duration-300"><FaTwitter size={16} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM BAR - Stacks on mobile, inline on desktop */}
        <div className="mt-20 md:mt-32 border-t border-black/10 pt-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-10">

          {/* LEFT: LEGAL & COPYRIGHT */}
          <div className="space-y-6 text-center md:text-left order-2 md:order-1">
            <p className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-gray-500 font-medium">
              © {currentYear} Kanya Cinematic Studio. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-start gap-8 md:gap-10 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold">
              <Link href="/privacy" className="hover:text-[#a0884d] transition-colors duration-300 relative group">
                Privacy
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#a0884d] transition-all group-hover:w-full"></span>
              </Link>
              <Link href="/term-and-condition" className="hover:text-[#a0884d] transition-colors duration-300 relative group">
                Terms
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#a0884d] transition-all group-hover:w-full"></span>
              </Link>
            </div>
          </div>

          {/* RIGHT: AUTHOR CREDIT */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end gap-3 md:gap-5 order-1 md:order-2">
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-gray-400 italic">Developed with Intent by</p>
            <a href="https://harshvishwa.vercel.app/" target="_blank" className="group flex flex-col items-center md:items-end gap-1">
              <span className="text-xs md:text-sm font-bold tracking-[0.2em] group-hover:text-[#a0884d] transition-all duration-500">
                HARSH VISHWAKARMA
              </span>
              <div className="w-full h-[1px] bg-black/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#a0884d] -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
              </div>
              <span className="text-[9px] text-[#a0884d] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                VIEW PORTFOLIO <span>→</span>
              </span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer;