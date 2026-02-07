 import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
 
 const Footer = () => {
   return (
     <footer className="bg-card border-t border-border py-16">
       <div className="container mx-auto px-6">
         <div className="grid md:grid-cols-4 gap-12">
           {/* Brand */}
           <div className="md:col-span-2">
             <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                 <GraduationCap className="w-5 h-5 text-primary-foreground" />
               </div>
               <div>
                 <span className="font-semibold text-foreground">RKDF University Training & Placement Cell</span>
               </div>
             </div>
             <p className="text-muted-foreground text-sm max-w-md mb-6">
               Dedicated to bridging the gap between academia and industry, 
               we prepare students for successful careers through comprehensive 
               training and strategic placement initiatives.
             </p>
             <div className="space-y-2">
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                 <MapPin className="w-4 h-4" />
                 <span>RKDF University Campus, Academic Block B</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                 <Mail className="w-4 h-4" />
                 <span>placement@RKDFuniversity.edu</span>
               </div>
               <div className="flex items-center gap-2 text-sm text-muted-foreground">
                 <Phone className="w-4 h-4" />
                 <span>+91 123 456 7890</span>
               </div>
             </div>
           </div>
 
           {/* Quick Links */}
           <div>
             <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
             <ul className="space-y-2">
               <li><a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
               <li><a href="#companies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Companies</a></li>
               <li><a href="#trainings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Trainings</a></li>
               <li><a href="#highlights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Highlights</a></li>
               <li><a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
             </ul>
           </div>
 
           {/* For Students */}
           <div>
             <h4 className="font-semibold text-foreground mb-4">For Students</h4>
             <ul className="space-y-2">
               <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Student Portal</a></li>
               <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Placement Guidelines</a></li>
               <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Resources</a></li>
               <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQs</a></li>
             </ul>
           </div>
         </div>
 
         <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-sm text-muted-foreground">
             © 2025 Training & Placement Cell. All rights reserved.
           </p>
           <p className="text-sm text-muted-foreground">
             Made for the success of students of RKDFuniversity.
           </p>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;