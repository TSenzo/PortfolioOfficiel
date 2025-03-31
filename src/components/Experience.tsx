
import { useEffect, useState } from "react";

interface Job {
  period: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
}

const experiences: Job[] = [
  {
    period: "2022 - Présent",
    title: "Développeur Front-end Senior",
    company: "TechFuture",
    description: "Développement d'applications web innovantes pour des clients internationaux.",
    achievements: [
      "Création d'une interface utilisateur avec React et TypeScript",
      "Implémentation d'animations et transitions fluides avec GSAP",
      "Optimisation des performances et accessibilité",
      "Collaboration avec les designers pour créer des interfaces intuitives"
    ]
  },
  {
    period: "2020 - 2022",
    title: "Développeur Full Stack",
    company: "WebInnovate",
    description: "Conception et développement d'applications web complètes.",
    achievements: [
      "Développement de solutions e-commerce avec React et Node.js",
      "Intégration de systèmes de paiement et CRM",
      "Mise en place d'architectures cloud scalables",
      "Développement d'API RESTful"
    ]
  },
  {
    period: "2018 - 2020",
    title: "Développeur Junior",
    company: "StartDigital",
    description: "Participation au développement de sites web et applications pour startups.",
    achievements: [
      "Intégration de designs responsive avec HTML, CSS et JavaScript",
      "Développement de fonctionnalités front-end avec Vue.js",
      "Participation aux revues de code et amélioration continue",
      "Collaboration avec l'équipe de développement"
    ]
  }
];

export default function Experience() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  
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

  const toggleExpand = (index: number) => {
    setExpandedJob(expandedJob === index ? null : index);
  };

  return (
    <section id="experience" className="section-padding bg-secondary/30">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Expérience Professionnelle</h2>
        
        <div className="max-w-3xl mx-auto relative">
          <div className="timeline-connector" />
          
          {experiences.map((job, index) => (
            <div 
              key={index}
              className="relative pl-8 mb-12 last:mb-0 animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-neon-blue dark:bg-neon-purple z-10 cyber-card" />
              
              <div 
                className={`cyber-card p-6 cursor-pointer transition-all duration-300 ${
                  expandedJob === index ? 'shadow-[0_0_15px_rgba(51,195,240,0.5)]' : ''
                }`}
                onClick={() => toggleExpand(index)}
              >
                <span className="inline-block px-3 py-1 text-sm rounded-full bg-accent/20 text-accent-foreground mb-2">
                  {job.period}
                </span>
                <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                <p className="text-neon-blue dark:text-neon-purple font-medium mb-3">{job.company}</p>
                <p className="text-muted-foreground">{job.description}</p>
                
                <div className={`mt-4 space-y-2 ${expandedJob === index ? 'block' : 'hidden'}`}>
                  <h4 className="font-semibold">Réalisations clés:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 text-neon-blue dark:text-neon-purple text-sm text-right">
                  {expandedJob === index ? 'Voir moins' : 'Voir plus'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
