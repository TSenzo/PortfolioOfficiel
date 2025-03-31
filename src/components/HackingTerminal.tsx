
import { useEffect, useState, useRef } from "react";
import { useHackingMode } from "@/hooks/useHackingMode";

interface CommandResponse {
  text: string;
  isError?: boolean;
}

const TYPING_SPEED = 30; // ms per character
const COMMANDS: Record<string, string | ((args: string[]) => string)> = {
  help: `Available commands:
  - help: Show this help message
  - clear: Clear the terminal
  - about: Display information about Enzo Dal Corso
  - skills: List technical skills
  - projects: Show current projects
  - contact: Display contact information
  - exit: Exit hacking mode`,
  clear: "",
  about: `Enzo Dal Corso:
  Développeur passionné par les expériences utilisateur innovantes et les interfaces du futur.
  Spécialisé dans la création d'applications web et mobiles avec des interfaces futuristes.`,
  skills: `Technical Skills:
  - Frontend: React, Vue.js, TypeScript, Tailwind CSS
  - Backend: Node.js, Express, Django, Flask
  - Design: UI/UX, Figma, Adobe XD
  - Other: WebGL, GSAP, Three.js`,
  projects: `Current Projects:
  - Portfolio Cyberpunk: This futuristic portfolio website
  - AR Experience: Interactive augmented reality web app
  - Neural Interface: Experimental UI controlled by brainwaves
  - Quantum Dashboard: Data visualization for quantum computing`,
  contact: `Contact Information:
  - Email: enzo.dalcorso@example.com
  - GitHub: github.com/enzodalcorso
  - LinkedIn: linkedin.com/in/enzodalcorso`,
  exit: (args: string[]) => {
    // This will be handled separately
    return "Exiting hacking mode...";
  },
};

export default function HackingTerminal() {
  const { hackingMode, toggleHackingMode } = useHackingMode();
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [responses, setResponses] = useState<CommandResponse[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/typing.mp3');
    audioRef.current.volume = 0.2;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    const terminal = terminalRef.current;
    if (terminal) {
      terminal.addEventListener("click", handleClick);
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick);
      }
    };
  }, []);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [responses, typingText]);

  // Handle typing animation
  useEffect(() => {
    if (!isTyping || !typingText) return;
    
    if (typingIndex < typingText.length) {
      const timeout = setTimeout(() => {
        setTypingIndex(prev => prev + 1);
        
        // Play typing sound effect randomly (not for every character)
        if (audioRef.current && Math.random() > 0.7) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(e => console.log("Audio play error:", e));
        }
      }, TYPING_SPEED);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
      setTypingIndex(0);
      setTypingText("");
    }
  }, [isTyping, typingText, typingIndex]);

  // Initial greeting when hacking mode is activated
  useEffect(() => {
    if (hackingMode && responses.length === 0) {
      setResponses([
        { text: "Terminal v3.0.1 (Cybersecurity Research Network)" },
        { text: "Establishing secure connection..." },
        { text: "Access granted to Enzo Dal Corso's private network." },
        { text: "Type 'help' for available commands." }
      ]);
    }
  }, [hackingMode, responses.length]);

  // Process user command
  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(" ");
    const command = parts[0];
    const args = parts.slice(1);
    
    let response: string | undefined;
    
    if (command === "") {
      return;
    }
    
    if (command === "exit") {
      addResponse({ text: "Exiting hacking mode..." });
      setTimeout(() => toggleHackingMode(), 1000);
      return;
    }
    
    if (command in COMMANDS) {
      const cmdResponse = COMMANDS[command];
      response = typeof cmdResponse === "function" 
        ? cmdResponse(args) 
        : cmdResponse;
    } else {
      response = `Command not found: ${command}. Type 'help' for available commands.`;
    }
    
    // Clear command
    if (command === "clear") {
      setResponses([]);
      return;
    }
    
    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    
    // Display typed response
    if (response) {
      setTypingText(response);
      setIsTyping(true);
      addResponse({ text: response, isError: !COMMANDS[command] });
    }
  };

  const addResponse = (response: CommandResponse) => {
    setResponses(prev => [...prev, response]);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand) {
      processCommand(currentCommand);
      setCurrentCommand("");
    }
  };

  if (!hackingMode) return null;

  return (
    <div className="hacking-container" ref={terminalRef}>
      <div className="p-4 h-full overflow-auto font-mono">
        <div className="mb-6">
          <h2 className="text-3xl mb-2 hacking-text">CYBERPUNK TERMINAL</h2>
          <p className="text-sm opacity-70">Secure connection to Enzo Dal Corso's systems</p>
        </div>
        
        <div className="space-y-2 mb-4">
          {responses.map((response, index) => (
            <div key={index} className={`${response.isError ? 'text-red-500' : ''}`}>
              {response.text}
            </div>
          ))}
          
          {isTyping && (
            <div className="command-line">
              {typingText.substring(0, typingIndex)}
              <span className="cursor"></span>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="command-line">
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              className="bg-transparent border-none outline-none w-full"
              autoFocus
              disabled={isTyping}
            />
            {!isTyping && <span className="cursor"></span>}
          </div>
        </form>
      </div>
    </div>
  );
}
