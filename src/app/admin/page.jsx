'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const Login = ({ isAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        router.replace('/admin/dashboard');
      }
    }, [isAuthenticated, router]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please enter your credentials");
            return;
        }

        if (email === "admin@gmail.com" && password === "Admin123") {
            setError("");
            localStorage.setItem("isAuthenticated", 'true');
            sessionStorage.setItem("isAuthenticated", 'true');
            router.replace('/admin/dashboard');
        } else {
            setError("Invalid credentials. Access denied.");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0e9e0] px-6 relative overflow-hidden">
            
            {/* Background Decorative Element */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-bold text-black/[0.02] whitespace-nowrap pointer-events-none select-none ${playfair.className}`}>
                ADMIN PORTAL
            </div>

            <div className="w-full max-w-md bg-white/40 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 border border-white/20 relative z-10">
                {/* Logo & Branding */}
                <div className="flex flex-col items-center mb-10">
                    <img src="/logo.png" alt="logo" className='w-48 mb-6' />
                    <div className="h-[1px] w-12 bg-[#c26e00] mb-6 opacity-40"></div>
                    <h2 className={`${playfair.className} text-3xl italic text-gray-900`}>
                        Welcome back
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-2">
                        Authorized Access Only
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-[#c26e00]">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-[#c26e00] focus:outline-none transition-colors duration-300 font-light"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] uppercase tracking-widest font-bold text-[#c26e00]">
                            Secret Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-[#c26e00] focus:outline-none transition-colors duration-300 font-light"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-[10px] uppercase tracking-wider text-center animate-pulse">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-4 bg-black text-white py-4 rounded-full text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-[#c26e00] transition-all duration-500 shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <button 
                        onClick={() => router.push('/')}
                        className="text-[9px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
                    >
                        ← Return to Gallery
                    </button>
                </div>
            </div>

            {/* Bottom Credit */}
            <div className="absolute bottom-8 text-[9px] uppercase tracking-[0.5em] text-gray-400">
                Kanya Studio © 2026
            </div>
        </div>
    )
}

export default Login;