 import Header from "@/components/landing/Header";
 import Hero from "@/components/landing/Hero";
 import About from "@/components/landing/About";
 import Companies from "@/components/landing/Companies";
 import Trainings from "@/components/landing/Trainings";
 import Highlights from "@/components/landing/Highlights";
 import Contact from "@/components/landing/Contact";
 import Footer from "@/components/landing/Footer";
 
 const Index = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       <main>
         <Hero />
         <About />
         <Companies />
         <Trainings />
         <Highlights />
         <Contact />
       </main>
       <Footer />
     </div>
   );
 };
 
 export default Index;