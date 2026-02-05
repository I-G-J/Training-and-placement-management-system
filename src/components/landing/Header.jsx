 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { GraduationCap, LogIn } from "lucide-react";
 
 const Header = () => {
   return (
     <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
       <div className="container mx-auto px-6 h-16 flex items-center justify-between">
         <Link to="/" className="flex items-center gap-3 group">
           <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-card transition-shadow duration-300">
             <GraduationCap className="w-5 h-5 text-primary-foreground" />
           </div>
           <div className="flex flex-col">
             <span className="font-semibold text-foreground leading-tight">T&P Cell</span>
             <span className="text-xs text-muted-foreground">University Portal</span>
           </div>
         </Link>
 
         <nav className="hidden md:flex items-center gap-8">
           <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
             About
           </a>
           <a href="#companies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
             Companies
           </a>
           <a href="#trainings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
             Trainings
           </a>
           <a href="#highlights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
             Highlights
           </a>
         </nav>
 
         <Link to="/admin">
           <Button variant="outline" size="sm" className="gap-2">
             <LogIn className="w-4 h-4" />
             Admin Login
           </Button>
         </Link>
       </div>
     </header>
   );
 };
 
 export default Header;