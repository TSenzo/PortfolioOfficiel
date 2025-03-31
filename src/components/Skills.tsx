
import { useEffect } from "react";

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
  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Animate skill bars when in view
          if (entry.target.classList.contains('skill-card')) {
            const bars = entry.target.querySelectorAll('.skill-bar-fill');
            bars.forEach((bar: Element) => {
              if (bar instanceof HTMLElement) {
                const width = bar.dataset.level || "0";
                setTimeout(() => {
                  bar.style.width = `${width}%`;
                }, 100);
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

  // Group skills by category
  const frontendSkills = skills.filter(skill => skill.category === "frontend");
  const backendSkills = skills.filter(skill => skill.category === "backend");
  const designSkills = skills.filter(skill => skill.category === "design");
  const otherSkills = skills.filter(skill => skill.category === "other");

  const renderSkillGroup = (title: string, skillsList: Skill[], delay: number) => (
    <div className="cyber-card p-6 skill-card animate-on-scroll" style={{ animationDelay: `${delay}ms` }}>
      <h3 className="text-xl font-bold mb-6 neon-text">{title}</h3>
      <div className="space-y-6">
        {skillsList.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">{skill.name}</span>
              <span className="text-neon-blue dark:text-neon-purple">{skill.level}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="skill-bar-fill h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full transition-all duration-1000 ease-out" 
                style={{ width: "0%" }}
                data-level={skill.level}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Compétences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {renderSkillGroup("Frontend", frontendSkills, 0)}
          {renderSkillGroup("Backend", backendSkills, 200)}
          {renderSkillGroup("Design", designSkills, 400)}
          {renderSkillGroup("Autres", otherSkills, 600)}
        </div>
      </div>
    </section>
  );
}
