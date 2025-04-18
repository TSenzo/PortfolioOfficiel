import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail, Send, Download } from "lucide-react"; // Ajout de l'icône Download
import emailjs from "emailjs-com"; // Import de EmailJS

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
    
    // Envoi de l'email via EmailJS
    emailjs.send(
      "service_h5pmhq3", // Remplacer par ton ID de service EmailJS
      "template_xtrtg9y", // Remplacer par ton ID de template EmailJS
      formData, // Données du formulaire
      "4k397SMNXw-aJhQzE" // Remplacer par ton ID utilisateur EmailJS
    ).then(
      (response) => {
        console.log("Email envoyé", response);
        setIsSubmitting(false);
        toast({
          title: "Message envoyé !",
          description: "Merci pour votre message, je vous répondrai dès que possible.",
        });
        setFormData({ name: "", email: "", message: "" });
      },
      (error) => {
        console.error("Erreur lors de l'envoi", error);
        setIsSubmitting(false);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'envoi du message.",
        });
      }
    );
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
                    href="mailto:enzo.dalcorso01@gmail.com" 
                    className="text-neon-blue dark:text-neon-purple hover:underline flex items-center"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    enzo.dalcorso01@gmail.com
                  </a>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Réseaux Sociaux</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/TSenzo" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                      className="text-foreground hover:text-neon-blue transition-colors"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/enzo-dal-corso-52910225b/?originalSubdomain=fr" 
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
                <a
                  href="./public/CV_Enzo_DalCorso.pdf" // Chemin vers le fichier PDF dans le dossier public
                  download
                  className="flex items-center justify-center space-x-2 bg-neon-purple/10 hover:bg-neon-purple/20 w-full h-full px-4 py-2.5 transition-all"
                >
                  <span>Télécharger CV</span>
                  <Download className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
