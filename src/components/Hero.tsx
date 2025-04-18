
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden section-padding"
    >
      <div className={`text-center transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="block mb-2 text-foreground">Je suis</span>
          <span className="neon-text animate-pulse-neon">Enzo Dal Corso</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-muted-foreground">
        Coder le présent, imaginer le futur.
        </p>
        
        <div className="cyber-card w-fit mx-auto p-0.5">
          <a 
            href="#about" 
            className="flex items-center justify-center space-x-2 bg-background px-6 py-3 rounded-lg hover:bg-transparent transition-colors"
          >
            <span>Découvrir</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-transparent to-background/80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[100px] -z-20" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-neon-purple/10 rounded-full blur-[80px] -z-20" />
    </section>
  );
}
