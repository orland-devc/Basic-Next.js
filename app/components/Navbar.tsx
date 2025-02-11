/// app/components/Navbar.tsx
'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathname = usePathname();

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/features' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Blog', href: '/blog' },
        { name: 'Login', href: 'login'},
    ];

    const isActivePath = (path: string) => {
        return pathname === path;
    };

    return (
        <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
            <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-yellow-400">
                    Blahblah
                </Link>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActivePath(item.href)
                        ? 'text-yellow-400'
                        : 'text-gray-600 hover:text-yellow-400'
                    }`}
                >
                    {item.name}
                </Link>
                ))}
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors">
                Get Started
                </button>
            </div>

            <div className="md:hidden flex items-center">
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-yellow-400"
                >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            </div>
        </div>

        {isMenuOpen && (
            <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActivePath(item.href)
                        ? 'text-yellow-400'
                        : 'text-gray-600 hover:text-yellow-400'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    {item.name}
                </Link>
                ))}
                <button className="w-full bg-yellow-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-600 transition-colors">
                Get Started
                </button>
            </div>
            </div>
        )}
        </nav>
    );
};

export default Navbar;