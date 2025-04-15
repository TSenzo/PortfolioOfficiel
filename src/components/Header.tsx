
import { useState, useEffect } from "react";
import { Menu, X, Terminal } from "lucide-react";
import { useHackingMode } from "@/hooks/useHackingMode";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Accueil", href: "#home" },
  { label: "À propos", href: "#about" },
  { label: "Formation", href: "#education" },
  { label: "Compétences", href: "#skills" },
  { label: "Expérience", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Langues", href: "#languages" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { hackingMode, toggleHackingMode } = useHackingMode();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? "glass py-3" : "py-5"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold neon-text">EDC</a>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 justify-start">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-foreground hover:text-neon-blue transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-neon-blue after:transition-all hover:after:w-full"
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
          
          {/* Hacking mode toggle button */}
          <button
            onClick={toggleHackingMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              hackingMode
                ? 'bg-hacking-text text-hacking-bg'
                : 'border border-foreground/20 hover:border-neon-blue hover:text-neon-blue'
            }`}
            aria-label={hackingMode ? "Désactiver le mode hacking" : "Activer le mode hacking"}
          >
            <Terminal size={20} />
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Hacking mode toggle for mobile */}
          <button
            onClick={toggleHackingMode}
            className={`p-2 rounded-full transition-all duration-300 ${
              hackingMode
                ? 'bg-hacking-text text-hacking-bg'
                : 'border border-foreground/20 hover:border-neon-blue hover:text-neon-blue'
            }`}
            aria-label={hackingMode ? "Désactiver le mode hacking" : "Activer le mode hacking"}
          >
            <Terminal size={18} />
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground hover:text-neon-blue transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-30 glass">
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="text-xl font-medium text-foreground hover:text-neon-blue transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
