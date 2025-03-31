
import { useEffect } from "react";

interface Language {
  name: string;
  level: number;
  description: string;
}

const languages: Language[] = [
  {
    name: "Français",
    level: 100,
    description: "Langue maternelle"
  },
  {
    name: "Anglais",
    level: 90,
    description: "Courant - TOEIC 950"
  },
  {
    name: "Espagnol",
    level: 60,
    description: "Intermédiaire"
  },
  {
    name: "Allemand",
    level: 30,
    description: "Notions de base"
  }
];

export default function Languages() {
  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Animate language bars when in view
          if (entry.target.classList.contains('language-card')) {
            const circles = entry.target.querySelectorAll('.language-circle');
            circles.forEach((circle: Element, index: number) => {
              setTimeout(() => {
                circle.classList.add('animate-pulse-neon');
              }, index * 200);
            });
          }
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll, .language-card').forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll, .language-card').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="languages" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Langues</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="cyber-card language-card p-8 animate-on-scroll">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {languages.map((language, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-40 h-40 mb-4">
                    <svg className="w-full h-full" viewBox="0 0 120 120">
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        className="text-secondary opacity-30" 
                      />
                      
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="54" 
                        fill="none" 
                        stroke="url(#gradient)" 
                        strokeWidth="6" 
                        strokeDasharray={`${language.level * 3.4}, 340`}
                        strokeDashoffset="-85"
                        strokeLinecap="round"
                        className="language-circle transition-all duration-1000"
                      />
                      
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#33C3F0" />
                          <stop offset="100%" stopColor="#9b87f5" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-4xl font-bold neon-text">{language.level}%</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1">{language.name}</h3>
                  <p className="text-center text-muted-foreground">{language.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
