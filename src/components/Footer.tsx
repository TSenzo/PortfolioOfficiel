
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-6 glass border-t border-border">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <span className="neon-text font-bold text-xl">EDC</span>
          </div>
          
          <div className="text-center md:text-left text-sm text-muted-foreground">
            <p>&copy; {currentYear} Enzo Dal Corso. Tous droits réservés.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <a href="#home" className="text-sm hover:text-neon-blue transition-colors">
              Retour en haut ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
