
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Terminal, MonitorSmartphone } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useHackingMode } from "@/hooks/useHackingMode";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { hackingMode, toggleHackingMode } = useHackingMode();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {/* Theme toggle button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme}
        className="rounded-full glass p-0 hover:bg-accent/10 overflow-hidden group"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <Sun 
            className={cn(
              "absolute h-6 w-6 transition-all duration-500 rotate-0 scale-100",
              theme === "dark" ? "rotate-90 scale-0" : "text-neon-blue"
            )} 
          />
          <Moon 
            className={cn(
              "absolute h-6 w-6 transition-all duration-500 rotate-90 scale-0",
              theme === "dark" ? "rotate-0 scale-100 text-neon-purple" : ""
            )} 
          />
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      {/* Hacking mode toggle button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleHackingMode}
        className={cn(
          "rounded-full glass p-0 overflow-hidden group",
          hackingMode 
            ? "bg-destructive/20 hover:bg-destructive/30 neon-pulse" 
            : "hover:bg-accent/10"
        )}
        aria-label={`${hackingMode ? 'Disable' : 'Enable'} hacking mode`}
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <Terminal 
            className={cn(
              "absolute h-6 w-6 transition-all duration-500 rotate-0 scale-100",
              hackingMode ? "rotate-0 scale-0" : "text-neon-blue dark:text-neon-purple"
            )} 
          />
          <MonitorSmartphone 
            className={cn(
              "absolute h-6 w-6 transition-all duration-500 rotate-90 scale-0",
              hackingMode ? "rotate-0 scale-100 text-destructive" : ""
            )} 
          />
        </div>
        <span className="sr-only">Toggle hacking mode</span>
      </Button>
    </div>
  );
}
