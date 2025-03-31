
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message envoyé !",
        description: "Merci pour votre message, je vous répondrai dès que possible.",
      });
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto">
        <h2 className="section-title text-center">Contact</h2>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="cyber-card p-6 animate-on-scroll">
            <h3 className="text-xl font-bold mb-6 neon-text">Me Contacter</h3>
            
            <p className="mb-6">
              Vous avez un projet en tête ou des questions ? N'hésitez pas à me contacter 
              via ce formulaire ou directement par mail.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-2 border-neon-blue/30 focus:border-neon-blue/60 transition-colors"
                />
              </div>
              
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-2 border-neon-blue/30 focus:border-neon-blue/60 transition-colors"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Votre message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-transparent border-2 border-neon-blue/30 focus:border-neon-blue/60 transition-colors"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full cyber-card p-0 overflow-hidden"
              >
                <div className="flex items-center justify-center space-x-2 bg-neon-blue/10 hover:bg-neon-blue/20 w-full h-full px-4 py-2.5 transition-all">
                  <span>{isSubmitting ? "Envoi en cours..." : "Envoyer"}</span>
                  <Send className="h-4 w-4" />
                </div>
              </Button>
            </form>
          </div>
          
          <div className="cyber-card p-6 animate-on-scroll flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 neon-text">Informations</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Email</h4>
                  <a 
                    href="mailto:contact@enzodal.corso" 
                    className="text-neon-blue dark:text-neon-purple hover:underline flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    contact@enzodal.corso
                  </a>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Réseaux Sociaux</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-foreground hover:text-neon-blue transition-colors"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="text-foreground hover:text-neon-blue transition-colors"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="font-semibold mb-4">Télécharger mon CV</h4>
              <Button className="w-full cyber-card p-0 overflow-hidden">
                <div className="flex items-center justify-center space-x-2 bg-neon-purple/10 hover:bg-neon-purple/20 w-full h-full px-4 py-2.5 transition-all">
                  <span>Télécharger CV</span>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
