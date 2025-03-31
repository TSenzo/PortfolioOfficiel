
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "design" | "other";
}

const skills: Skill[] = [
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 85, category: "frontend" },
  { name: "TypeScript", level: 80, category: "frontend" },
  { name: "Vue.js", level: 75, category: "frontend" },
  { name: "Node.js", level: 70, category: "backend" },
  { name: "Express", level: 65, category: "backend" },
  { name: "MongoDB", level: 60, category: "backend" },
  { name: "SQL", level: 75, category: "backend" },
  { name: "UI/UX Design", level: 80, category: "design" },
  { name: "Figma", level: 75, category: "design" },
  { name: "Git", level: 85, category: "other" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  
  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Animate skill bars when in view
          if (entry.target.classList.contains('skill-card')) {
            const bars = entry.target.querySelectorAll('.skill-bar-fill');
            bars.forEach((bar: Element, index: number) => {
              if (bar instanceof HTMLElement) {
                const width = bar.dataset.level || "0";
                setTimeout(() => {
                  bar.style.width = `${width}%`;
                }, 100 + index * 50);
              }
            });
          }
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll, .skill-card').forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll, .skill-card').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  // Filter skills based on active category
  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const handleFlip = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  const renderSkillCards = () => {
    return filteredSkills.map((skill, index) => (
      <div 
        key={index}
        className={`animate-on-scroll bg-background cyber-card p-6 transform transition-all duration-500 cursor-pointer relative ${
          flippedCard === index ? 'rotate-y-180' : ''
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
        onClick={() => handleFlip(index)}
      >
        {/* Front of card */}
        <div className={`relative transition-opacity duration-500 ${flippedCard === index ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="text-xl font-bold mb-4">{skill.name}</h3>
          <div className="w-full bg-secondary rounded-full h-2.5 mb-2 overflow-hidden">
            <div 
              className="skill-bar-fill h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-1000 ease-out rounded-full" 
              style={{ width: "0%" }}
              data-level={skill.level}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">{skill.category}</span>
            <span className="text-neon-blue dark:text-neon-purple font-bold">{skill.level}%</span>
          </div>
        </div>
        
        {/* Back of card */}
        <div className={`absolute inset-0 p-6 flex flex-col justify-center items-center transform rotate-y-180 transition-opacity duration-500 ${
          flippedCard === index ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2 neon-text">{skill.name}</h3>
            <p className="mb-4">Niveau d'expertise avancé dans cette technologie.</p>
            <div className="inline-block w-20 h-20 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-2xl font-bold">{skill.level}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Compétences</h2>
        
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "all" 
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            Toutes
          </button>
          
          <button 
            onClick={() => setActiveCategory("frontend")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "frontend" 
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            Frontend
          </button>
          
          <button 
            onClick={() => setActiveCategory("backend")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "backend" 
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            Backend
          </button>
          
          <button 
            onClick={() => setActiveCategory("design")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "design" 
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            Design
          </button>
          
          <button 
            onClick={() => setActiveCategory("other")}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeCategory === "other" 
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' 
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            Autres
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {renderSkillCards()}
        </div>
        
        <p className="text-center mt-6 text-muted-foreground">
          Cliquez sur une compétence pour plus de détails
        </p>
      </div>
    </section>
  );
}
