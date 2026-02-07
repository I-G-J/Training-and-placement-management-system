 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import { ClerkProvider } from "@clerk/clerk-react";
 import Index from "./pages/Index";
 import ProtectedRoute from "./components/ProtectedRoute";
 import NotFound from "./pages/NotFound";
 import AdminLogin from "./pages/AdminLogin";
 import Login from "./components/landing/Login";
 import Signup from "./components/landing/Signup";
 import AdminLayout from "./components/admin/AdminLayout";
 import StudentDashboard from "./pages/student/Dashboard";
 import AdminDashboard from "./pages/admin/Dashboard";
 import Students from "./pages/admin/Students";
 import AdminCompanies from "./pages/admin/Companies";
 import AdminPlacements from "./pages/admin/Placements";
 import AdminTrainings from "./pages/admin/Trainings";
 import AdminReports from "./pages/admin/Reports";
 import { 
   AdminSettings 
 } from "./pages/admin/ComingSoon";
 
 const queryClient = new QueryClient();
 const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY?.trim();
 
 if (!PUBLISHABLE_KEY) {
   throw new Error("Missing Publishable Key");
 }
 
 const App = () => (
   <ClerkProvider 
     publishableKey={PUBLISHABLE_KEY}
     appearance={{
       elements: {
         formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90",
         footerActionLink: "text-primary hover:text-primary/90",
         card: "bg-card border border-border shadow-sm",
         headerTitle: "text-foreground",
         headerSubtitle: "text-muted-foreground",
         socialButtonsBlockButton: "bg-background border-border text-foreground hover:bg-muted",
         socialButtonsBlockButtonText: "text-foreground",
         formFieldLabel: "text-foreground",
         formFieldInput: "bg-background border-input text-foreground",
         footer: "bg-background",
       }
     }}
   >
     <QueryClientProvider client={queryClient}>
     <TooltipProvider>
       <Toaster />
       <Sonner />
       <BrowserRouter>
         <Routes>
           {/* Public Routes */}
           <Route path="/" element={<Index />} />
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/admin" element={<AdminLogin />} />
           
           {/* Protected Student Route */}
           <Route element={<ProtectedRoute />}>
             <Route path="/student/dashboard" element={<StudentDashboard />} />
           </Route>
           
           {/* Admin Dashboard Routes */}
           <Route path="/admin" element={<AdminLayout />}>
             <Route path="dashboard" element={<AdminDashboard />} />
             <Route path="students" element={<Students />} />
             <Route path="companies" element={<AdminCompanies />} />
             <Route path="placements" element={<AdminPlacements />} />
             <Route path="trainings" element={<AdminTrainings />} />
             <Route path="reports" element={<AdminReports />} />
             <Route path="settings" element={<AdminSettings />} />
           </Route>
           
           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
           <Route path="*" element={<NotFound />} />
         </Routes>
       </BrowserRouter>
     </TooltipProvider>
     </QueryClientProvider>
   </ClerkProvider>
 );
 
 export default App;