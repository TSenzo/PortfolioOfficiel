import { useEffect, useState } from "react";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
    title: "IMMOBLADE",
    description: "Application web développée pour l'entreprise IMMOBLADE, spécialisée dans les vitrages de protection solaire. L'application collecte et analyse les données de flux solaire, température et luminosité dans le bâtiment du lycée Victor Hugo, équipé des solutions IMMOBLADE. L'objectif est d'évaluer l'efficacité des vitrages solaires en les comparant à des bâtiments classiques non équipés.",
    tags: ["Vue.js", "Node.js", "MongoDB", "Vuex", "API REST", "Suivi énergétique"],
    image: "./public/immoblade.png",
    githubLink: "https://github.com/TSenzo/IMMOBLADE-Projet-BTS-"
  },
  {
    title: "Plan Financier",
    description: "Finance Glide est un assistant personnel développé en TypeScript pour la gestion de budget. Il permet de suivre ses finances, planifier ses objectifs, et visualiser ses revenus et dépenses. Un outil complet et intuitif pour reprendre le contrôle de son portefeuille.",
    tags: ["TypeScript", "Simulation", "Finance"],
    image: "./public/finance.png",
    githubLink: "https://github.com/TSenzo/Plan-financier"
  },
  {
    title: "InnoTech",
    description: "Site vitrine pour InnoTech, une entreprise proposant une large gamme de services informatiques : réparation, cybersécurité, développement logiciel, et administration réseau. Une solution clé en main pour optimiser et sécuriser les infrastructures numériques.",
    tags: ["HTML", "CSS", "JavaScript", "Réparation informatique", "Cybersécurité", "Développement logiciel", "Réseaux", "Assistance informatique"],
    image: "./public/innotech.png",
    githubLink: "https://github.com/TSenzo/TSenzo.github.io",
    demoLink: "https://tsenzo.github.io/"
  },
  {
    title: "EnzoWeb Studio (en cours)",
    description: "Développement en cours d'un site vitrine professionnel pour EnzoWeb Studio. Design épuré, responsive et pensé pour mettre en valeur les services de création web.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "./public/enzoweb.png",
    githubLink: "https://github.com/TSenzo/EnzoWeb"
  }
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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

  // Card animation variants
  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 0 25px rgba(51,195,240,0.5)",
      transition: { duration: 0.3 }
    },
    normal: {
      scale: 1,
      boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  // Image animation variants
  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4 }
    },
    normal: {
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  // Info animation variants
  const infoVariants = {
    hover: {
      y: -5,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    normal: {
      y: 0,
      opacity: 0.9,
      transition: { duration: 0.3 }
    }
  };

  // Detail animation variants
  const detailsVariants = {
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 }
    },
    hide: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const openProjectDetails = (index: number) => {
    setSelectedProject(index);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Projets</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => openProjectDetails(index)}
              variants={cardVariants}
              initial="normal"
              animate={hoveredProject === index ? "hover" : "normal"}
            >
              <div className="cyber-card group h-full cursor-pointer">
                <div className="relative overflow-hidden rounded-t-lg h-48">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    variants={imageVariants}
                    initial="normal"
                    animate={hoveredProject === index ? "hover" : "normal"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-black/80 to-transparent opacity-60" />

                  {/* Animated overlay on hover */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-neon-blue/20 dark:bg-neon-purple/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === index ? 0.6 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                <motion.div
                  className="p-6 relative"
                  variants={infoVariants}
                  initial="normal"
                  animate={hoveredProject === index ? "hover" : "normal"}
                >
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
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectDetails}
          >
            <motion.div
              className="bg-background max-w-3xl w-full rounded-lg cyber-card overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              variants={detailsVariants}
            >
              <div className="relative h-64">
                <img
                  src={projects[selectedProject].image}
                  alt={projects[selectedProject].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <button
                  onClick={closeProjectDetails}
                  className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/40 transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 neon-text">{projects[selectedProject].title}</h3>
                <p className="mb-6">{projects[selectedProject].description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject].tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm px-3 py-1 rounded-full bg-accent/20 text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {projects[selectedProject].githubLink && (
                    <a
                      href={projects[selectedProject].githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Github size={18} />
                      <span>Code source</span>
                    </a>
                  )}

                  {projects[selectedProject].demoLink && (
                    <a
                      href={projects[selectedProject].demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg flex items-center gap-2"
                    >
                      <ExternalLink size={18} />
                      <span>Voir la démo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
