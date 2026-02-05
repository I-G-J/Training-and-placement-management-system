 import { Toaster } from "@/components/ui/toaster";
 import { Toaster as Sonner } from "@/components/ui/sonner";
 import { TooltipProvider } from "@/components/ui/tooltip";
 import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import Index from "./pages/Index";
 import NotFound from "./pages/NotFound";
 import AdminLogin from "./pages/AdminLogin";
 import Login from "./components/landing/Login";
 import Signup from "./components/landing/Signup";
 import AdminLayout from "./components/admin/AdminLayout";
 import AdminDashboard from "./pages/admin/Dashboard";
 import Students from "./pages/admin/Students";
 import { 
   AdminCompanies, 
   AdminPlacements, 
   AdminTrainings, 
   AdminReports, 
   AdminSettings 
 } from "./pages/admin/ComingSoon";
 
 const queryClient = new QueryClient();
 
 const App = () => (
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
 );
 
 export default App;