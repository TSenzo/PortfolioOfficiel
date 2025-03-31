
import { useEffect } from "react";

interface Education {
  period: string;
  degree: string;
  institution: string;
  description: string;
}

const educations: Education[] = [
  {
    period: "2021 - 2023",
    degree: "Master en Développement Web",
    institution: "École Supérieure du Digital",
    description: "Spécialisation en développement front-end et expérience utilisateur."
  },
  {
    period: "2018 - 2021",
    degree: "Licence en Informatique",
    institution: "Université de Lyon",
    description: "Fondamentaux de l'informatique, algorithmes, programmation et bases de données."
  },
  {
    period: "2016 - 2018",
    degree: "BTS Services Informatiques aux Organisations",
    institution: "Lycée Technique de Lyon",
    description: "Option Solutions Logicielles et Applications Métiers."
  }
];

export default function Education() {
  useEffect(() => {
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="education" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Formation</h2>
        
        <div className="max-w-3xl mx-auto relative">
          <div className="timeline-connector" />
          
          {educations.map((edu, index) => (
            <div 
              key={index}
              className="relative pl-8 mb-12 last:mb-0 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-neon-blue dark:bg-neon-purple z-10 cyber-card" />
              
              <div className="cyber-card p-6">
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-accent/20 text-accent-foreground mb-2">
                  {edu.period}
                </span>
                <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                <p className="text-neon-blue dark:text-neon-purple font-medium mb-3">{edu.institution}</p>
                <p className="text-muted-foreground">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
