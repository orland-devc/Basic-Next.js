// app/components/HeroSection.tsx
'use client';

import React from 'react';
import Navbar from './Navbar';

const HeroSection = () => {
    return (
        <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16">
            <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
                    <div className="text-center">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        <span className="block">Welcome to</span>
                        <span className="block bg-gradient-to-r from-red-500 bg to-yellow-400 bg-clip-text text-transparent">Our Platform</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                        Transform your workflow with our innovative solution. 
                        Start improving your productivity today.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                        <div className="rounded-md shadow">
                        <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 md:py-4 md:text-lg md:px-10">
                            Get Started
                        </button>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3">
                        <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-700 bg-yellow-100 hover:bg-yellow-200 md:py-4 md:text-lg md:px-10">
                            Learn More
                        </button>
                        </div>
                    </div>
                    </div>
                </main>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default HeroSection;