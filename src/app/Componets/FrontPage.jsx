import React from 'react'
import Header from './Header'
import { Playfair_Display } from 'next/font/google'
import Photo from './Photo'
import Video from './Video'
import Footer from './Footer'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700'], // adjust as needed
    style: ['normal', 'italic'], // if you need italic
})

const FrontPage = () => {
    return (
        <div className='bg-[#f0e9e0] max-w-full md:w-full'>
            <div className="relative w-full">
                {/* Header - stays on top of the image */}
                <div className="absolute top-0 left-0 w-full z-20">
                    <Header />
                </div>

                {/* Background Image */}
                <img src="/front.png" alt="Home Image" className="w-full h-[60vh] sm:h-[70vh] md:h-[100vh] object-cover" />
            </div>

            <div className="bg-[#f0e9e0] w-full py-0 relative overflow-hidden mb-20 ">
                {/* Heading Section */}
                <h1 className={`${playfair.className} text-center mt-10  md:mt-30 text-black/90 text-4xl sm:text-3xl  md:text-6xl md:relative font-medium leading-tight px-4`}>
                    TIMELESS WEDDING STORIES <br />
                    <span className={`${playfair.className} text-2xl sm:text-3xl italic font-normal`}>with</span>{" "}
                    HEART, EMOTION, CINEMATIC </h1>

                {/* Content Section */}
                <div className="flex flex-col mt-5 md:flex-row justify-center items-center gap-8 px-6  lg:px-40">
                    {/* Left Image */}
                    <img
                        src="/photo/image.png"
                        alt="Wedding 1"
                        className="w-full md:w-70 h-60 md:h-90 lg:w-100 lg:h-140 object-cover shadow-md "
                    />

                    {/* Text Section */}
                    <p className={`${playfair.className} text-black text-sm md:text-md lg:text-xl  text-justify leading-relaxed md:w-1/2`}>
                        Considered to be the epitome of Modern Photography and Filmmaking, Kanya
                        Studios is dedicated to transforming wedding moments into timeless
                        memories. With a passion for storytelling through both photography and
                        videography. We focus on the emotions, the details, and the fleeting
                        moments that make every wedding unique. With over seven years of experience
                        in the wedding and video editing industry.
                    </p>

                    {/* Right Image */}
                    <img
                        src="/photo/image2.png"
                        alt="Wedding 2"
                        className="w-full md:w-70 h-64 md:h-90 lg:w-100 lg:h-140  lg:-mt-80 object-cover  shadow-md"
                    />
                </div>

            </div>

            <div className='mb-20 max-w-full' >
                <Photo />
            </div>
            <div>
                <Video />
            </div>
            <div className="relative w-full overflow-hidden group">
                {/* Background Image with subtle zoom effect on hover */}
                <div className="relative h-[75vh] sm:h-[85vh] md:h-[95vh] w-full overflow-hidden">
                    <img
                        src="/photo/WeddingImage/Kanya Studios Main.png"
                        alt="Main Background"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    {/* Sophisticated Gradient Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
                </div>

                {/* Floating Icon with refined positioning */}
                <div className="absolute top-12 sm:top-16 left-1/2 transform -translate-x-1/2 z-20">
                    <img
                        src="/photo/WeddingImage/icon.png"
                        alt="Fly Icon"
                        className="w-16 sm:w-20 md:w-32 lg:w-40 filter drop-shadow-2xl animate-fade-in"
                    />
                </div>

                {/* Text Content Section */}
                <div className="absolute inset-0 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 text-center text-white z-10 mt-12 sm:mt-20">
                    {/* Subtle Sub-heading */}
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 text-[#a0884d] font-medium">
                        Premier Photography Service
                    </span>

                    <p className={`${playfair.className} max-w-4xl text-sm sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-light italic opacity-95`}>
                        Fly Production House represents our premier photography service, led by
                        <span className="font-semibold text-[#f7dcba] not-italic"> Divesh Paswan</span>,
                        the visionary founder of Fly Production. Our mission is to craft timeless images
                        that capture the true essence of your special day.
                    </p>

                    {/* Secondary paragraph for better flow */}
                    <p className={`${playfair.className} max-w-3xl mt-6 text-xs sm:text-sm md:text-base opacity-80 leading-loose hidden sm:block`}>
                        With a refined, unobtrusive style and a focus on bright, airy visuals,
                        we create photographs that transport you back to those precious moments.
                        This exclusive experience is reserved for a select few weddings, reflecting
                        the care and dedication we pour into every frame.
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-4">
                        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-300">
                            Click below to explore the experience
                        </p>

                        {/* High-End Button Design */}
                        <a
                            href="https://flyproductionhouse.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${playfair.className} group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium tracking-tighter text-white bg-transparent border border-[#a0884d] rounded-full hover:text-black transition-all duration-500`}
                        >
                            <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-out transform translate-x-0 -skew-x-12 bg-[#a0884d] opacity-10 group-hover:bg-[#a0884d] group-hover:opacity-100 group-hover:skew-x-0"></span>
                            <span className="relative text-sm sm:text-lg tracking-[0.1em]">FLY PRODUCTION HOUSE</span>
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default FrontPage