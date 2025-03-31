
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function useHackingMode() {
  const [hackingMode, setHackingMode] = useState<boolean>(false);
  const { toast } = useToast();
  
  const toggleHackingMode = () => {
    const newMode = !hackingMode;
    setHackingMode(newMode);
    
    // Show toast notification
    toast({
      title: newMode ? "Mode Hacking Activé" : "Mode Hacking Désactivé",
      description: newMode 
        ? "Initialisation de la séquence de piratage... Accès au terminal accordé." 
        : "Déconnexion du terminal... Retour à l'interface standard.",
      variant: newMode ? "destructive" : "default",
    });
    
    // Add or remove class from body
    if (newMode) {
      document.body.classList.add('hacking-mode');
    } else {
      document.body.classList.remove('hacking-mode');
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('hacking-mode');
    };
  }, []);
  
  return { hackingMode, toggleHackingMode };
}
