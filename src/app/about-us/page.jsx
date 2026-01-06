import React from 'react'
import Header from '../Componets/Header'
import Footer from '../Componets/Footer'
import { Playfair_Display } from 'next/font/google'
import Slider from '../Componets/Slider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'], // adjust as needed
  style: ['normal', 'italic'], // if you need italic
})

const page = () => {
  return (
    <div className='relative bg-[#f0e9e0] '>
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="relative w-full h-[60vh] md:h-[100vh]">
        <video src="/photo/WeddingVideo/Aboutus.mp4" autoPlay loop muted className="w-full h-full object-cover"></video>
        {/* <h1 className={`${playfair.className} absolute inset-0 flex items-center justify-center top-100 md:top-200 text-3xl md:text-7xl align-bottom text-white font-bold md:font-normal`}>
          ABOUT US
        </h1> */}
      </div>

      <div className='py-20 bg-[#f0e9e0] px-5 '>
        <h1 className={`${playfair.className} text-center text-md font-bold text-[#c26e00] md:text-2xl py-2`}>KANYA STUDIO, a celebration of timeless grace. </h1>
        <p className={`${playfair.className}  text-md text-[#c26e00] md:text-xl text-center`}>
          At KANYA STUDIO, we believe in preserving emotions through art capturing every glance <br />
          every smile, and every story that defines the beauty of your most cherished moments.</p>
      </div>

      <div className="relative w-full h-[50vh] md:h-full overflow-hidden">
        <img src="/photo/WeddingImage/About.jpg" alt="About" className="w-full h-full object-cover" />

        <div className="absolute inset-0 flex flex-col items-center justify-center lg:top-0 text-center px-4">
          <h1 className={`${playfair.className} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#030303] leading-tight`}>
            FROM <br /> <span className="italic text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">Romance & Magic</span>
            <br />TO RAW<br />HUMAN DRAMA
          </h1>
        </div>
      </div>


      <div className="flex flex-col md:flex-row items-center justify-center max-w-full py-10 px-6 md:py-20 md:px-40">
        <img src="divesh.png" alt="DiveshProfile" className="w-60 h-90 md:w-90 md:h-120  object-cover shadow-lg" />
        <p className={`${playfair.className} text-base md:text-lg leading-relaxed text-justify mt-8 md:mt-0 md:ml-10  md:max-w-4xl`}>
          <span className="block text-3xl md:text-5xl font-bold leading-snug mb-3 text-[#c26e00]">
          Divesh Paswan</span> {"  "} CEO and Post Production Head of <strong>Kanya Studio</strong>, a seasoned creative professional 
          with extensive expertise in wedding and commercial editing. Successfully delivered over 3,000+ high-quality edits.
           Known for producing some of the finest edits in the wedding industry, having led projects for one of Asia’s 
           top 5 wedding companies, and continuing to be a trusted freelancer for premier brands.
          <br />
          <br />
          With over a decade of experience, Divesh is celebrated for his ability to capture love stories and emotions
          through visually stunning, heartfelt imagery. His background in fashion photography adds a distinctive flair
          to his work, blending artistry with an exceptional eye for detail, styling, lighting, and composition.
        </p>
      </div>

      <div className='w-full h-[80vh] md:h-full overflow-hidden py-10'>
        <img src="/photo/WeddingImage/Haldi.png" alt="haldiImage" className='w-full h-full object-cover ' />
      </div>

      <div>
        <Slider/>
      </div>

      <Footer />
    </div>
  )
}

export default page