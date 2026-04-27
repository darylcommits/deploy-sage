import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft, MessageCircle, Code, Layout, Smartphone, Settings, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import logo from './assets/logo.png';

function App() {
  const stripsRef = useRef(null);
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHeroVisible, setIsHeroVisible] = useState(false);

  // Advanced parallax with multiple layers
  useEffect(() => {
    const handleScroll = () => {
      if (stripsRef.current && heroRef.current) {
        const scrolled = window.pageYOffset;
        const heroHeight = heroRef.current.offsetHeight;
        
        // Multi-layer parallax with different speeds
        const parallaxLayers = stripsRef.current.querySelectorAll('[data-parallax]');
        parallaxLayers.forEach((layer) => {
          const speed = parseFloat(layer.getAttribute('data-parallax')) || 0.5;
          layer.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        });
        
        // Horizontal parallax for strips
        stripsRef.current.style.transform = `translate3d(${scrolled * 0.15}px, 0, 0)`;
        
        // Advanced fade with scale
        const opacity = Math.max(0, 1 - (scrolled / heroHeight) * 1.2);
        const scale = Math.max(0.95, 1 - (scrolled / heroHeight) * 0.05);
        stripsRef.current.style.opacity = opacity;
        stripsRef.current.style.transform = `translate3d(${scrolled * 0.15}px, 0, 0) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic cursor effect for hero
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Stagger children animations
          const children = entry.target.querySelectorAll('[data-stagger]');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    // Hero visibility
    const heroObserver = new IntersectionObserver((entries) => {
      setIsHeroVisible(entries[0].isIntersecting);
    }, { threshold: 0.3 });
    
    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    return () => {
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-teal-300 selection:text-teal-900 overflow-x-hidden">
      
      {/* Floating SaaS Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl w-full max-w-5xl transition-all duration-500">
          <div className="flex items-center gap-2">
            <img 
              src={logo} 
              alt="DeploySage Logo" 
              className="w-24 h-auto rounded-lg object-contain transition-all duration-500 hover:scale-105" 
            />
          </div>

          <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest text-white/90 uppercase">
            <a href="#home" className="hover:text-teal-300 transition-colors duration-300 relative group">
              HOME
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="#about" className="hover:text-teal-300 transition-colors duration-300 relative group">
              ABOUT US
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
            <a href="#contact" className="hover:text-teal-300 transition-colors duration-300 relative group">
              CONTACT US
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-teal-400 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-6 py-2 bg-white text-[#2d5f5d] text-xs font-bold rounded-full hover:bg-teal-50 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] uppercase tracking-wider">
              Get Started
            </button>
            <span className="text-[10px] font-bold text-white/80 border border-white/20 px-3 py-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors uppercase tracking-wider">
              EN ▼
            </span>
          </div>
        </nav>
      </div>

      {/* Enhanced Hero Section with Advanced Animations */}
      <section id="home" ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Base Deep Teal Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d5f5d] via-[#3a6e6c] to-[#4a7c7a]" 
             style={{
               backgroundSize: '400% 400%',
               animation: 'gradient-shift 20s ease infinite'
             }} 
        />

        {/* Animated Vertical Strips Layer with Enhanced Parallax */}
        <div 
          ref={stripsRef}
          className="absolute inset-0 transition-all duration-100 ease-out will-change-transform"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 40px,
                rgba(255, 255, 255, 0.03) 40px,
                rgba(255, 255, 255, 0.03) 80px,
                transparent 80px,
                transparent 140px,
                rgba(255, 255, 255, 0.05) 140px,
                rgba(255, 255, 255, 0.05) 160px,
                transparent 160px,
                transparent 200px,
                rgba(255, 255, 255, 0.02) 200px,
                rgba(255, 255, 255, 0.02) 240px,
                transparent 240px,
                transparent 280px,
                rgba(255, 255, 255, 0.06) 280px,
                rgba(255, 255, 255, 0.06) 300px,
                transparent 300px,
                transparent 360px,
                rgba(255, 255, 255, 0.04) 360px,
                rgba(255, 255, 255, 0.04) 400px,
                transparent 400px
              )
            `,
            backgroundSize: '400px 100%',
          }}
        />

        {/* Secondary Strips with Different Speed */}
        <div 
          data-parallax="0.1"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 100px,
                rgba(255, 255, 255, 0.04) 100px,
                rgba(255, 255, 255, 0.04) 120px,
                transparent 120px,
                transparent 220px,
                rgba(255, 255, 255, 0.06) 220px,
                rgba(255, 255, 255, 0.06) 250px,
                transparent 250px
              )
            `,
            backgroundSize: '500px 100%',
            animation: 'strips-float 25s ease-in-out infinite'
          }}
        />

        {/* Diagonal Accent Strips */}
        <div 
          data-parallax="0.3"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent 0px,
                transparent 200px,
                rgba(255, 255, 255, 0.05) 200px,
                rgba(255, 255, 255, 0.05) 202px,
                transparent 202px,
                transparent 400px
              )
            `,
            animation: 'diagonal-drift 30s ease-in-out infinite'
          }}
        />

        {/* Enhanced Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 bottom-0 w-96"
            style={{
              background: 'radial-gradient(ellipse at left, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
              animation: 'glow-pulse 4s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute top-0 right-0 bottom-0 w-96"
            style={{
              background: 'radial-gradient(ellipse at right, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
              animation: 'glow-pulse 4s ease-in-out infinite 2s'
            }}
          />
        </div>

        {/* Glass-morphism Vertical Accent Strips with Enhanced Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            data-parallax="0.2"
            className="absolute top-0 bottom-0 left-[20%] w-32 backdrop-blur-[2px]"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.08), transparent)',
              animation: 'fade-in-out 6s ease-in-out infinite'
            }}
          />
          <div 
            data-parallax="0.15"
            className="absolute top-0 bottom-0 right-[30%] w-24 backdrop-blur-[1px]"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.06), transparent)',
              animation: 'fade-in-out 6s ease-in-out infinite 2s'
            }}
          />
          <div 
            data-parallax="0.25"
            className="absolute top-0 bottom-0 left-[60%] w-40 backdrop-blur-[2px]"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.07), transparent)',
              animation: 'fade-in-out 8s ease-in-out infinite 4s'
            }}
          />
        </div>

        {/* Animated Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-slide 20s linear infinite'
          }}
        />

        {/* Smooth Bottom Fade */}
        <div 
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
          style={{
            height: '400px',
            background: `
              linear-gradient(to bottom,
                transparent 0%,
                rgba(255, 255, 255, 0.03) 10%,
                rgba(255, 255, 255, 0.08) 20%,
                rgba(255, 255, 255, 0.15) 30%,
                rgba(255, 255, 255, 0.25) 40%,
                rgba(255, 255, 255, 0.4) 50%,
                rgba(255, 255, 255, 0.55) 60%,
                rgba(255, 255, 255, 0.7) 70%,
                rgba(255, 255, 255, 0.82) 80%,
                rgba(255, 255, 255, 0.92) 90%,
                rgba(255, 255, 255, 1) 100%
              )
            `,
          }}
        />

        {/* Hero Content with Staggered Reveals */}
        <div className="relative z-30 min-h-screen flex flex-col justify-center items-center px-6 py-20 pt-32">
          {/* Status Badge */}
          <div 
            data-stagger
            className="flex items-center gap-2 mb-8 opacity-0"
            style={{
              animation: 'fade-slide-down 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards'
            }}
          >
            <span 
              className="w-2 h-2 rounded-full bg-teal-300 shadow-lg shadow-teal-300/50"
              style={{
                animation: 'pulse-glow 2s ease-in-out infinite'
              }}
            />
            <span className="text-teal-100 text-sm font-medium tracking-widest uppercase">
              Available For Impactful Work
            </span>
          </div>

          {/* Main Headline with Character Reveal */}
          <div className="text-center space-y-4 mb-8">
            <h1 
              data-stagger
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight opacity-0"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #b2dfdb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 30px rgba(17,181,164,0.3))',
                animation: 'fade-up-scale 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards'
              }}
            >
              Driving Digital <br /> Excellence.
          </div>

          {/* Description */}
          <p 
            data-stagger
            className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto text-center leading-relaxed mb-10 font-light opacity-0"
            style={{
              animation: 'fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards'
            }}
          >
            Deploysage Consulting & Solutions was started by brothers who share a passion for 
            building technologies that create real impact in society. We guide businesses as 
            they transition into technology-driven organizations.
          </p>

          {/* CTA Buttons with Magnetic Effect */}
          <div 
            data-stagger
            className="flex flex-col sm:flex-row gap-4 mb-16 opacity-0"
            style={{
              animation: 'fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards'
            }}
          >
            <MagneticButton>
              <button className="group relative px-8 py-4 bg-white text-[#2d5f5d] text-sm font-bold rounded-full tracking-wider overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400/0 via-teal-400/30 to-teal-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center gap-3">
                  SEE MORE
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </button>
            </MagneticButton>
            
            <MagneticButton>
              <button className="group relative px-8 py-4 bg-transparent border-2 border-white/30 backdrop-blur-md text-white text-sm font-bold rounded-full tracking-wider overflow-hidden hover:border-white/60">
                <span className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="relative flex items-center gap-3">
                  <MessageCircle className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Get Free Consultation
                </span>
              </button>
            </MagneticButton>
          </div>

          {/* Removed Portfolio Preview Cards as requested */}

          {/* Scroll Indicator */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/90 transition-all duration-500 cursor-pointer"
            style={{
              animation: 'bounce-gentle 3s ease-in-out infinite, fade-in 1s ease-out 1.5s both'
            }}
          >
            <span className="text-xs font-bold tracking-widest uppercase">Scroll Down</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:border-white/50 hover:bg-white/10 transition-all duration-300">
              <ArrowRight 
                className="w-4 h-4 rotate-90"
                style={{
                  animation: 'bounce-slow 2s ease-in-out infinite'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section removed as requested */}
      {/* <ProjectCarouselSection /> */}

      {/* Services Section removed as requested */}

      {/* About Us Section */}
      <section 
        id="about" 
        data-animate
        className="py-24 px-6 max-w-7xl mx-auto opacity-0 translate-y-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div data-stagger className="space-y-6">
            <h2 className="text-sm font-bold text-[#11b5a4] uppercase tracking-widest">About Us</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Driving Digital <br/>
              <span className="text-[#11b5a4]">Innovation</span> Forward
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Deploysage Consulting & Solutions was started by brothers who share a passion for 
              building technologies that create real impact in society.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We guide businesses as they transition into technology-driven organizations. Our goal is to 
              deliver tailored software, comprehensive web applications, and seamless integrations that 
              scale with your vision.
            </p>
          </div>
          <div data-stagger className="relative perspective-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-[#11b5a4] to-[#2d5f5d] rounded-3xl transform translate-x-4 translate-y-4 opacity-20 blur-xl"></div>
            <div className="absolute inset-0 bg-[#11b5a4]/20 rounded-3xl transform translate-x-4 translate-y-4"></div>
            <TiltCard>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="About Deploysage" 
                className="relative z-10 rounded-3xl shadow-2xl w-full h-[400px] object-cover border border-white/20"
              />
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section 
        id="contact" 
        data-animate
        className="py-24 px-6 bg-gradient-to-b from-[#e6f5f4] to-white opacity-0 translate-y-20 relative"
      >
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 data-stagger className="text-4xl md:text-5xl font-bold text-gray-900">
            Get In Touch
          </h2>
          <p data-stagger className="text-gray-600 text-lg max-w-2xl mx-auto">
            We'll create high-quality linkable content and build at least 40 high-authority links to each
            asset, paving the way for you to grow your rankings, improve brand.
          </p>
        </div>

        <div data-stagger className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
          
          {/* Left Panel */}
          <div className="bg-[#11b5a4] text-white p-10 md:p-12 md:w-2/5 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  We'll create high-quality linkable content and build at least 40 high-authority.
                </p>
              </div>
              
              <div className="space-y-6 mt-8">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-white/80" />
                  <div className="text-sm font-medium space-y-1">
                    <p>+8801779717686</p>
                    <p>+988678363866</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-white/80" />
                  <p className="text-sm font-medium">Support @deploysage.com</p>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-white/80" />
                  <p className="text-sm font-medium">New York, USA</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Circle */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gradient-to-tr from-[#31c0b1] to-[#88e0d9] rounded-full opacity-80" />
          </div>

          {/* Right Panel */}
          <div className="bg-white p-10 md:p-12 md:w-3/5">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#11b5a4]">Your Name</label>
                  <input type="text" placeholder="John Trangely" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#11b5a4] transition-colors text-gray-800 placeholder:text-gray-900 font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#11b5a4]">Your Email</label>
                  <input type="email" placeholder="hello@deploysage.com" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#11b5a4] transition-colors text-gray-800 placeholder:text-gray-900 font-medium" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#11b5a4]">Your Subject</label>
                <input type="text" placeholder="I want to hire you quickly" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#11b5a4] transition-colors text-gray-800 placeholder:text-gray-900 font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-[#11b5a4]">Message</label>
                <div className="relative">
                  <input type="text" placeholder="Write here your message" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#11b5a4] transition-colors text-gray-800 placeholder:text-gray-400" />
                </div>
              </div>

              <button type="button" className="px-6 py-3 bg-[#11b5a4] text-white text-sm font-bold rounded-md hover:bg-[#0da090] transition-colors shadow-lg shadow-[#11b5a4]/30 mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
            <img 
              src={logo} 
              alt="DeploySage Logo" 
              className="w-32 h-auto rounded-lg object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
            />
            <span>Deploy<span className="text-teal-500">Sage</span></span>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Deploysage. All rights reserved.</p>
        </div>
      </footer>

      {/* Enhanced Global Styles */}
      <style jsx>{`
        /* Premium Gradient Shift */
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Vertical Strips Float */
        @keyframes strips-float {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(-30px); }
        }

        /* Diagonal Drift */
        @keyframes diagonal-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }

        /* Glow Pulse */
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        /* Fade In Out */
        @keyframes fade-in-out {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }

        /* Grid Slide */
        @keyframes grid-slide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        /* Pulse Glow for Badge */
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(94, 234, 212, 0.5); }
          50% { box-shadow: 0 0 25px rgba(94, 234, 212, 1); }
        }

        /* Premium Fade Up with Scale */
        @keyframes fade-up-scale {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Fade Up */
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Fade Slide Down */
        @keyframes fade-slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Fade In */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Gentle Bounce */
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* Slow Bounce */
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        /* Clip Path Reveal */
        @keyframes clip-reveal {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        /* Scroll-triggered animation class */
        .animate-in {
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        [data-stagger].animate-in {
          animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Utilities */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        html {
          scroll-behavior: smooth;
        }

        .will-change-transform {
          will-change: transform, opacity;
        }

        /* Premium easing for all transitions */
        * {
          transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
}

// Enhanced Project Carousel Section Component (Xolio-style)
function ProjectCarouselSection() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const projects = [
    {
      id: 1,
      title: "AI Integrated App",
      category: "Web Development",
      description: "Intelligent solutions powered by machine learning",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      color: "from-purple-500 to-pink-500",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Health Tracking System",
      category: "Mobile App",
      description: "Monitor wellness metrics in real-time",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
      color: "from-blue-500 to-cyan-500",
      status: "Coming Soon"
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      category: "Full Stack",
      description: "Modern shopping experience with seamless checkout",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      color: "from-orange-500 to-red-500",
      status: "Completed"
    },
    {
      id: 4,
      title: "Digital Transformation",
      category: "Consulting",
      description: "Strategic technology roadmap for enterprises",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      color: "from-green-500 to-teal-500",
      status: "Ongoing"
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 450; // Approximate card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      const newIndex = direction === 'left' 
        ? Math.max(0, currentIndex - 1)
        : Math.min(projects.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section 
      id="projects"
      data-animate
      className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden opacity-0 translate-y-20"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-xl" data-stagger>
            <span className="text-teal-600 font-bold text-sm tracking-widest uppercase mb-3 block">
              Our Complete Craft
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Some of Our Work in<br />
              <span className="bg-gradient-to-r from-teal-600 bg-clip-text text-teal-600">
                Craft Digital Agency
              </span>
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 mt-8 md:mt-0" data-stagger>
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className="group w-14 h-14 rounded-full border-2 border-gray-300 hover:border-teal-600 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:border-gray-300 bg-white shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:text-teal-600 transition-colors" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex === projects.length - 1}
              className="group w-14 h-14 rounded-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-30 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-400"
            >
              <ArrowRight className="w-5 h-5 text-white transition-colors" />
            </button>
            <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-bold tracking-wider uppercase hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl">
              View All Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-8 cursor-grab active:cursor-grabbing select-none"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard3D key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * 450,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-12 bg-gradient-to-r from-teal-600 to-blue-600' 
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 3D Project Card Component with Advanced Animations
function ProjectCard3D({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const tiltX = isHovered ? (mousePosition.y - 0.5) * 15 : 0;
  const tiltY = isHovered ? (mousePosition.x - 0.5) * -15 : 0;

  return (
    <div
      ref={cardRef}
      data-stagger
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative min-w-[420px] h-[560px] rounded-3xl overflow-hidden cursor-pointer transition-all duration-700"
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transformStyle: 'preserve-3d',
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-90 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 grayscale group-hover:grayscale-0"
          style={{
            backgroundImage: `url("${project.image}")`,
            transform: isHovered ? `scale(1.1) translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)` : 'scale(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8 z-10">
        {/* Status Badge */}
        <div className="flex justify-between items-start">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold tracking-wider uppercase border border-white/30">
            {project.status}
          </span>
          
          {/* Decorative Element */}
          <div 
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-90"
          >
            <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>

        {/* Bottom Content */}
        <div 
          className="space-y-4 transform transition-all duration-500"
          style={{
            transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
          }}
        >
          <div className="space-y-2">
            <p className="text-white/80 text-sm font-bold tracking-widest uppercase">
              {project.category}
            </p>
            <h3 className="text-3xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-white/70 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action Button */}
          <button 
            className="flex items-center gap-3 px-6 py-3 bg-white text-gray-900 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 group-hover:bg-white group-hover:shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
          >
            View Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}

// Magnetic Button Component
function MagneticButton({ children }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
}

// Image Reveal Card Component
function ImageRevealCard({ imageUrl, className, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={cardRef} 
      className={`${className} rounded-2xl shadow-2xl shrink-0 border border-white/10 overflow-hidden snap-center group cursor-pointer relative`}
      style={{
        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url("${imageUrl}")`,
        }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </div>
  );
}

// Service Card Component
function ServiceCard({ icon, title, description, delay = 0 }) {
    return (
    <div 
      data-stagger
      className="bg-white p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group cursor-pointer"
      style={{
        transitionDelay: `${delay * 100}ms`
      }}
    >
      <div className="mb-6 p-3 bg-gray-50 rounded-lg inline-block group-hover:bg-teal-50 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
// Tilt Card Component for 3D Hover Effects
function TiltCard({ children }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Calculate tilt angles (max 15 degrees)
    const tiltX = (y - 0.5) * 15;
    const tiltY = (x - 0.5) * -15;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="w-full h-full relative z-10"
    >
      {children}
    </div>
  );
}

export default App;