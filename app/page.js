"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About us", href: "#about" },
  { label: "Contact us", href: "#contact" },
  { label: "Register", href: "/register" },
  { label: "Login", href: "/login" },
];

const benefits = [
  {
    title: "Transparent",
    text: "Learn how your loan works and how terms affect costs.",
  },
  {
    title: "Affordable",
    text: "Loans structured with fixed rates and flexible repayment.",
  },
  {
    title: "Flexible Options",
    text: "Choose terms up to 72 months for your needs.",
  },
];

const loans = [
  {
    title: "Personal Loan",
    img: "/images/personal-loan.png",
    desc: "Get quick cash with fast approval and flexible terms.",
  },
  {
    title: "Home Loan",
    img: "/images/home-loan.png",
    desc: "Turn your dream home into reality with affordable terms.",
  },
  {
    title: "Business Loan",
    img: "/images/business-loan.png",
    desc: "Boost your business cash flow, operations, or upgrades.",
  },
];

const testimonials = [
  {
    name: "Brian Moten",
    text: "Evercrest Lending made the loan process fast, transparent, and easy!",
  },
  {
    name: "Clarice Turner",
    text: "Amazing service and professional support throughout the loan application!",
  },
];

export default function HomePage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 font-sans space-y-4">

      {/* ===== HEADER ===== */}
      <header className="flex items-center justify-between py-6">
        <Image
          src="/logo.png"
          width={160}
          height={50}
          alt="Evercrest Lending"
          className="h-10 sm:h-12 w-auto"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-lg font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Login/Register Links */}
        <div className="flex md:hidden items-center gap-3 text-sm font-medium">
          <Link href="/login" className="text-sm font-medium">Login</Link>
          <Link href="/register" className="px-3 py-1.5 bg-blue-600 text-white rounded">
            Register
          </Link>
          <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
        </div>
        {/* Mobile Menu Button */}
      </header>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-white shadow-lg rounded-lg p-6 space-y-4 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* ===== HERO ===== */}
      <section id="home" className="flex flex-col items-start space-y-6">
        <div className="relative w-full h-96 sm:h-125 lg:h-150 mb-6 rounded-lg overflow-hidden">
          <Image
            src="/home.png"
            fill
            alt="Evercrest Lending"
            className="object-cover"
          />
        </div>
        <div className="max-w-2xl">
        <h2 className="text-4xl leading-tight lg:text-5xl font-bold text-[#07036b] text-left">
          Get Money in Minutes!
        </h2>
        </div>
        <p className="text-lg sm:text-xl text-[#07036b] max-w-3xl mx-auto text-justify">
          Access quick and affordable finance to fuel your hustle or attend to urgent needs. Join Philippine’s 1st Credit Membership.
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 font-semibold items-start md:items-center ">
          <Link href="/register" className="text-white rounded">
            Apply Now
          </Link>
        </button>
      </section>

      {/* ===== BENEFITS ===== */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {benefits.map((item) => (
          <div key={item.title} className="space-y-3">
            <h3 className="text-xl sm:text-2xl font-semibold">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.text}</p>
          </div>
        ))}
      </section>

      {/* ===== LOANS ===== */}
      <section id="services" className="space-y-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          For Every Goal, There’s an Evercrest Loan
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {loans.map((loan) => (
            <div
              key={loan.title}
              className="border rounded-xl p-6 text-center space-y-4"
            >
              <Image
                src={loan.img}
                width={200}
                height={140}
                alt={loan.title}
                className="mx-auto"
              />
              <h4 className="text-xl font-semibold">{loan.title}</h4>
              <p className="text-gray-600">{loan.desc}</p>
              {/* <button className="text-blue-600 font-medium">
                Apply Now
              </button> */}
            </div>
          ))}
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Our Customer’s Testimonials
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 border rounded-lg">
              <p className="italic text-gray-700">“{t.text}”</p>
              <p className="mt-4 font-semibold">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="max-w-lg mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Contact Us
        </h2>

        <form className="space-y-4">
          {["First Name", "Last Name", "Your Email*"].map((placeholder, i) => (
            <input
              key={i}
              type={placeholder.includes("Email") ? "email" : "text"}
              placeholder={placeholder}
              className="w-full border p-3 rounded-lg"
              required={placeholder.includes("*")}
            />
          ))}
          <textarea
            placeholder="Message*"
            className="w-full border p-3 rounded-lg"
            required
          />
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold">
            Submit
          </button>
        </form>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 Evercrest Lending. All Rights Reserved.
      </footer>

    </main>
  );
}


// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Menu, X, ArrowRight, CheckCircle2, ShieldCheck, Zap, Clock } from "lucide-react";

// const navLinks = [
//   { label: "Services", href: "#services" },
//   { label: "About us", href: "#about" },
//   { label: "Contact", href: "#contact" },
// ];

// const benefits = [
//   {
//     title: "Transparent",
//     text: "No hidden fees. Learn how your loan works and how terms affect costs.",
//     icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
//   },
//   {
//     title: "Affordable",
//     text: "Fixed rates and flexible repayment structured for your budget.",
//     icon: <Zap className="w-6 h-6 text-amber-500" />,
//   },
//   {
//     title: "Ultra Flexible",
//     text: "Choose terms up to 72 months tailored to your specific needs.",
//     icon: <Clock className="w-6 h-6 text-emerald-500" />,
//   },
// ];

// const loans = [
//   {
//     title: "Personal Loan",
//     img: "/images/personal-loan.png", // Ensure these paths exist
//     desc: "Quick cash with approval in minutes and minimal paperwork.",
//     tag: "Popular",
//   },
//   {
//     title: "Home Loan",
//     img: "/images/home-loan.png",
//     desc: "Turn your dream home into reality with market-leading rates.",
//   },
//   {
//     title: "Business Loan",
//     img: "/images/business-loan.png",
//     desc: "Fuel your growth with capital designed for modern entrepreneurs.",
//   },
// ];

// export default function HomePage() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Handle navbar background change on scroll
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">
      
//       {/* ===== NAVIGATION ===== */}
//       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
//       }`}>
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">E</span>
//             </div>
//             <span className="text-xl font-bold tracking-tight hidden sm:block">Evercrest</span>
//           </div>

//           <div className="hidden md:flex items-center space-x-10">
//             {navLinks.map((link) => (
//               <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
//                 {link.label}
//               </Link>
//             ))}
//             <div className="flex items-center gap-4 border-l pl-8 border-slate-200">
//               <Link href="/login" className="text-sm font-semibold hover:text-blue-600 transition-colors">Login</Link>
//               <Link href="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10">
//                 Get Started
//               </Link>
//             </div>
//           </div>

//           <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(!open)}>
//             {open ? <X /> : <Menu />}
//           </button>
//         </div>
//       </nav>

//       {/* ===== MOBILE OVERLAY ===== */}
//       {open && (
//         <div className="fixed inset-0 z-40 bg-white p-8 pt-24 space-y-8 animate-in slide-in-from-top duration-300">
//             {navLinks.map((link) => (
//               <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block text-3xl font-bold">
//                 {link.label}
//               </Link>
//             ))}
//             <hr />
//             <div className="flex flex-col gap-4">
//                 <Link href="/login" className="text-xl font-semibold text-center py-4 rounded-2xl bg-slate-100">Login</Link>
//                 <Link href="/register" className="text-xl font-semibold text-center py-4 rounded-2xl bg-blue-600 text-white">Register</Link>
//             </div>
//         </div>
//       )}

//       {/* ===== HERO SECTION ===== */}
//       <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
//           <div className="space-y-8 text-center lg:text-left">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
//               </span>
//               Philippine’s 1st Credit Membership
//             </div>
//             <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
//               Get Money in <span className="text-blue-600 italic">Minutes.</span>
//             </h1>
//             <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
//               Access quick, affordable finance to fuel your hustle or attend to urgent needs. Simple, digital, and built for you.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20">
//                 Apply for a Loan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//               <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
//                 View Rates
//               </button>
//             </div>
//           </div>
          
//           <div className="relative group">
//             <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
//             <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white">
//                 <Image src="/home.png" fill className="object-cover" alt="Finance Dashboard" priority />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== BENEFITS (BENTO STYLE) ===== */}
//       <section className="py-24 bg-slate-900 text-white overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-3 gap-8">
//             {benefits.map((benefit, idx) => (
//               <div key={idx} className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-colors group">
//                 <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
//                   {benefit.icon}
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
//                 <p className="text-slate-400 leading-relaxed">{benefit.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== LOANS SECTION ===== */}
//       <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
//         <div className="text-center mb-16 space-y-4">
//           <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Tailored Lending Solutions</h2>
//           <p className="text-slate-600">Choose the path that fits your current goals.</p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {loans.map((loan, idx) => (
//             <div key={idx} className="group relative bg-white border border-slate-100 p-2 rounded-[2.5rem] hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
//               <div className="relative h-64 w-full rounded-[2rem] overflow-hidden mb-6">
//                 <Image src={loan.img} fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt={loan.title} />
//                 {loan.tag && <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-widest">{loan.tag}</span>}
//               </div>
//               <div className="px-6 pb-8 text-center">
//                 <h3 className="text-2xl font-bold mb-3">{loan.title}</h3>
//                 <p className="text-slate-500 mb-6 text-sm leading-relaxed">{loan.desc}</p>
//                 <button className="w-full py-3 rounded-xl border border-slate-200 font-semibold group-hover:bg-slate-900 group-hover:text-white transition-colors">
//                   Check Eligibility
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== CONTACT FORM ===== */}
//       <section id="contact" className="py-24 px-6 bg-blue-600 relative overflow-hidden">
//         {/* Abstract Background Shapes */}
//         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

//         <div className="max-w-xl mx-auto relative z-10 bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl">
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold mb-2">Let’s talk!</h2>
//             <p className="text-slate-500">We usually respond in less than 2 hours.</p>
//           </div>
          
//           <form className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//                 <input type="text" placeholder="First Name" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all" />
//                 <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all" />
//             </div>
//             <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all" />
//             <textarea rows={4} placeholder="How can we help?" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all" />
//             <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-600/30 transition-all">
//               Send Message
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* ===== FOOTER ===== */}
//       <footer className="py-12 px-6 border-t border-slate-200">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
//             <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
//                     <span className="text-white font-bold text-sm">E</span>
//                 </div>
//                 <span className="font-bold">Evercrest Lending</span>
//             </div>
//             <div className="flex gap-8 text-sm text-slate-500 font-medium">
//                 <Link href="#">Privacy Policy</Link>
//                 <Link href="#">Terms of Service</Link>
//                 <Link href="#">Legal</Link>
//             </div>
//             <p className="text-slate-400 text-sm">© 2026 Evercrest. Built for the future.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, PlayCircle } from 'lucide-react';

// const NAV_LINKS = [
//   { name: 'Loans', href: '/loans' },
//   { name: 'About', href: '/about' },
//   { name: 'Careers', href: '/careers' },
//   { name: 'Help', href: '/help' },
//   { name: 'Blog', href: '/blog' },
//   { name: 'FAQs', href: '/faqs' },
// ];

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-white font-sans text-slate-900">
//       {/* Navigation */}
//       <nav className="flex items-center justify-between px-6 py-4 md:px-16 lg:px-24">
//         <div className="flex items-center gap-2">
//           <Link href="/" className="text-2xl font-bold flex items-center text-[#1A2B6D]">
//             <span className="text-[#00AEEF]">m</span>im
//             <span className="ml-2 text-[10px] leading-tight font-bold uppercase tracking-tighter">
//               Money in<br/>Minutes
//             </span>
//           </Link>
//         </div>

//         {/* Desktop Nav - Mapped */}
//         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
//           {NAV_LINKS.map((link) => (
//             <Link 
//               key={link.name} 
//               href={link.href} 
//               className="hover:text-[#00AEEF] transition-colors"
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         <div className="flex items-center gap-4">
//           <Link href="/login" className="hidden md:block text-sm font-bold text-[#1A2B6D]">
//             Login
//           </Link>
//           <button className="bg-[#00AEEF] hover:bg-sky-500 text-white px-6 py-2.5 rounded-md text-sm font-bold transition-all">
//             Apply Now
//           </button>
//           <button className="md:hidden">
//             <Menu className="w-6 h-6 text-[#1A2B6D]" />
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <main className="relative px-6 pt-8 md:pt-16 md:px-16 lg:px-24 max-w-7xl mx-auto">
//         <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          
//           {/* Content Column */}
//           <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#1A2B6D] leading-[1.1]">
//               Get Money in Minutes!
//             </h1>
//             <p className="text-lg text-slate-600 max-w-md mx-auto md:mx-0">
//               Access quick and affordable finance to fuel your hustle or attend to urgent needs. 
//               Join Nigeria's 1st Credit Membership.
//             </p>
            
//             <div className="pt-4">
//               <button className="w-full md:w-auto bg-[#00AEEF] hover:bg-sky-500 text-white px-10 py-4 rounded-md text-lg font-bold shadow-lg shadow-sky-100 transition-transform active:scale-95">
//                 Create your Account
//               </button>
//             </div>

//             <p className="text-sm font-semibold text-[#1A2B6D]">
//               Grow as high as you need from ₦5,000 upwards
//             </p>

//             {/* Google Play Button (Mobile Only) */}
//             <div className="md:hidden flex justify-center pt-4">
//                 <Link href="#" className="flex items-center border border-slate-200 rounded-xl px-5 py-2 gap-3 bg-white shadow-sm">
//                     <PlayCircle className="w-8 h-8 fill-black text-white" />
//                     <div className="text-left">
//                         <p className="text-[10px] text-slate-500 font-bold uppercase leading-none">Get it on</p>
//                         <p className="text-lg font-bold text-slate-800 leading-none">Google Play</p>
//                     </div>
//                 </Link>
//             </div>
//           </div>

//           {/* Image Column */}
//           <div className="w-full md:w-1/2 flex justify-center relative">
//             <div className="relative w-full aspect-[4/3] md:aspect-square max-w-[500px]">
//               <Image 
//                 src="/hero-phones.png" 
//                 alt="App Interface"
//                 fill
//                 className="object-contain"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }