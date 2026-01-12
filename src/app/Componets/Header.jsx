"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  return (
    <nav className={`w-full `}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* --- MOBILE LOGO --- */}
        <Link href="/" className="md:hidden">
          <img src="/logo.png" alt="Logo" className="w-32 object-contain" />
        </Link>

        {/* --- DESKTOP MENU (LEFT) --- */}
        <div className="hidden md:flex flex-1 justify-end gap-10 items-center">
          <Link href="/photo" className={`${playfair.className}  text-[14px] tracking-[0.4em] font-bold hover:text-[#a0884d] transition-colors`}>
            PHOTOGRAPHY
          </Link>
          <Link href="/video" className={`${playfair.className}  text-[14px] tracking-[0.4em] font-bold hover:text-[#a0884d] transition-colors`}>
            FILMS
          </Link>
        </div>

        {/* --- CENTRAL LOGO --- */}
        <Link href="/" className="hidden md:block px-6">
          <img 
            src="/logo.png" 
            alt="Logo" 
            className={`transition-all duration-700 object-contain ${scrolled ? 'w-48' : 'w-72'}`} 
          />
        </Link>

        {/* --- DESKTOP MENU (RIGHT) --- */}
        <div className="hidden md:flex flex-1 justify-start gap-12 items-center">
          <Link href="/about-us" className={`${playfair.className}  text-[14px] tracking-[0.4em] font-bold hover:text-[#a0884d] transition-colors`}>
            ABOUT
          </Link>
          <Link href="/contact-us" className={`${playfair.className}  text-[14px] tracking-[0.4em] font-bold hover:text-[#a0884d] transition-colors`}>
            CONTACT
          </Link>
        </div>

        {/* --- MOBILE BURGER BUTTON --- */}
        <button 
          className="md:hidden flex flex-col gap-1.5 z-[110]" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-8 h-[1px] bg-black transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-8 h-[1px] bg-black transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-8 h-[1px] bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* --- MOBILE FULL-SCREEN MENU --- */}
      <div className={`fixed inset-0 bg-[#f0e9e0] z-[105] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="flex flex-col items-center gap-10">
          {[
            { label: 'Photography', path: '/photo' },
            { label: 'Films', path: '/video' },
            { label: 'About Us', path: '/about-us' },
            { label: 'Contact Us', path: '/contact-us' }
          ].map((item, idx) => (
            <Link 
              key={idx} 
              href={item.path} 
              onClick={() => setMenuOpen(false)}
              className={`${playfair.className} text-3xl italic tracking-tighter hover:text-[#a0884d] transition-colors`}
            >
              {item.label}
            </Link>
          ))}
          <img src="/logo.png" alt="Logo" className="w-40 mt-10 opacity-50" />
        </div>
      </div>
      
    </nav>
  );
}

export default Header;