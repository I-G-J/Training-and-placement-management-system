 import { TrendingUp, Users, Building2, Trophy, Briefcase, GraduationCap } from "lucide-react";
 
 const stats = [
   {
     icon: Users,
     value: "2,500+",
     label: "Students Trained",
     description: "Industry-ready graduates"
   },
   {
     icon: Building2,
     value: "150+",
     label: "Partner Companies",
     description: "Fortune 500 to startups"
   },
   {
     icon: TrendingUp,
     value: "94%",
     label: "Placement Rate",
     description: "Consistently high success"
   },
   {
     icon: Trophy,
     value: "₹24 LPA",
     label: "Highest Package",
     description: "This academic year"
   },
   {
     icon: Briefcase,
     value: "₹8.5 LPA",
     label: "Average Package",
     description: "Competitive compensation"
   },
   {
     icon: GraduationCap,
     value: "50+",
     label: "Training Programs",
     description: "Technical & soft skills"
   }
 ];
 
 const Highlights = () => {
   return (
     <section id="highlights" className="py-24 bg-hero relative overflow-hidden">
       {/* Background pattern */}
       <div className="absolute inset-0 opacity-5">
         <div className="absolute inset-0" style={{
           backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
           backgroundSize: '32px 32px'
         }} />
       </div>
 
       <div className="container mx-auto px-6 relative z-10">
         <div className="max-w-3xl mx-auto text-center mb-16">
           <span className="text-accent font-medium text-sm uppercase tracking-wider">Our Impact</span>
           <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mt-3 mb-4">
             Placement Highlights
           </h2>
           <p className="text-primary-foreground/70 text-lg">
             Numbers that reflect our commitment to student success and industry partnerships.
           </p>
         </div>
 
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
           {stats.map((stat, index) => (
             <div 
               key={stat.label}
               className="text-center p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/10 transition-colors"
             >
               <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                 <stat.icon className="w-6 h-6 text-accent" />
               </div>
               <div className="text-2xl md:text-3xl font-bold text-primary-foreground mb-1">
                 {stat.value}
               </div>
               <div className="text-sm font-medium text-primary-foreground/80 mb-1">
                 {stat.label}
               </div>
               <div className="text-xs text-primary-foreground/50">
                 {stat.description}
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default Highlights;