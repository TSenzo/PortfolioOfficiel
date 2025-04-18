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
    period: "2024 - 2025",
    title: "Apprenti Développeur Web",
    company: "GIP FCIP de l’Académie de Toulouse (31)",
    description: "Développement et intégration de fonctionnalités liées à la gestion des utilisateurs et des données dans un système de gestion d'information pour un organisme de formation.",
    achievements: [
      "Création d'un système d'authentification et de connexion sécurisée avec vérification des identifiants et génération de tokens JWT.",
      "Développement d'un système de requêtes dynamiques aux API d'Yparéo pour la consultation et l'importation des données.",
      "Optimisation des performances et gestion des erreurs liées à l'importation des données dans la base de données locale.",
      "Mise en place d'une interface de gestion des mots de passe avec hachage sécurisé via bcrypt."
    ]
  },
  {
    period: "Mai-Juin 2023",
    title: "Stagiaire Administrateur Réseau",
    company: "Pôle Systèmes d’Informations - Mairie de Colomiers (31)",
    description: "Gestion des droits d'accès, configuration des équipements réseau et support technique.",
    achievements: [
      "Gestion des droits d'accès pour les utilisateurs au sein du réseau.",
      "Configuration et maintenance des systèmes réseaux.",
      "Résolution des incidents techniques et assistance aux utilisateurs.",
      "Mise à jour et installation de logiciels nécessaires à la bonne gestion des systèmes."
    ]
  },
  {
    period: "Juillet-Août 2022",
    title: "Employé Commercial",
    company: "Carrefour Market, Vic-Fezensac (32)",
    description: "Gestion des rayons et du service client, principalement au sein du secteur boulangerie et des rayons de produits alimentaires.",
    achievements: [
      "Préparation des produits de boulangerie et gestion des stocks.",
      "Mise en rayon des produits alimentaires et respect des normes d'hygiène.",
      "Service client en caisse et gestion des demandes en magasin.",
      "Organisation de l'espace de vente et maintien de la propreté des rayons."
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
