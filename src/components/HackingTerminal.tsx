
import { useEffect, useState, useRef } from "react";
import { useHackingMode } from "@/hooks/useHackingMode";
import { ArrowDown, ArrowUp, DownloadCloud, Eye, EyeOff, Github, Mail, Terminal } from "lucide-react";

interface CommandResponse {
  text: string;
  isError?: boolean;
  isHTML?: boolean;
}

const TYPING_SPEED = 25; // ms per character

// Command definitions
const COMMANDS: Record<string, string | ((args: string[]) => string | { text: string; isHTML?: boolean })> = {
  help: `Available commands:
  - help: Show this help message
  - clear: Clear the terminal
  - about: Display information about Enzo Dal Corso
  - skills: List technical skills
  - projects: Show current projects
  - contact: Display contact information
  - matrix: Start Matrix effect
  - hack [target]: Attempt to hack a target system
  - scan: Scan portfolio for hidden sections
  - download: Download CV
  - social: Display social media links
  - status: Display system status
  - theme [dark|light]: Toggle site theme
  - exit: Exit hacking mode`,
  
  clear: "",
  
  about: `Enzo Dal Corso:
  Développeur passionné par les expériences utilisateur innovantes et les interfaces du futur.
  Spécialisé dans la création d'applications web et mobiles avec des interfaces futuristes.
  //---------------------------------//
  STATUS: CONNECTÉ AU RÉSEAU PRINCIPAL
  LOCALISATION: CONFIDENTIELLE
  DERNIÈRE MISE À JOUR: ${new Date().toLocaleDateString()}`,
  
  skills: `Technical Skills:
  [●●●●●] Frontend: React, Vue.js, TypeScript, Tailwind CSS
  [●●●●○] Backend: Node.js, Express, Django, Flask
  [●●●●●] Design: UI/UX, Figma, Adobe XD
  [●●●●○] 3D & Animation: Three.js, GSAP, WebGL
  [●●●○○] AR/VR: WebXR, A-Frame
  [●●●●●] Other: Git, CI/CD, Docker
  
  EXTRACTION TERMINÉE - COMPÉTENCES ANALYSÉES AVEC SUCCÈS`,
  
  projects: (args: string[]) => {
    const projectId = args[0];
    const projects = {
      "1": "Portfolio Cyberpunk: Interface futuriste et animations avancées. Technologies: React, TypeScript, Tailwind, GSAP",
      "2": "AR Experience: Application web de réalité augmentée permettant de visualiser des objets 3D. Technologies: WebXR, Three.js",
      "3": "Neural Interface: Interface expérimentale contrôlée par des mouvements faciaux. Technologies: TensorFlow.js, React",
      "4": "Quantum Dashboard: Visualisation de données quantiques avec animations 3D. Technologies: D3.js, Three.js, WebGL"
    };

    if (projectId && projectId in projects) {
      return `PROJECT ID #${projectId}: ${projects[projectId as keyof typeof projects]}`;
    }

    return `Current Projects:
  [ID: 1] Portfolio Cyberpunk: This futuristic portfolio website
  [ID: 2] AR Experience: Interactive augmented reality web app
  [ID: 3] Neural Interface: Experimental UI controlled by facial movements
  [ID: 4] Quantum Dashboard: Data visualization for quantum computing
  
  Pour plus de détails: projects [id]`;
  },
  
  contact: `Contact Information:
  - Email: enzo.dalcorso@example.com
  - GitHub: github.com/enzodalcorso
  - LinkedIn: linkedin.com/in/enzodalcorso
  
  ENCRYPTED COMMUNICATION CHANNELS AVAILABLE`,
  
  matrix: () => {
    return {
      text: `<div id="matrix-effect">Initializing Matrix effect...</div>`,
      isHTML: true
    };
  },
  
  hack: (args: string[]) => {
    const target = args[0] || "unknown";
    return `Attempting to hack ${target}...
    
[■■■□□□□□□□] 30% Complete
Bypassing firewall...
[■■■■■□□□□□] 50% Complete
Scanning for vulnerabilities...
[■■■■■■■□□□] 70% Complete
Exploiting security flaws...
[■■■■■■■■■■] 100% Complete

ACCESS DENIED. Target system "${target}" is protected by advanced security measures.
Hack attempt logged. Disconnecting...`;
  },
  
  scan: `Scanning portfolio for hidden sections...
  
[■■■□□□□□□□] 30% Complete
Analyzing DOM structure...
[■■■■■□□□□□] 50% Complete
Searching for obfuscated code...
[■■■■■■■□□□] 70% Complete
Processing hidden attributes...
[■■■■■■■■■■] 100% Complete

SCAN COMPLETE. 2 hidden sections detected:
- SECRET PROJECT: Advanced neural network experiment (locked)
- EASTER EGG: Interactive animation (press 'K' + 'O' + 'N' + 'A' + 'M' + 'I' to activate)`,
  
  download: `Initiating CV download process...
  
[■■■□□□□□□□] 30% Complete - Compiling data
[■■■■■□□□□□] 50% Complete - Formatting document
[■■■■■■■□□□] 70% Complete - Applying encryption
[■■■■■■■■■■] 100% Complete - Download ready

DOCUMENT PREPARED. Click the link below to download:
CV_ENZO_DAL_CORSO.pdf`,
  
  social: `Social Media Profiles:
  
[GITHUB] github.com/enzodalcorso - Open source contributions
[LINKEDIN] linkedin.com/in/enzodalcorso - Professional network
[TWITTER] twitter.com/enzodalcorso - Tech insights
[CODEPEN] codepen.io/enzodalcorso - Experimental projects

SOCIAL FOOTPRINT ANALYSIS COMPLETE`,
  
  status: `System Status:
  
CPU: 42% utilization
MEMORY: 613MB / 2048MB
NETWORK: Connected (128 Mbps)
UPTIME: ${Math.floor(Math.random() * 24)} hours, ${Math.floor(Math.random() * 60)} minutes
SECURITY: Active (Firewall enabled)
BACKUPS: Last backup ${Math.floor(Math.random() * 7) + 1} days ago
VULNERABILITIES: None detected

All systems operational.`,
  
  theme: (args: string[]) => {
    const theme = args[0];
    if (theme === "dark" || theme === "light") {
      return `Setting theme to ${theme} mode...
      
Theme switched successfully to ${theme} mode.`;
    }
    return `Usage: theme [dark|light]
Current theme: ${document.documentElement.classList.contains("dark") ? "dark" : "light"}`;
  },
  
  exit: (args: string[]) => {
    // This will be handled separately
    return "Exiting hacking mode...";
  },
};

export default function HackingTerminal() {
  const { hackingMode, toggleHackingMode } = useHackingMode();
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [responses, setResponses] = useState<CommandResponse[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [matrixActive, setMatrixActive] = useState(false);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [visibilityMode, setVisibilityMode] = useState<'visible' | 'hidden' | 'minimized'>('visible');
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const beepRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/typing.mp3');
    audioRef.current.volume = 0.2;
    
    beepRef.current = new Audio('/beep.mp3');
    beepRef.current.volume = 0.15;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (beepRef.current) {
        beepRef.current.pause();
        beepRef.current = null;
      }
    };
  }, []);

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && visibilityMode === 'visible') {
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
  }, [visibilityMode]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current && visibilityMode === 'visible') {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [responses, typingText, visibilityMode]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hackingMode && visibilityMode === 'visible') {
        // Handle up/down arrows for command history
        if (e.key === 'ArrowUp' && commandHistory.length > 0) {
          e.preventDefault();
          const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
        } else if (e.key === 'ArrowDown' && historyIndex >= 0) {
          e.preventDefault();
          const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
          setHistoryIndex(newIndex);
          setCurrentCommand(newIndex >= 0 ? commandHistory[commandHistory.length - 1 - newIndex] : '');
        }
        
        // Play beep sound on key press
        if ((e.key.length === 1 || e.key === 'Backspace') && 
            document.activeElement === inputRef.current && 
            beepRef.current && 
            Math.random() > 0.7) {
          beepRef.current.currentTime = 0;
          beepRef.current.play().catch(e => console.log("Audio play error:", e));
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hackingMode, commandHistory, historyIndex, visibilityMode]);

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

  // Matrix effect
  useEffect(() => {
    if (!matrixActive || !matrixRef.current) return;
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}:|<>?";
    const columns = Math.floor(window.innerWidth / 20);
    const matrixChars = Array.from({length: columns}, () => ({
      text: chars[Math.floor(Math.random() * chars.length)],
      x: Math.floor(Math.random() * window.innerWidth),
      y: Math.floor(Math.random() * window.innerHeight) - window.innerHeight,
      speed: Math.random() * 15 + 5,
      opacity: Math.random() * 0.5 + 0.5
    }));
    
    let animationFrameId: number;
    let ctx: CanvasRenderingContext2D | null = null;
    
    const canvas = document.createElement('canvas');
    matrixRef.current.innerHTML = '';
    matrixRef.current.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    
    ctx = canvas.getContext('2d');
    
    const animate = () => {
      if (ctx) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'rgba(0, 255, 130, 0.8)';
        ctx.font = '15px monospace';
        
        matrixChars.forEach((char, i) => {
          ctx!.fillText(
            chars[Math.floor(Math.random() * chars.length)], 
            char.x, 
            char.y
          );
          
          char.y += char.speed;
          if (char.y > canvas.height) {
            char.y = 0;
            char.x = Math.random() * canvas.width;
          }
        });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (matrixRef.current) {
        matrixRef.current.innerHTML = '';
      }
    };
  }, [matrixActive]);

  // Initial greeting when hacking mode is activated
  useEffect(() => {
    if (hackingMode && responses.length === 0) {
      setResponses([
        { text: "CYBERSEC OS v7.3.1 [Build 20XX-NEO]" },
        { text: "Establishing encrypted connection to Enzo Dal Corso's network..." },
        { text: "Bypassing security protocols..." },
        { text: "Decrypting access codes..." },
        { text: "Access granted to Enzo Dal Corso's private network." },
        { text: "Type 'help' to view available commands." }
      ]);
    }
  }, [hackingMode, responses.length]);

  // Process user command
  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(" ");
    const command = parts[0];
    const args = parts.slice(1);
    
    let response: string | { text: string; isHTML?: boolean } | undefined;
    
    if (command === "") {
      return;
    }
    
    setHistoryIndex(-1);
    
    if (command === "exit") {
      addResponse({ text: "Terminating connection... Exiting hacking mode..." });
      setTimeout(() => toggleHackingMode(), 1500);
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
    
    // Special commands
    if (command === "clear") {
      setResponses([]);
      return;
    }
    
    if (command === "matrix") {
      setMatrixActive(true);
      setTimeout(() => setMatrixActive(false), 15000);
    }
    
    if (command === "theme") {
      const theme = args[0];
      if (theme === "dark" || theme === "light") {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    }
    
    if (command === "download") {
      // Simulating download - in a real site, this would point to an actual file
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = '#'; // Would be a real CV download link
        link.download = 'CV_ENZO_DAL_CORSO.pdf';
        // Uncomment the next line when you have a real file to download
        // link.click();
      }, 3000);
    }
    
    // Add command to history
    setCommandHistory(prev => [...prev, cmd]);
    
    // Display typed response
    if (response) {
      if (typeof response === 'string') {
        setTypingText(response);
        setIsTyping(true);
        addResponse({ text: response, isError: !COMMANDS[command] });
      } else {
        setTypingText(response.text);
        setIsTyping(true);
        addResponse({ 
          text: response.text, 
          isError: !COMMANDS[command],
          isHTML: response.isHTML 
        });
      }
    }
  };

  const addResponse = (response: CommandResponse) => {
    setResponses(prev => [...prev, response]);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand && !isTyping) {
      processCommand(currentCommand);
      setCurrentCommand("");
    }
  };
  
  const toggleVisibility = () => {
    if (visibilityMode === 'visible') {
      setVisibilityMode('minimized');
    } else {
      setVisibilityMode('visible');
    }
  };
  
  const closeTerminal = () => {
    toggleHackingMode();
  };

  if (!hackingMode) return null;

  return (
    <div 
      className={`hacking-container z-50 ${
        visibilityMode === 'hidden' ? 'hidden' : 
        visibilityMode === 'minimized' ? 'h-auto bottom-0 left-0 right-auto top-auto' : 
        'h-full'
      }`} 
      ref={terminalRef}
    >
      {/* Matrix effect container */}
      <div ref={matrixRef} className="absolute inset-0 pointer-events-none"></div>
      
      <div className={`p-4 ${visibilityMode === 'minimized' ? 'h-auto' : 'h-full'} overflow-auto font-mono relative`}>
        {/* Terminal header */}
        <div className="flex justify-between items-center mb-4 border-b border-hacking-text/30 pb-2">
          <div className="flex items-center">
            <Terminal className="w-5 h-5 mr-2 text-hacking-text" />
            <h2 className="text-xl hacking-text">CYBERSEC TERMINAL</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleVisibility} 
              className="p-1 hover:bg-hacking-text/20 rounded"
              aria-label={visibilityMode === 'minimized' ? "Maximize terminal" : "Minimize terminal"}
            >
              {visibilityMode === 'minimized' ? 
                <ArrowUp className="w-4 h-4 text-hacking-text" /> : 
                <ArrowDown className="w-4 h-4 text-hacking-text" />
              }
            </button>
            <button 
              onClick={closeTerminal} 
              className="p-1 hover:bg-red-500/20 rounded"
              aria-label="Close terminal"
            >
              <EyeOff className="w-4 h-4 text-hacking-text" />
            </button>
          </div>
        </div>
        
        {visibilityMode !== 'minimized' && (
          <>
            <div className="mb-6">
              <p className="text-sm opacity-70">Secure connection to Enzo Dal Corso's network</p>
            </div>
            
            <div className="space-y-2 mb-4">
              {responses.map((response, index) => (
                <div 
                  key={index} 
                  className={`${response.isError ? 'text-red-500' : ''}`}
                  {...(response.isHTML ? { dangerouslySetInnerHTML: { __html: response.text } } : { children: response.text })}
                />
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
                  className="bg-transparent border-none outline-none w-full text-hacking-text"
                  autoFocus
                  disabled={isTyping}
                  placeholder={isTyping ? "" : "Enter command..."}
                />
                {!isTyping && <span className="cursor"></span>}
              </div>
            </form>
          </>
        )}
      </div>
      
      {/* Floating controls */}
      {visibilityMode !== 'visible' && (
        <div className="fixed bottom-4 left-4 flex space-x-2">
          <button 
            onClick={() => setVisibilityMode('visible')}
            className="bg-hacking-bg border border-hacking-text/50 p-2 rounded-full hover:bg-hacking-text/20 transition-colors"
            aria-label="Open terminal"
          >
            <Terminal className="w-5 h-5 text-hacking-text" />
          </button>
          
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => processCommand('download')}
              className="bg-hacking-bg border border-hacking-text/50 p-2 rounded-full hover:bg-hacking-text/20 transition-colors"
              aria-label="Download CV"
            >
              <DownloadCloud className="w-5 h-5 text-hacking-text" />
            </button>
            <button 
              onClick={() => processCommand('contact')}
              className="bg-hacking-bg border border-hacking-text/50 p-2 rounded-full hover:bg-hacking-text/20 transition-colors"
              aria-label="Contact"
            >
              <Mail className="w-5 h-5 text-hacking-text" />
            </button>
            <button 
              onClick={() => window.open('https://github.com/enzodalcorso', '_blank')}
              className="bg-hacking-bg border border-hacking-text/50 p-2 rounded-full hover:bg-hacking-text/20 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-hacking-text" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
