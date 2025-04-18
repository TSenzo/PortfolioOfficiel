import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "design" | "other";
}

const skills: Skill[] = [
  { name: "HTML/CSS", level: 80, category: "frontend" },
  { name: "JavaScript", level: 70, category: "frontend" },
  { name: "React", level: 50, category: "frontend" },
  { name: "TypeScript", level: 50, category: "frontend" },
  { name: "Vue.js", level: 60, category: "frontend" },
  { name: "Node.js", level: 70, category: "backend" },
  { name: "Express", level: 50, category: "backend" },
  { name: "MongoDB", level: 60, category: "backend" },
  { name: "SQL", level: 80, category: "backend" },
  { name: "MariaDB", level: 70, category: "backend" },
  { name: "UI/UX Design", level: 50, category: "design" },
  { name: "Figma", level: 40, category: "design" },
  { name: "Git", level: 80, category: "other" },
  { name: "Linux (Fedora, Ubuntu)", level: 70, category: "other" },
  { name: "Windows", level: 80, category: "other" },
  { name: "Network Configuration", level: 60, category: "other" },
  { name: "Project Management", level: 60, category: "other" },
  { name: "Web Security", level: 75, category: "other" },
  { name: "Embedded Systems (Raspberry Pi)", level: 80, category: "other" },
  { name: "PowerShell", level: 50, category: "other" },
  { name: "GitHub", level: 80, category: "other" },
  { name: "GitLab", level: 75, category: "other" },
  { name: "WebServices", level: 80, category: "backend" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');

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

  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const handleFlip = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
    setTimeout(() => {
      const element = document.getElementById(`skill-card-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);
  };

  const getSkillDescription = (skill: Skill): string => {
    switch (skill.name) {
      case "HTML/CSS":
        return "Maîtrise solide en HTML et CSS, permettant de créer des pages web efficaces et accessibles.";
      case "JavaScript":
        return "Connaissances avancées en JavaScript pour développer des interfaces interactives et dynamiques.";
      case "React":
        return "Bonne compréhension des concepts de React pour la création d'applications web modernes.";
      case "TypeScript":
        return "Notions de TypeScript, principalement pour des projets de taille moyenne avec un typage sécurisé.";
      case "Vue.js":
        return "Compétences intermédiaires en Vue.js pour des projets frontend dynamiques.";
      case "Node.js":
        return "Expérience solide avec Node.js pour le développement côté serveur et la gestion d'API RESTful.";
      case "Express":
        return "Notions de base d'Express pour la création d'applications web et d'API backend.";
      case "MongoDB":
        return "Bonne maîtrise des bases de données NoSQL avec MongoDB, utilisé dans des projets backend.";
      case "SQL":
        return "Expertise avancée en SQL, avec une gestion efficace des bases de données relationnelles.";
      case "MariaDB":
        return "Maîtrise de MariaDB pour la gestion de bases de données open-source et les requêtes complexes.";
      case "UI/UX Design":
        return "Connaissances de base en design UI/UX, avec un focus sur la création d'interfaces utilisateurs intuitives.";
      case "Figma":
        return "Utilisation de Figma pour concevoir des prototypes et des maquettes d'interfaces.";
      case "Git":
        return "Utilisation courante de Git pour le contrôle de version et la gestion de projets collaboratifs.";
      case "Linux (Fedora, Ubuntu)":
        return "Bonne maîtrise de Linux pour l'administration système et l'automatisation des tâches.";
      case "Windows":
        return "Solide connaissance de Windows, tant pour le développement que pour l'administration système.";
      case "Network Configuration":
        return "Compétences intermédiaires en configuration et gestion des réseaux locaux et distants.";
      case "Project Management":
        return "Notions de gestion de projet avec une bonne compréhension des méthodologies agiles.";
      case "Web Security":
        return "Bonnes connaissances des pratiques de sécurité pour protéger les applications web et les API.";
      case "Embedded Systems (Raspberry Pi)":
        return "Bonne maîtrise des systèmes embarqués, notamment avec Raspberry Pi.";
      case "PowerShell":
        return "Notions de base en PowerShell pour l'automatisation des tâches sur les systèmes Windows.";
      case "GitHub":
        return "Utilisation avancée de GitHub pour le suivi de version et la gestion de projets open-source.";
      case "GitLab":
        return "Compétences en gestion de projets avec GitLab, particulièrement pour le développement collaboratif.";
      case "WebServices":
        return "Maîtrise des WebServices pour l'intégration et la communication entre applications backend.";
      default:
        return "Niveau d'expertise non spécifié.";
    }
  };

  const renderSkillCards = () => {
    return filteredSkills.map((skill, index) => {
      const isFlipped = flippedCard === index;

      return (
        <motion.div
          key={index}
          id={`skill-card-${index}`}
          className={`animate-on-scroll skill-card bg-background cyber-card p-6 transform transition-all duration-700 ease-in-out cursor-pointer relative overflow-hidden rounded-xl shadow-lg ${isFlipped ? 'rotate-y-180 z-10' : ''}`}
          style={{
            animationDelay: `${index * 100}ms`,
            perspective: '1000px',
            height: isFlipped ? "auto" : "220px",
            maxHeight: isFlipped ? "600px" : "220px",
          }}
          onClick={() => handleFlip(index)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 p-6 transition-opacity duration-700 ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
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

          {/* Back */}
          <div
            className={`absolute inset-0 p-6 flex flex-col justify-center items-center transform rotate-y-180 transition-opacity duration-700 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 neon-text">{skill.name}</h3>
              <p className="mb-4">{getSkillDescription(skill)}</p>
              <div className="inline-block w-20 h-20 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple p-1">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <span className="text-2xl font-bold">{skill.level}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Compétences</h2>

        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button onClick={() => setActiveCategory("all")} className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === "all" ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' : 'bg-secondary hover:bg-secondary/80'}`}>
            Toutes
          </button>

          <button onClick={() => setActiveCategory("frontend")} className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === "frontend" ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' : 'bg-secondary hover:bg-secondary/80'}`}>
            Frontend
          </button>

          <button onClick={() => setActiveCategory("backend")} className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === "backend" ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' : 'bg-secondary hover:bg-secondary/80'}`}>
            Backend
          </button>

          <button onClick={() => setActiveCategory("design")} className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === "design" ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' : 'bg-secondary hover:bg-secondary/80'}`}>
            Design
          </button>

          <button onClick={() => setActiveCategory("other")} className={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === "other" ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white' : 'bg-secondary hover:bg-secondary/80'}`}>
            Autres
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {renderSkillCards()}
        </div>

        <p className="text-center mt-6 text-muted-foreground">Cliquez sur une compétence pour plus de détails</p>
      </div>
    </section>
  );
}
