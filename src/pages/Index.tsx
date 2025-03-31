
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import ParticlesBackground from "@/components/ParticlesBackground";
import HackingTerminal from "@/components/HackingTerminal";

const Index = () => {
  useEffect(() => {
    // Disable animation for people who prefer reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animate-duration', '0s');
    }
    
    // Set page title
    document.title = "Enzo Dal Corso | Portfolio";
    
    // Initialize scroll animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll, .animate-reveal-left, .animate-reveal-right, .animate-scale');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
          element.classList.add('animated');
        }
      });
    };
    
    // Run on initial load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ThemeToggle />
      <ParticlesBackground />
      <HackingTerminal />
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Projects />
        <Languages />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default Index;
