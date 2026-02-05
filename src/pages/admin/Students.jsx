 import { 
   Search, 
   Filter, 
   Download, 
   Plus,
   MoreHorizontal,
   Mail,
   Phone
 } from "lucide-react";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
 import { Badge } from "@/components/ui/badge";
 import { Avatar, AvatarFallback } from "@/components/ui/avatar";
 
 const students = [
   { id: 1, name: "Rahul Sharma", email: "rahul.s@university.edu", phone: "+91 98765 43210", branch: "CSE", year: "Final", cgpa: "8.9", status: "Placed" },
   { id: 2, name: "Priya Patel", email: "priya.p@university.edu", phone: "+91 98765 43211", branch: "CSE", year: "Final", cgpa: "9.2", status: "Placed" },
   { id: 3, name: "Amit Kumar", email: "amit.k@university.edu", phone: "+91 98765 43212", branch: "ECE", year: "Final", cgpa: "8.5", status: "In Process" },
   { id: 4, name: "Sneha Reddy", email: "sneha.r@university.edu", phone: "+91 98765 43213", branch: "IT", year: "Final", cgpa: "8.7", status: "Placed" },
   { id: 5, name: "Vikram Singh", email: "vikram.s@university.edu", phone: "+91 98765 43214", branch: "CSE", year: "Final", cgpa: "9.0", status: "Placed" },
   { id: 6, name: "Neha Gupta", email: "neha.g@university.edu", phone: "+91 98765 43215", branch: "ME", year: "Final", cgpa: "8.3", status: "Eligible" },
   { id: 7, name: "Arjun Menon", email: "arjun.m@university.edu", phone: "+91 98765 43216", branch: "CSE", year: "Final", cgpa: "8.8", status: "In Process" },
   { id: 8, name: "Kavita Nair", email: "kavita.n@university.edu", phone: "+91 98765 43217", branch: "ECE", year: "Final", cgpa: "9.1", status: "Placed" },
 ];
 
 const getStatusVariant = (status) => {
   switch (status) {
     case "Placed": return "default";
     case "In Process": return "secondary";
     case "Eligible": return "outline";
     default: return "secondary";
   }
 };
 
 const Students = () => {
   return (
     <div className="p-6 lg:p-8">
       {/* Header */}
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
         <div>
           <h1 className="text-2xl font-bold text-foreground">Students</h1>
           <p className="text-muted-foreground">Manage student records and placement status</p>
         </div>
         <div className="flex items-center gap-3">
           <Button variant="outline" className="gap-2">
             <Download className="w-4 h-4" />
             Export
           </Button>
           <Button className="gap-2">
             <Plus className="w-4 h-4" />
             Add Student
           </Button>
         </div>
       </div>
 
       {/* Filters */}
       <Card className="border border-border mb-6">
         <CardContent className="p-4">
           <div className="flex flex-col md:flex-row gap-4">
             <div className="relative flex-1">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input 
                 placeholder="Search students..." 
                 className="pl-10 h-10"
               />
             </div>
             <Button variant="outline" className="gap-2">
               <Filter className="w-4 h-4" />
               Filters
             </Button>
           </div>
         </CardContent>
       </Card>
 
       {/* Table */}
       <Card className="border border-border">
         <CardContent className="p-0">
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Student</TableHead>
                 <TableHead>Contact</TableHead>
                 <TableHead>Branch</TableHead>
                 <TableHead>Year</TableHead>
                 <TableHead>CGPA</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead className="w-10"></TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {students.map((student) => (
                 <TableRow key={student.id}>
                   <TableCell>
                     <div className="flex items-center gap-3">
                       <Avatar className="h-9 w-9">
                         <AvatarFallback className="bg-primary/10 text-primary text-sm">
                           {student.name.split(' ').map(n => n[0]).join('')}
                         </AvatarFallback>
                       </Avatar>
                       <div>
                         <div className="font-medium">{student.name}</div>
                         <div className="text-sm text-muted-foreground">{student.email}</div>
                       </div>
                     </div>
                   </TableCell>
                   <TableCell>
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <Phone className="w-3 h-3" />
                       {student.phone}
                     </div>
                   </TableCell>
                   <TableCell>{student.branch}</TableCell>
                   <TableCell>{student.year}</TableCell>
                   <TableCell className="font-semibold">{student.cgpa}</TableCell>
                   <TableCell>
                     <Badge variant={getStatusVariant(student.status)}>
                       {student.status}
                     </Badge>
                   </TableCell>
                   <TableCell>
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                       <MoreHorizontal className="w-4 h-4" />
                     </Button>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </CardContent>
       </Card>
     </div>
   );
 };
 
 export default Students;