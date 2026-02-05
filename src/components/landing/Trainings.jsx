 import { BookOpen, Clock, Users, ArrowRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const trainings = [
   {
     title: "Full Stack Web Development",
     description: "Master React, Node.js, and modern web technologies with hands-on projects.",
     duration: "8 Weeks",
     participants: 120,
     startDate: "Feb 10, 2025",
     category: "Technical"
   },
   {
     title: "Data Structures & Algorithms",
     description: "Intensive DSA preparation for top tech company interviews.",
     duration: "6 Weeks",
     participants: 200,
     startDate: "Feb 15, 2025",
     category: "Technical"
   },
   {
     title: "Business Communication Skills",
     description: "Enhance your professional communication for corporate success.",
     duration: "4 Weeks",
     participants: 80,
     startDate: "Feb 20, 2025",
     category: "Soft Skills"
   },
   {
     title: "Cloud Computing with AWS",
     description: "Get certified in AWS cloud services and architecture fundamentals.",
     duration: "5 Weeks",
     participants: 60,
     startDate: "Mar 1, 2025",
     category: "Technical"
   }
 ];
 
 const Trainings = () => {
   return (
     <section id="trainings" className="py-24 bg-background">
       <div className="container mx-auto px-6">
         <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
           <div>
             <span className="text-accent font-medium text-sm uppercase tracking-wider">Skill Development</span>
             <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
               Upcoming Trainings & Workshops
             </h2>
             <p className="text-muted-foreground text-lg max-w-2xl">
               Industry-aligned training programs to enhance your technical and soft skills.
             </p>
           </div>
           <Button variant="outline" className="mt-6 md:mt-0 gap-2 group">
             View All Programs
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Button>
         </div>
 
         <div className="grid md:grid-cols-2 gap-6">
           {trainings.map((training, index) => (
             <div 
               key={training.title}
               className="group glass-card rounded-2xl p-6 card-hover flex flex-col"
             >
               <div className="flex items-start justify-between mb-4">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                   <BookOpen className="w-6 h-6 text-primary" />
                 </div>
                 <span className="text-xs font-medium px-3 py-1 rounded-full bg-accent/10 text-accent">
                   {training.category}
                 </span>
               </div>
 
               <h3 className="text-xl font-semibold text-foreground mb-2">{training.title}</h3>
               <p className="text-muted-foreground text-sm mb-6 flex-grow">{training.description}</p>
 
               <div className="flex items-center gap-6 pt-4 border-t border-border">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <Clock className="w-4 h-4" />
                   <span>{training.duration}</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                   <Users className="w-4 h-4" />
                   <span>{training.participants} enrolled</span>
                 </div>
                 <span className="ml-auto text-sm font-medium text-accent">
                   Starts {training.startDate}
                 </span>
               </div>
             </div>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default Trainings;