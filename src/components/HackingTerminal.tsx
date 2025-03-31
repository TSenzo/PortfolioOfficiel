
import { useEffect, useState, useRef } from "react";
import { useHackingMode } from "@/hooks/useHackingMode";

const messages = [
  "Initialisation du système...",
  "Connexion au réseau sécurisé...",
  "Déchiffrement des données personnelles...",
  "Analyse du profil: Enzo Dal Corso",
  "Identification des compétences principales...",
  "Développeur Front-end Senior - Confirmé",
  "Maîtrise des frameworks JS modernes - Validé",
  "Expérience UI/UX - Niveau Expert",
  "Accès aux projets accordé...",
  "Scan des langues complété...",
  "Autorisation de contact établie...",
  "Système prêt. Bienvenue dans le terminal."
];

export default function HackingTerminal() {
  const { hackingMode } = useHackingMode();
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Type out messages character by character
  useEffect(() => {
    if (!hackingMode) {
      setVisibleMessages([]);
      setCurrentIndex(0);
      setCurrentChar(0);
      return;
    }

    if (currentIndex >= messages.length) return;

    const message = messages[currentIndex];
    
    if (currentChar < message.length) {
      const timer = setTimeout(() => {
        setCurrentChar(currentChar + 1);
      }, 40); // Typing speed
      
      return () => clearTimeout(timer);
    } else {
      // Move to next message
      const timer = setTimeout(() => {
        setVisibleMessages([...visibleMessages, message]);
        setCurrentIndex(currentIndex + 1);
        setCurrentChar(0);
      }, 500); // Pause between messages
      
      return () => clearTimeout(timer);
    }
  }, [hackingMode, currentIndex, currentChar, visibleMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleMessages, currentChar]);

  // Play typing sound
  useEffect(() => {
    if (hackingMode && currentChar > 0) {
      const typingSound = new Audio('/typing.mp3');
      typingSound.volume = 0.1;
      typingSound.play().catch(() => {
        // Handle autoplay restrictions
        console.log("Audio playback was prevented by the browser");
      });
    }
  }, [hackingMode, currentChar]);

  if (!hackingMode) return null;

  return (
    <div className="hacking-container">
      <div className="terminal-content" ref={terminalRef}>
        <h3 className="mb-6 text-2xl">TERMINAL SÉCURITÉ</h3>
        
        {visibleMessages.map((message, index) => (
          <div key={index} className="command-line">
            <span>{message}</span>
          </div>
        ))}
        
        {currentIndex < messages.length && (
          <div className="command-line">
            <span>{messages[currentIndex].substring(0, currentChar)}</span>
            <span className="cursor"></span>
          </div>
        )}
        
        {currentIndex >= messages.length && (
          <div className="command-line mt-4">
            <span>Tapez votre commande: </span>
            <span className="cursor"></span>
          </div>
        )}
      </div>
    </div>
  );
}
