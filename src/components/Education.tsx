
import { useEffect } from "react";

interface Education {
  period: string;
  degree: string;
  institution: string;
  description: string;
}

const educations: Education[] = [
  {
    period: "2024 - 2025",
    degree: "Licence 3 Vaucanson Sciences pour l'Ingénieur",
    institution: "Ipst-Cnam Toulouse",
    description: "Formation pluridisciplinaire alliant mécanique, électronique, informatique et mathématiques appliquées, avec un fort accent sur les technologies et méthodes d’ingénierie."
  },
  {
    period: "2022 - 2024",
    degree: "BTS Systèmes numériques option A informatique et réseaux",
    institution: "Lycée général et technologique international Victor Hugo Colomiers",
    description: "Formation axée sur l'administration des systèmes et réseaux, le développement logiciel et la gestion de la sécurité informatique, avec une approche pratique sur les technologies de communication."
  },
  {
    period: "2020 - 2022",
    degree: "Baccalauréat STI2D, spécialité Systèmes d'Information et Numérique",
    institution: "Lycée polyvalent Le Garros Auch",
    description: "Formation centrée sur la conception, le développement et la gestion des systèmes d'information numériques, ainsi que sur la programmation, les réseaux et la gestion de bases de données."
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
