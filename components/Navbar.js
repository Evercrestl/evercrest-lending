"use client"
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === '/';

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '/services' },
        { name: 'Contact', href: '/contact' },
        { name: 'Login', href: '/login' },
        { name: 'Register', href: '/register' },
    ];

    const scrollToSection = (id) => {
        if (!isHome) return;
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.png" alt="Logo" width={150} height={40} className="h-10 w-auto" priority />
                    </Link>
                    <div className="md:hidden flex items-center space-x-4">
                        <Link 
                            href="/login" 
                            className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                        >
                            Login
                        </Link>
                        <Link 
                            href="/register" 
                            className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                        >
                            Register
                        </Link>
                        {/* <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 p-1 outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button> */}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href || '#'}
                                className={`text-gray-700 hover:text-[#0056be] ${pathname === link.href ? 'text-brand-blue font-semibold' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* {isHome ? (
                            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-brand-blue">About</button>
                        ) : (
                            <Link href="/#about" className="text-gray-700 hover:text-brand-blue">About</Link>
                        )} */}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24} /> : <Menu size={24} />}</button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href || '#'}
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-gray-700"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;