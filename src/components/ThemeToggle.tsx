
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 rounded-full glass p-2 hover:bg-accent/10"
    >
      {theme === "light" ? (
        <Moon className="h-6 w-6 text-neon-purple transition-all" />
      ) : (
        <Sun className="h-6 w-6 text-neon-blue transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
