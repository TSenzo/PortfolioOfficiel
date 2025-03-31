
import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubLink?: string;
  demoLink?: string;
}

const projects: Project[] = [
  {
    title: "Dashboard Analytics",
    description: "Tableau de bord interactif pour la visualisation de données.",
    tags: ["React", "D3.js", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    githubLink: "https://github.com",
    demoLink: "https://example.com"
  },
  {
    title: "E-commerce Platform",
    description: "Plateforme e-commerce avec panier d'achat et paiement intégré.",
    tags: ["Vue.js", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1556742208-999815fca738?q=80&w=1000&auto=format&fit=crop",
    githubLink: "https://github.com",
    demoLink: "https://example.com"
  },
  {
    title: "Fitness Tracker",
    description: "Application de suivi de fitness avec graphiques et statistiques.",
    tags: ["React Native", "Firebase", "Chart.js"],
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
    githubLink: "https://github.com"
  },
  {
    title: "Social Media App",
    description: "Application de réseau social avec fonctionnalités de chat en temps réel.",
    tags: ["React", "Socket.io", "Express"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
    demoLink: "https://example.com"
  }
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  
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
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Projets</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="cyber-card group h-full transition-all duration-500 transform hover:scale-[1.02]">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 to-transparent opacity-60" />
                </div>
                
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-2 neon-text">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex} 
                        className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    {project.githubLink && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-neon-blue transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.demoLink && (
                      <a 
                        href={project.demoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-neon-blue transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
