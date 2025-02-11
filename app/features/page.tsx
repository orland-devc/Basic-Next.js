// app/features/page.tsx
import Navbar from '../components/Navbar';

export default function Features() {
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
                            <span className="block">This will be the</span>
                            <div className="block">
                                <span className='bg-gradient-to-r from-red-500 bg to-yellow-400 bg-clip-text text-transparent'>Features </span> 
                                <span className='text-gray-900'>Section</span>
                            </div>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti modi nulla magni a esse praesentium vero vitae culpa rerum.
                        </p>
                        </div>
                    </main>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}