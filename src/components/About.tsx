
import { useEffect } from "react";

export default function About() {
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
    <section id="about" className="section-padding">
      <div className="container mx-auto">
        <h2 className="section-title text-center">À Propos</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="cyber-card p-6 md:p-8 animate-on-scroll">
            <p className="text-lg mb-6">
              Passionné par le développement web et les nouvelles technologies, je crée des expériences 
              numériques modernes et innovantes. Mon objectif est de repousser les limites 
              de ce qui est possible sur le web.
            </p>
            
            <p className="text-lg mb-6">
              Avec une approche centrée sur l'utilisateur et une attention méticuleuse aux détails, 
              je transforme des concepts complexes en interfaces intuitives et esthétiques.
            </p>
            
            <p className="text-lg">
              J'explore constamment de nouvelles technologies et méthodologies pour rester 
              à la pointe de l'innovation dans un domaine en perpétuelle évolution.
            </p>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-6 justify-center">
            <div className="cyber-card p-6 animate-on-scroll w-full md:w-[calc(50%-12px)]">
              <h3 className="text-xl font-bold mb-4 text-neon-blue">Ma Vision</h3>
              <p>
                Créer des expériences web qui marient fonctionnalité et esthétique, 
                où la technologie devient invisible au profit de l'expérience utilisateur.
              </p>
            </div>
            
            <div className="cyber-card p-6 animate-on-scroll w-full md:w-[calc(50%-12px)]">
              <h3 className="text-xl font-bold mb-4 text-neon-purple">Mes Valeurs</h3>
              <p>
                Innovation, qualité, accessibilité et apprentissage continu sont les principes 
                qui guident mon travail au quotidien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
