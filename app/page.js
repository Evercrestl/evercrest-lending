// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Menu, X, DollarSign, PiggyBank, TrendingUp, Award, ArrowRight, Shield, Clock, Percent, CheckCircle, Users } from "lucide-react";

// const navLinks = [
//   { label: "Home", href: "#home" },
//   { label: "Services", href: "#services" },
//   { label: "About us", href: "#about" },
//   { label: "Contact us", href: "#contact" },
//   { label: "Register", href: "/register" },
//   { label: "Login", href: "/login" },
// ];

// const benefits = [
//   {
//     title: "Transparent",
//     text: "Learn how your loan works and how terms affect costs.",
//   },
//   {
//     title: "Affordable",
//     text: "Loans structured with fixed rates and flexible repayment.",
//   },
//   {
//     title: "Flexible Options",
//     text: "Choose terms up to 72 months for your needs.",
//   },
// ];

// const loans = [
//   {
//     title: "Personal Loan",
//     img: "/images/personal-loan.png",
//     desc: "Get quick cash with fast approval and flexible terms.",
//   },
//   {
//     title: "Home Loan",
//     img: "/images/home-loan.png",
//     desc: "Turn your dream home into reality with affordable terms.",
//   },
//   {
//     title: "Business Loan",
//     img: "/images/business-loan.png",
//     desc: "Boost your business cash flow, operations, or upgrades.",
//   },
// ];

// const testimonials = [
//   {
//     name: "Brian Moten",
//     text: "Evercrest Lending made the loan process fast, transparent, and easy!",
//   },
//   {
//     name: "Clarice Turner",
//     text: "Amazing service and professional support throughout the loan application!",
//   },
// ];

// const features = [
//     {
//       icon: <DollarSign className="w-12 h-12 text-teal-400" />,
//       title: "QUICK",
//       description: "Access affordable finance in minutes.",
//     },
//     {
//       icon: <PiggyBank className="w-12 h-12 text-teal-400" />,
//       title: "FLEXIBLE",
//       description: "There is something for everyone.",
//     },
//     {
//       icon: <TrendingUp className="w-12 h-12 text-teal-400" />,
//       title: "GROWTH",
//       description: "Build a positive credit profile with our range of products.",
//     },
//     {
//       icon: <Award className="w-12 h-12 text-teal-400" />,
//       title: "VALUE",
//       description: "Get rewards that keep on giving with your account as premium membership",
//     },
//   ];

// export default function HomePage() {
//   const [open, setOpen] = useState(false);

//   return (
//     <main className="max-w-7xl mx-auto sm:px-6 font-sans space-y-4">

//       {/* ===== HEADER ===== */}
//       <header className="flex items-center justify-between py-6">
//         <Image
//           src="/logo.png"
//           width={160}
//           height={50}
//           alt="Evercrest Lending"
//           className="h-10 sm:h-12 w-auto"
//         />

//         {/* Desktop Nav */}
//         <nav className="hidden px-4 md:flex space-x-8 text-lg font-medium">
//           {navLinks.map((link) => (
//             <Link key={link.href} href={link.href}>
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         {/* Mobile Login/Register Links */}
//         <div className="flex md:hidden items-center gap-3 text-sm font-medium">
//           <Link href="/login" className="text-sm font-medium">Login</Link>
//           <Link href="/register" className="px-3 py-1.5 bg-blue-600 text-white rounded">
//             Register
//           </Link>
//           <button
//           className="md:hidden"
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle Menu"
//         >
//           {open ? <X size={28} /> : <Menu size={28} />}
//         </button>
//         </div>
//         {/* Mobile Menu Button */}
//       </header>

//       {/* Mobile Nav */}
//       {open && (
//         <div className="md:hidden px-4 bg-white shadow-lg rounded-lg p-6 space-y-4 text-lg font-medium">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setOpen(false)}
//               className="block"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* ===== HERO ===== */}
//       {/* <section id="home" className="flex flex-col items-start px-4 space-y-6">
//         <div className="relative w-full h-96 sm:h-125 lg:h-150 mb-6 rounded-lg overflow-hidden">
//           <Image
//             src="/home.png"
//             fill
//             alt="Evercrest Lending"
//             className="object-cover"
//           />
//         </div>
//         <div className="max-w-2xl">
//         <h2 className="text-4xl leading-9 lg:text-5xl font-bold text-[#07036b] text-left">
//           Get Money in Minutes!
//         </h2>
//         </div>
//         <p className="text-lg sm:text-xl text-[#07036b] max-w-3xl mx-auto text-justify">
//           Access quick and affordable finance to fuel your hustle or attend to urgent needs. Join Philippine’s 1st Credit Membership.
//         </p>
//         <button className="bg-[#07036b] text-white px-8 py-4 font-semibold items-start md:items-center ">
//           <Link href="/register" className="text-white rounded">
//             Create your Account
//           </Link>
//         </button>
//         <p className="text-[#07036b] leading-6 text-base">Grow as high as you need from ₱10,000 upwards</p>
//       </section>

//       <section className="max-w-7xl mx-auto px-4 lg:px-8 Py-12 mt-24 bg-[#e6f3fa] mb-24">
//           <h2 className="text-2xl sm:text-3xl font-bold text-left text-[#07036b] sm:mt-12 leading-10 pt-20">
//           Build a financial Lifestyle that works for you
//         </h2>

//       {/* Features Grid */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-2">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className=" hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="flex flex-col items-start space-y-4">
//                 <div className="bg-[#e6f3fa] rounded-xl">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-[#07036b] uppercase tracking-wide">
//                   {feature.title}
//                 </h3>
//                 <p className="text-[#07036b] leading-relaxed">
//                   {feature.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* Our Products Section */}
//         {/* <div className="mt-10 mb-24">
//           <div className="py-8">
//             <div className="flex items-center space-x-3">
//               <h2 className="text-xl font-bold text-[#07036b]">Our Products</h2>
//             </div>
//           </div>
//         </div>
//       </section> */} 

          
//       <section className="relative flex items-center justify-center pt-16">
//         <div className="absolute inset-0 z-0">
//           <Image 
//             src="/home.png" 
//             alt="Happy couple moving into new home"
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-linear-to-r from-brand-dark/90 to-brand-blue/40"></div>
//         </div>
        
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left w-full">
//           <div className="md:w-2/3 lg:w-1/2">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//               Building Your Future, <br/>
//               <span className="text-brand-accent">One Loan at a Time</span>
//             </h1>
//             <p className="text-xl text-gray-100 mb-8 leading-relaxed">
//               Experience hassle-free lending with Evercrest. Whether it's your dream home or business expansion, we provide the financial foundation you need.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4">
//               <button className="px-8 py-4 bg-brand-accent text-white font-semibold rounded-lg hover:bg-blue-400 transition-all shadow-lg flex items-center justify-center">
//                 Get Started Now <ArrowRight className="ml-2" size={20} />
//               </button>
//               <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center">
//                 View Rates
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-white" id="features">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Evercrest?</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               We combine modern technology with traditional banking values to offer you the best lending experience.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="p-8 bg-brand-light rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
//               <div className="w-14 h-14 bg-brand-blue rounded-lg flex items-center justify-center mb-6 text-white">
//                 <Percent size={28} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Rates</h3>
//               <p className="text-gray-600">
//                 We offer some of the lowest interest rates in the market, ensuring your loan is affordable and manageable.
//               </p>
//             </div>
            
//             <div className="p-8 bg-brand-light rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
//               <div className="w-14 h-14 bg-brand-blue rounded-lg flex items-center justify-center mb-6 text-white">
//                 <Clock size={28} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Approval</h3>
//               <p className="text-gray-600">
//                 Our streamlined digital process means you can get approved in minutes, not days. No more waiting in lines.
//               </p>
//             </div>
            
//             <div className="p-8 bg-brand-light rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
//               <div className="w-14 h-14 bg-brand-blue rounded-lg flex items-center justify-center mb-6 text-white">
//                 <Shield size={28} />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
//               <p className="text-gray-600">
//                 Your financial data is protected with bank-grade encryption. We prioritize your privacy and security above all.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section className="py-20 bg-gray-50" id="about">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             <div className="lg:w-1/2">
//               <Image 
//                 src="/home.png" 
//                 alt="Business handshake"
//                 fill 
//                 className="rounded-2xl shadow-2xl w-full object-cover h-125"
//               />
//             </div>
//             <div className="lg:w-1/2">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Committed to Your Financial Success</h2>
//               <p className="text-lg text-gray-600 mb-6">
//                 At Evercrest Lending, we believe that financial freedom should be accessible to everyone. Founded in 2010, we have helped over 50,000 families and businesses achieve their goals.
//               </p>
//               <p className="text-lg text-gray-600 mb-8">
//                 Our team of financial experts works tirelessly to find the best loan solutions for your unique situation. We don't just lend money; we build lasting partnerships.
//               </p>
              
//               <div className="space-y-4">
//                 <div className="flex items-center">
//                   <CheckCircle className="text-brand-blue mr-3" size={24} />
//                   <span className="text-gray-800 font-medium">Transparent terms with no hidden fees</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="text-brand-blue mr-3" size={24} />
//                   <span className="text-gray-800 font-medium">Personalized loan options</span>
//                 </div>
//                 <div className="flex items-center">
//                   <CheckCircle className="text-brand-blue mr-3" size={24} />
//                   <span className="text-gray-800 font-medium">24/7 Customer support</span>
//                 </div>
//               </div>
              
//               <button className="mt-8 px-6 py-3 border-2 border-brand-blue text-brand-blue font-semibold rounded-lg hover:bg-brand-blue hover:text-white transition-colors">
//                 Learn More About Us
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-brand-blue text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//             <div>
//               <div className="text-4xl font-bold mb-2">$500M+</div>
//               <div className="text-blue-200">Loans Funded</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">50k+</div>
//               <div className="text-blue-200">Happy Customers</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">98%</div>
//               <div className="text-blue-200">Approval Rate</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold mb-2">15+</div>
//               <div className="text-blue-200">Years Experience</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 bg-white" id="services">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Lending Solutions</h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Tailored financial products designed to meet your specific needs at every stage of life.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { id: "personal-loans", title: "Personal Loans", icon: Users, desc: "Flexible personal loans for debt consolidation, travel, or unexpected expenses." },
//               { id: "home-mortgages", title: "Home Mortgages", icon: Shield, desc: "Competitive mortgage rates to help you buy your dream home with confidence." },
//               { id: "business-growth", title: "Business Growth", icon: TrendingUp, desc: "Capital to expand your business, buy equipment, or hire new talent." },
//               { id: "auto-loans", title: "Auto Loans", icon: ArrowRight, desc: "Get behind the wheel faster with our quick auto loan approvals." },
//               { id: "student-loans", title: "Student Loans", icon: Percent, desc: "Invest in your education with low-interest student loan options." },
//               { id: "refinancing", title: "Refinancing", icon: Clock, desc: "Lower your monthly payments by refinancing your existing loans." }
//             ].map((service, index) => (
//               <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-brand-blue/30 transition-all hover:-translate-y-1">
//                 <div className="w-12 h-12 bg-brand-light text-brand-blue rounded-full flex items-center justify-center mb-6">
//                   <service.icon size={24} />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
//                 <p className="text-gray-600 mb-4">{service.desc}</p>
//                 <Link href={`/services#${service.id}`} className="text-brand-blue font-medium hover:text-brand-dark flex items-center">
//                   Learn more <ArrowRight size={16} className="ml-1" />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gray-900 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <Image 
//             src="/home.png" 
//             alt="Finance background"
//             fill
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Take the Next Step?</h2>
//           <p className="text-xl text-gray-300 mb-8">
//             Join thousands of satisfied customers who have chosen Evercrest Lending for their financial needs. Apply today and get a decision in minutes.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button className="px-8 py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg">
//               Apply Now
//             </button>
//             {/* <Link to="/contact" className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors inline-block">
//               Contact Support
//             </Link> */}
//           </div>
//         </div>
//       </section>

//       {/* ===== FOOTER ===== */}
//       <footer className="text-center py-6 text-gray-500 text-sm">
//         © 2025 Evercrest Lending. All Rights Reserved.
//       </footer>

//     </main>
//   );
// }


// // "use client";

// // import { useState, useEffect } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { Menu, X, ArrowRight, CheckCircle2, ShieldCheck, Zap, Clock } from "lucide-react";

// // const navLinks = [
// //   { label: "Services", href: "#services" },
// //   { label: "About us", href: "#about" },
// //   { label: "Contact", href: "#contact" },
// // ];

// // const benefits = [
// //   {
// //     title: "Transparent",
// //     text: "No hidden fees. Learn how your loan works and how terms affect costs.",
// //     icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
// //   },
// //   {
// //     title: "Affordable",
// //     text: "Fixed rates and flexible repayment structured for your budget.",
// //     icon: <Zap className="w-6 h-6 text-amber-500" />,
// //   },
// //   {
// //     title: "Ultra Flexible",
// //     text: "Choose terms up to 72 months tailored to your specific needs.",
// //     icon: <Clock className="w-6 h-6 text-emerald-500" />,
// //   },
// // ];

// // const loans = [
// //   {
// //     title: "Personal Loan",
// //     img: "/images/personal-loan.png", // Ensure these paths exist
// //     desc: "Quick cash with approval in minutes and minimal paperwork.",
// //     tag: "Popular",
// //   },
// //   {
// //     title: "Home Loan",
// //     img: "/images/home-loan.png",
// //     desc: "Turn your dream home into reality with market-leading rates.",
// //   },
// //   {
// //     title: "Business Loan",
// //     img: "/images/business-loan.png",
// //     desc: "Fuel your growth with capital designed for modern entrepreneurs.",
// //   },
// // ];

// // export default function HomePage() {
// //   const [open, setOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);

// //   // Handle navbar background change on scroll
// //   useEffect(() => {
// //     const handleScroll = () => setScrolled(window.scrollY > 20);
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   return (
// //     <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100">
      
// //       {/* ===== NAVIGATION ===== */}
// //       <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
// //         scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
// //       }`}>
// //         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
// //           <div className="flex items-center gap-2">
// //             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
// //                 <span className="text-white font-bold text-xl">E</span>
// //             </div>
// //             <span className="text-xl font-bold tracking-tight hidden sm:block">Evercrest</span>
// //           </div>

// //           <div className="hidden md:flex items-center space-x-10">
// //             {navLinks.map((link) => (
// //               <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
// //                 {link.label}
// //               </Link>
// //             ))}
// //             <div className="flex items-center gap-4 border-l pl-8 border-slate-200">
// //               <Link href="/login" className="text-sm font-semibold hover:text-blue-600 transition-colors">Login</Link>
// //               <Link href="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10">
// //                 Get Started
// //               </Link>
// //             </div>
// //           </div>

// //           <button className="md:hidden p-2 text-slate-600" onClick={() => setOpen(!open)}>
// //             {open ? <X /> : <Menu />}
// //           </button>
// //         </div>
// //       </nav>

// //       {/* ===== MOBILE OVERLAY ===== */}
// //       {open && (
// //         <div className="fixed inset-0 z-40 bg-white p-8 pt-24 space-y-8 animate-in slide-in-from-top duration-300">
// //             {navLinks.map((link) => (
// //               <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block text-3xl font-bold">
// //                 {link.label}
// //               </Link>
// //             ))}
// //             <hr />
// //             <div className="flex flex-col gap-4">
// //                 <Link href="/login" className="text-xl font-semibold text-center py-4 rounded-2xl bg-slate-100">Login</Link>
// //                 <Link href="/register" className="text-xl font-semibold text-center py-4 rounded-2xl bg-blue-600 text-white">Register</Link>
// //             </div>
// //         </div>
// //       )}

// //       {/* ===== HERO SECTION ===== */}
// //       <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
// //         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
// //           <div className="space-y-8 text-center lg:text-left">
// //             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
// //               <span className="relative flex h-2 w-2">
// //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
// //                 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
// //               </span>
// //               Philippine’s 1st Credit Membership
// //             </div>
// //             <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
// //               Get Money in <span className="text-blue-600 italic">Minutes.</span>
// //             </h1>
// //             <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
// //               Access quick, affordable finance to fuel your hustle or attend to urgent needs. Simple, digital, and built for you.
// //             </p>
// //             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
// //               <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/20">
// //                 Apply for a Loan <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
// //               </button>
// //               <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
// //                 View Rates
// //               </button>
// //             </div>
// //           </div>
          
// //           <div className="relative group">
// //             <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
// //             <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white">
// //                 <Image src="/home.png" fill className="object-cover" alt="Finance Dashboard" priority />
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ===== BENEFITS (BENTO STYLE) ===== */}
// //       <section className="py-24 bg-slate-900 text-white overflow-hidden">
// //         <div className="max-w-7xl mx-auto px-6">
// //           <div className="grid md:grid-cols-3 gap-8">
// //             {benefits.map((benefit, idx) => (
// //               <div key={idx} className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700 hover:border-blue-500 transition-colors group">
// //                 <div className="w-12 h-12 rounded-2xl bg-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
// //                   {benefit.icon}
// //                 </div>
// //                 <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
// //                 <p className="text-slate-400 leading-relaxed">{benefit.text}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* ===== LOANS SECTION ===== */}
// //       <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
// //         <div className="text-center mb-16 space-y-4">
// //           <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Tailored Lending Solutions</h2>
// //           <p className="text-slate-600">Choose the path that fits your current goals.</p>
// //         </div>

// //         <div className="grid md:grid-cols-3 gap-8">
// //           {loans.map((loan, idx) => (
// //             <div key={idx} className="group relative bg-white border border-slate-100 p-2 rounded-[2.5rem] hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
// //               <div className="relative h-64 w-full rounded-[2rem] overflow-hidden mb-6">
// //                 <Image src={loan.img} fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt={loan.title} />
// //                 {loan.tag && <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase tracking-widest">{loan.tag}</span>}
// //               </div>
// //               <div className="px-6 pb-8 text-center">
// //                 <h3 className="text-2xl font-bold mb-3">{loan.title}</h3>
// //                 <p className="text-slate-500 mb-6 text-sm leading-relaxed">{loan.desc}</p>
// //                 <button className="w-full py-3 rounded-xl border border-slate-200 font-semibold group-hover:bg-slate-900 group-hover:text-white transition-colors">
// //                   Check Eligibility
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ===== CONTACT FORM ===== */}
// //       <section id="contact" className="py-24 px-6 bg-blue-600 relative overflow-hidden">
// //         {/* Abstract Background Shapes */}
// //         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
// //         <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>

// //         <div className="max-w-xl mx-auto relative z-10 bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl">
// //           <div className="text-center mb-10">
// //             <h2 className="text-3xl font-bold mb-2">Let’s talk!</h2>
// //             <p className="text-slate-500">We usually respond in less than 2 hours.</p>
// //           </div>
          
// //           <form className="space-y-4">
// //             <div className="grid grid-cols-2 gap-4">
// //                 <input type="text" placeholder="First Name" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all" />
// //                 <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all" />
// //             </div>
// //             <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all" />
// //             <textarea rows={4} placeholder="How can we help?" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all" />
// //             <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-600/30 transition-all">
// //               Send Message
// //             </button>
// //           </form>
// //         </div>
// //       </section>

// //       {/* ===== FOOTER ===== */}
// //       <footer className="py-12 px-6 border-t border-slate-200">
// //         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
// //             <div className="flex items-center gap-2">
// //                 <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
// //                     <span className="text-white font-bold text-sm">E</span>
// //                 </div>
// //                 <span className="font-bold">Evercrest Lending</span>
// //             </div>
// //             <div className="flex gap-8 text-sm text-slate-500 font-medium">
// //                 <Link href="#">Privacy Policy</Link>
// //                 <Link href="#">Terms of Service</Link>
// //                 <Link href="#">Legal</Link>
// //             </div>
// //             <p className="text-slate-400 text-sm">© 2026 Evercrest. Built for the future.</p>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // import Link from 'next/link';
// // import Image from 'next/image';
// // import { Menu, PlayCircle } from 'lucide-react';

// // const NAV_LINKS = [
// //   { name: 'Loans', href: '/loans' },
// //   { name: 'About', href: '/about' },
// //   { name: 'Careers', href: '/careers' },
// //   { name: 'Help', href: '/help' },
// //   { name: 'Blog', href: '/blog' },
// //   { name: 'FAQs', href: '/faqs' },
// // ];

// // export default function LandingPage() {
// //   return (
// //     <div className="min-h-screen bg-white font-sans text-slate-900">
// //       {/* Navigation */}
// //       <nav className="flex items-center justify-between px-6 py-4 md:px-16 lg:px-24">
// //         <div className="flex items-center gap-2">
// //           <Link href="/" className="text-2xl font-bold flex items-center text-[#1A2B6D]">
// //             <span className="text-[#00AEEF]">m</span>im
// //             <span className="ml-2 text-[10px] leading-tight font-bold uppercase tracking-tighter">
// //               Money in<br/>Minutes
// //             </span>
// //           </Link>
// //         </div>

// //         {/* Desktop Nav - Mapped */}
// //         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
// //           {NAV_LINKS.map((link) => (
// //             <Link 
// //               key={link.name} 
// //               href={link.href} 
// //               className="hover:text-[#00AEEF] transition-colors"
// //             >
// //               {link.name}
// //             </Link>
// //           ))}
// //         </div>

// //         <div className="flex items-center gap-4">
// //           <Link href="/login" className="hidden md:block text-sm font-bold text-[#1A2B6D]">
// //             Login
// //           </Link>
// //           <button className="bg-[#00AEEF] hover:bg-sky-500 text-white px-6 py-2.5 rounded-md text-sm font-bold transition-all">
// //             Apply Now
// //           </button>
// //           <button className="md:hidden">
// //             <Menu className="w-6 h-6 text-[#1A2B6D]" />
// //           </button>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <main className="relative px-6 pt-8 md:pt-16 md:px-16 lg:px-24 max-w-7xl mx-auto">
// //         <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          
// //           {/* Content Column */}
// //           <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
// //             <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#1A2B6D] leading-[1.1]">
// //               Get Money in Minutes!
// //             </h1>
// //             <p className="text-lg text-slate-600 max-w-md mx-auto md:mx-0">
// //               Access quick and affordable finance to fuel your hustle or attend to urgent needs. 
// //               Join Nigeria's 1st Credit Membership.
// //             </p>
            
// //             <div className="pt-4">
// //               <button className="w-full md:w-auto bg-[#00AEEF] hover:bg-sky-500 text-white px-10 py-4 rounded-md text-lg font-bold shadow-lg shadow-sky-100 transition-transform active:scale-95">
// //                 Create your Account
// //               </button>
// //             </div>

// //             <p className="text-sm font-semibold text-[#1A2B6D]">
// //               Grow as high as you need from ₦5,000 upwards
// //             </p>

// //             {/* Google Play Button (Mobile Only) */}
// //             <div className="md:hidden flex justify-center pt-4">
// //                 <Link href="#" className="flex items-center border border-slate-200 rounded-xl px-5 py-2 gap-3 bg-white shadow-sm">
// //                     <PlayCircle className="w-8 h-8 fill-black text-white" />
// //                     <div className="text-left">
// //                         <p className="text-[10px] text-slate-500 font-bold uppercase leading-none">Get it on</p>
// //                         <p className="text-lg font-bold text-slate-800 leading-none">Google Play</p>
// //                     </div>
// //                 </Link>
// //             </div>
// //           </div>

// //           {/* Image Column */}
// //           <div className="w-full md:w-1/2 flex justify-center relative">
// //             <div className="relative w-full aspect-[4/3] md:aspect-square max-w-[500px]">
// //               <Image 
// //                 src="/hero-phones.png" 
// //                 alt="App Interface"
// //                 fill
// //                 className="object-contain"
// //                 priority
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

"use client"
import Link from 'next/link';
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";
import { ArrowRight, Shield, Clock, Percent, CheckCircle, TrendingUp, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://public.youware.com/users-website-assets/prod/0060604d-563e-4b70-9f2f-5525f45b31de/6221bd8b874a420f8a783247e1f0787e.jpg" 
            alt="Happy couple moving into new home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#003d80]/90 to-[#0056b3]/40"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left w-full">
          <div className="md:w-2/3 lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Building Your Future, <br/>
              <span className="text-[#00a8e8]">One Loan at a Time</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 leading-relaxed">
              Experience hassle-free lending with Evercrest. Whether it's your dream home or business expansion, we provide the financial foundation you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#00a8e8] text-white font-semibold rounded-lg hover:bg-blue-400 transition-all shadow-lg flex items-center justify-center">
                Get Started Now <ArrowRight className="ml-2" size={20} />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center justify-center">
                View Rates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Evercrest?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine modern technology with traditional banking values to offer you the best lending experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#e6f0fa] rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-[#0056b3] rounded-lg flex items-center justify-center mb-6 text-white">
                <Percent size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Rates</h3>
              <p className="text-gray-600 bg-">
                We offer some of the lowest interest rates in the market, ensuring your loan is affordable and manageable.
              </p>
            </div>
            
            <div className="p-8 bg-[#e6f0fa] rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-[#0056b3] rounded-lg flex items-center justify-center mb-6 text-white">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Approval</h3>
              <p className="text-gray-600">
                Our streamlined digital process means you can get approved in minutes, not days. No more waiting in lines.
              </p>
            </div>
            
            <div className="p-8 bg-[#e6f0fa] rounded-xl hover:shadow-xl transition-shadow duration-300 border border-blue-100">
              <div className="w-14 h-14 bg-[#0056b3] rounded-lg flex items-center justify-center mb-6 text-white">
                <Shield size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your financial data is protected with bank-grade encryption. We prioritize your privacy and security above all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://public.youware.com/users-website-assets/prod/0060604d-563e-4b70-9f2f-5525f45b31de/c6d11673c2f54d2a9c9b4532128016a4.jpg" 
                alt="Business handshake" 
                className="rounded-2xl shadow-2xl w-full object-cover h-125"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Committed to Your Financial Success</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Evercrest Lending, we believe that financial freedom should be accessible to everyone. Founded in 2010, we have helped over 50,000 families and businesses achieve their goals.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of financial experts works tirelessly to find the best loan solutions for your unique situation. We don't just lend money; we build lasting partnerships.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Transparent terms with no hidden fees</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Personalized loan options</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">24/7 Customer support</span>
                </div>
              </div>
              
              <button className="mt-8 px-6 py-3 border-2 border-[#0056b3] text-brand-blue font-semibold rounded-lg hover:bg-[#0056b3] hover:text-white transition-colors">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0056b3] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">$500M+</div>
              <div className="text-blue-200">Loans Funded</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50k+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200">Approval Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-200">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Lending Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored financial products designed to meet your specific needs at every stage of life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: "personal-loans", title: "Personal Loans", icon: Users, desc: "Flexible personal loans for debt consolidation, travel, or unexpected expenses." },
              { id: "home-mortgages", title: "Home Mortgages", icon: Shield, desc: "Competitive mortgage rates to help you buy your dream home with confidence." },
              { id: "business-growth", title: "Business Growth", icon: TrendingUp, desc: "Capital to expand your business, buy equipment, or hire new talent." },
              { id: "auto-loans", title: "Auto Loans", icon: ArrowRight, desc: "Get behind the wheel faster with our quick auto loan approvals." },
              { id: "student-loans", title: "Student Loans", icon: Percent, desc: "Invest in your education with low-interest student loan options." },
              { id: "refinancing", title: "Refinancing", icon: Clock, desc: "Lower your monthly payments by refinancing your existing loans." }
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:border-[#0056b3]/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-brand-light text-[#0056b3] rounded-full flex items-center justify-center mb-6">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.desc}</p>
                <Link href={`/services#${service.id}`} className="text-brand-blue font-medium hover:text-brand-dark flex items-center">
                  Learn more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://public.youware.com/users-website-assets/prod/0060604d-563e-4b70-9f2f-5525f45b31de/2c826f5c72c942bc8a92393c682b86f0.jpg" 
            alt="Finance background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who have chosen Evercrest Lending for their financial needs. Apply today and get a decision in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-lg">
              Apply Now
            </button>
            <Link href="/contact" className="px-8 py-4 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors inline-block">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
