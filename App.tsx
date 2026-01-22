import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowRight, ArrowDownRight, MapPin, Phone, Instagram, Linkedin, Twitter, ArrowUpRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero3D from './components/Hero3D';
import SmartQuoteCalculator from './components/SmartQuoteCalculator';
import AIChatBot from './components/AIChatBot';
import { COMPANY_INFO, SERVICES, PRODUCTS } from './constants';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Explicit IDs for smooth scrolling within the page
  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Projects', href: '#projects' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Specification', href: '#specification' },
    { name: 'Contact', href: '#contact-form' }
  ];

  useEffect(() => {
    // Hero Text Reveal
    const tl = gsap.timeline();
    tl.fromTo('.hero-char', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "power4.out" }
    );
    tl.fromTo('.hero-line', 
      { width: 0 },
      { width: '100%', duration: 1.5, ease: "expo.out" }, 
      "-=0.5"
    );

    // Section Reveals
    sectionRefs.current.forEach((section) => {
      gsap.fromTo(section,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleClass: "section-active"
          }
        }
      );
    });
  }, []);

  return (
    <div className="min-h-screen font-sans bg-brand-light text-brand-black selection:bg-brand-red selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-colors duration-300">
        <div className="bg-brand-black/95 backdrop-blur-md text-white border-b border-white/10">
          <div className="px-6 md:px-12 py-5 flex justify-between items-center">
            <a href="#" className="font-display font-bold text-2xl tracking-tighter hover:text-brand-red transition-colors flex items-center gap-1">
              A406<span className="text-brand-red text-3xl">.</span>
            </a>
            
            <div className="hidden lg:flex items-center gap-10 font-display text-sm tracking-widest uppercase font-bold">
              {navLinks.map((item, i) => (
                <a key={i} href={item.href} className="hover:text-brand-red transition-colors relative group py-2">
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-white hover:text-brand-red transition-colors">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-black text-white flex flex-col justify-center items-center gap-8 animate-fadeIn">
           {navLinks.map((item, i) => (
               <a key={i} href={item.href} onClick={() => setMobileMenuOpen(false)} className="font-display text-4xl font-bold uppercase hover:text-brand-red transition-colors">
                 {item.name}
               </a>
           ))}
        </div>
      )}

      {/* Hero Section - Dark */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden bg-brand-dark text-white">
        <Hero3D />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full mt-20" ref={heroTextRef}>
          <div className="flex items-center gap-4 mb-6">
             <div className="h-[1px] w-12 bg-brand-red"></div>
             <p className="hero-char text-brand-red font-bold tracking-widest uppercase text-sm">Est. London</p>
          </div>
          
          <h1 className="font-display font-bold text-7xl md:text-[10rem] uppercase leading-[0.85] tracking-tighter mb-10 text-white">
            <span className="block overflow-hidden"><span className="hero-char inline-block">Visionary</span></span>
            <span className="block overflow-hidden"><span className="hero-char inline-block text-stroke-white text-transparent hover:text-white transition-colors duration-500">Glazing</span></span>
            <span className="block overflow-hidden"><span className="hero-char inline-block">Systems</span></span>
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between items-end border-t border-white/20 pt-8 mt-8">
             <p className="max-w-md text-gray-400 leading-relaxed text-sm md:text-base font-light">
               Engineered aluminium and glass solutions for the modern built environment. Defining the skyline of London, one facade at a time.
             </p>
             <a href="#specification" className="group mt-8 md:mt-0 flex items-center gap-4 bg-white text-brand-black px-10 py-5 hover:bg-brand-red hover:text-white transition-all duration-300 cursor-pointer">
               <span className="uppercase font-bold tracking-widest text-sm">Explore Solutions</span>
               <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </a>
          </div>
        </div>
      </section>

      {/* Expertise Section - White */}
      <section id="expertise" className="py-24 md:py-32 px-6 md:px-12 bg-white text-brand-black relative" ref={addToRefs}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
           <div className="md:col-span-5 relative">
              <span className="text-9xl font-display font-bold text-gray-100 absolute -top-20 -left-10 -z-10">01</span>
              <h2 className="font-display text-5xl md:text-6xl font-bold uppercase leading-none mb-8">
                Form <br/><span className="text-brand-red">Follows</span><br/> Function
              </h2>
              <div className="h-2 w-20 bg-brand-black mb-8"></div>
           </div>
           
           <div className="md:col-span-7 flex flex-col justify-between">
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-16 text-gray-700">
                A406 Windows bridges the gap between architectural intent and structural reality. 
                We specialize in minimal sightlines, maximum thermal efficiency, and bespoke fabrication.
              </p>
              
              <div className="space-y-8">
                {SERVICES.map((s, i) => (
                  <div key={i} className="group border-b border-gray-200 pb-8 hover:border-brand-black transition-colors cursor-default">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-display text-2xl font-bold uppercase mb-2 group-hover:text-brand-red transition-colors">{s.title}</h3>
                        <p className="text-gray-500 max-w-md">{s.description}</p>
                      </div>
                      <ArrowDownRight className="text-gray-300 group-hover:text-brand-black group-hover:rotate-[-45deg] transition-all duration-500" />
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </section>

      {/* NEW Products Section - Light Gray */}
      <section id="products" className="bg-brand-silver py-24 md:py-32 px-6 md:px-12" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
             <p className="font-bold text-brand-red tracking-widest uppercase text-sm mb-3">Our Range</p>
             <h2 className="font-display text-brand-black text-4xl md:text-6xl font-bold uppercase">Product Collection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((product, idx) => (
              <div key={idx} className="bg-white group hover:shadow-xl transition-all duration-500 border border-gray-100">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-bold uppercase mb-4">{product.title}</h3>
                  <p className="text-gray-500 mb-6 text-sm leading-relaxed">{product.description}</p>
                  <ul className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact-form" className="inline-block text-brand-black font-bold uppercase tracking-widest text-xs border-b border-brand-black pb-1 hover:text-brand-red hover:border-brand-red transition-colors cursor-pointer">
                    Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Light Gray/White */}
      <section id="projects" className="bg-white py-24 md:py-32 px-6 md:px-12" ref={addToRefs}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
             <div>
               <p className="font-bold text-brand-red tracking-widest uppercase text-sm mb-3">Portfolio</p>
               <h2 className="font-display text-brand-black text-4xl md:text-6xl font-bold uppercase">Selected Works</h2>
             </div>
             <a href="#projects" className="hidden lg:flex text-brand-black hover:text-brand-red transition-colors uppercase tracking-widest text-xs font-bold items-center gap-2 border-b border-brand-black pb-1 hover:border-brand-red cursor-pointer">
               View All Case Studies
             </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Project 1 */}
             <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                  <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-5 h-5 text-brand-black" />
                  </div>
                </div>
                <div>
                  <p className="text-brand-red text-xs uppercase tracking-widest font-bold mb-2">Kensington, London</p>
                  <h3 className="font-display text-2xl font-bold text-brand-black uppercase">The Glass House</h3>
                </div>
             </div>

             {/* Project 2 */}
             <div className="group cursor-pointer md:mt-16">
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2700&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                  <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-5 h-5 text-brand-black" />
                  </div>
                </div>
                <div>
                  <p className="text-brand-red text-xs uppercase tracking-widest font-bold mb-2">Hampstead, London</p>
                  <h3 className="font-display text-2xl font-bold text-brand-black uppercase">Modern Extension</h3>
                </div>
             </div>

             {/* Project 3 */}
             <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2700&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                  <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight className="w-5 h-5 text-brand-black" />
                  </div>
                </div>
                <div>
                  <p className="text-brand-red text-xs uppercase tracking-widest font-bold mb-2">Islington, London</p>
                  <h3 className="font-display text-2xl font-bold text-brand-black uppercase">Heritage Restoration</h3>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Specification / Calculator Section - White with Simplified Text */}
      <section id="specification" className="bg-white py-24 px-6 md:px-12 border-t border-gray-100" ref={addToRefs}>
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
               <div className="flex flex-col justify-center">
                  <p className="font-bold text-brand-red tracking-widest uppercase text-sm mb-3">Cost Estimator</p>
                  <h2 className="font-display text-brand-black text-4xl md:text-5xl font-bold uppercase mb-8">
                    Get a <br/> Price
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Planning a project? Use our calculator to get a quick cost estimate for your new windows and doors.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                     {['High Security', 'Energy Efficient', 'Sound Proofing', 'Custom Sizes'].map((item, i) => (
                       <div key={i} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-brand-red rounded-full"></div>
                         <span className="font-display font-bold uppercase tracking-wider text-xs text-brand-black">{item}</span>
                       </div>
                     ))}
                  </div>

                  <div className="p-6 bg-brand-silver border-l-4 border-brand-black">
                    <p className="text-sm italic text-gray-600">
                      "Simple, fast, and gave us a great idea of the budget we needed for our renovation."
                    </p>
                    <p className="text-xs font-bold uppercase mt-4 text-brand-black">- James D., Homeowner</p>
                  </div>
               </div>
               
               <div className="relative">
                  {/* Calculator Component */}
                  <SmartQuoteCalculator />
               </div>
            </div>
         </div>
      </section>

      {/* NEW Contact Form Section */}
      <section id="contact-form" className="bg-brand-silver py-24 px-6 md:px-12" ref={addToRefs}>
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
               <p className="font-bold text-brand-red tracking-widest uppercase text-sm mb-3">Get in Touch</p>
               <h2 className="font-display text-brand-black text-4xl md:text-5xl font-bold uppercase">Send Us a Message</h2>
            </div>
            
            <form className="bg-white p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden" onSubmit={(e) => e.preventDefault()}>
               <div className="absolute top-0 left-0 w-full h-1 bg-brand-red"></div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                     <input type="text" className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all duration-300" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                     <input type="email" className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all duration-300" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                     <input type="tel" className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all duration-300" placeholder="07700 900000" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Subject</label>
                     <select className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-brand-black focus:outline-none focus:border-brand-red focus:bg-white transition-all duration-300 appearance-none cursor-pointer">
                        <option>General Enquiry</option>
                        <option>Quote Request</option>
                        <option>Service & Repair</option>
                     </select>
                  </div>
               </div>
               <div className="space-y-2 mb-8">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Your Message</label>
                  <textarea rows={4} className="w-full bg-gray-50 border-b-2 border-gray-200 p-4 text-brand-black placeholder-gray-400 focus:outline-none focus:border-brand-red focus:bg-white transition-all duration-300 resize-none" placeholder="Tell us about your project..."></textarea>
               </div>
               <button className="w-full bg-brand-black text-white py-5 font-display font-bold uppercase tracking-widest hover:bg-brand-red transition-colors flex items-center justify-center gap-2 group cursor-pointer">
                  Send Message <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </form>
         </div>
      </section>

      {/* Footer - Red */}
      <section id="contact" className="bg-brand-red text-white py-24 px-6 md:px-12 relative overflow-hidden" ref={addToRefs}>
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
             <path d="M50 0 L100 0 L100 100 L0 100 Z" fill="black" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
              <div>
                 <h2 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8">Start <br/> Building.</h2>
                 <p className="text-xl max-w-sm font-light text-white/90">
                   Contact our design office to discuss your architectural glazing requirements.
                 </p>
              </div>
              <div className="flex flex-col justify-end">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div>
                      <p className="font-display font-bold uppercase text-black/40 mb-2 text-sm tracking-widest">London HQ</p>
                      <p className="text-xl font-bold leading-tight">{COMPANY_INFO.address}</p>
                      <a href={COMPANY_INFO.mapsLink} className="inline-block mt-4 text-sm font-bold border-b border-white pb-1 hover:text-black hover:border-black transition-colors cursor-pointer">View on Map</a>
                    </div>
                    <div>
                      <p className="font-display font-bold uppercase text-black/40 mb-2 text-sm tracking-widest">Enquiries</p>
                      <p className="text-2xl font-bold mb-1">{COMPANY_INFO.phone}</p>
                      <p className="text-lg opacity-80">{COMPANY_INFO.email}</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="font-display font-bold uppercase text-sm tracking-widest opacity-80">© {new Date().getFullYear()} A406 Windows Ltd.</p>
              <div className="flex gap-8">
                 <Instagram className="w-5 h-5 hover:text-black transition-colors cursor-pointer" />
                 <Linkedin className="w-5 h-5 hover:text-black transition-colors cursor-pointer" />
                 <Twitter className="w-5 h-5 hover:text-black transition-colors cursor-pointer" />
              </div>
           </div>
        </div>
      </section>

      <AIChatBot />
    </div>
  );
};

export default App;