import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [activeLink, setActiveLink] = useState<string>("");

  // Scroll event to change the background color
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 0 && rect.bottom >= 0) {
            setActiveLink(item.href);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setIsMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-black/95 py-3 backdrop-blur-lg" : "bg-black/80 py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="text-2xl font-bold neon-text text-foreground">
          EDC
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-white hover:text-neon-blue transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-neon-blue after:transition-all hover:after:w-full"
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground hover:text-neon-blue transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed inset-0 z-50 ${
              isScrolled ? "bg-black/95" : "bg-black/80"
            } backdrop-blur-lg h-screen overflow-y-auto shadow-lg`}
          >
            {/* Close button */}
            <div className="flex justify-end px-6 py-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-neon-blue transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Navigation links with animation */}
            <div className="flex flex-col items-center justify-center space-y-6 pb-20">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`text-xl font-medium text-foreground hover:text-neon-blue transition-colors ${
                    activeLink === item.href ? "text-neon-blue" : ""
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
