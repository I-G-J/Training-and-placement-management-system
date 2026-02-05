 import { 
   Users, 
   Building2, 
   Briefcase, 
   TrendingUp, 
   ArrowUpRight,
   ArrowDownRight,
   MoreHorizontal
 } from "lucide-react";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
 } from "@/components/ui/table";
 import { Badge } from "@/components/ui/badge";
 
 const stats = [
   {
     title: "Total Students",
     value: "2,847",
     change: "+12%",
     trend: "up",
     icon: Users,
     description: "vs last semester"
   },
   {
     title: "Active Companies",
     value: "156",
     change: "+8%",
     trend: "up",
     icon: Building2,
     description: "recruiting now"
   },
   {
     title: "Placements",
     value: "1,423",
     change: "+23%",
     trend: "up",
     icon: Briefcase,
     description: "this academic year"
   },
   {
     title: "Avg. Package",
     value: "₹8.5 LPA",
     change: "+15%",
     trend: "up",
     icon: TrendingUp,
     description: "industry average"
   }
 ];
 
 const recentPlacements = [
   { student: "Rahul Sharma", company: "Microsoft", role: "SDE", package: "₹18 LPA", date: "Feb 4, 2025", status: "Confirmed" },
   { student: "Priya Patel", company: "Google", role: "APM", package: "₹22 LPA", date: "Feb 3, 2025", status: "Confirmed" },
   { student: "Amit Kumar", company: "Amazon", role: "SDE I", package: "₹16 LPA", date: "Feb 2, 2025", status: "Pending" },
   { student: "Sneha Reddy", company: "Deloitte", role: "Analyst", package: "₹9 LPA", date: "Feb 1, 2025", status: "Confirmed" },
   { student: "Vikram Singh", company: "Adobe", role: "CS", package: "₹20 LPA", date: "Jan 31, 2025", status: "Confirmed" },
 ];
 
 const upcomingDrives = [
   { company: "Flipkart", date: "Feb 10, 2025", roles: 35, registered: 280 },
   { company: "Infosys", date: "Feb 12, 2025", roles: 50, registered: 420 },
   { company: "TCS", date: "Feb 15, 2025", roles: 100, registered: 650 },
 ];
 
 const AdminDashboard = () => {
   return (
     <div className="p-6 lg:p-8">
       {/* Header */}
       <div className="mb-8">
         <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
         <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
       </div>
 
       {/* Stats Grid */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         {stats.map((stat) => (
           <Card key={stat.title} className="border border-border">
             <CardContent className="p-6">
               <div className="flex items-start justify-between">
                 <div>
                   <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                   <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                   <div className="flex items-center gap-1 mt-1">
                     {stat.trend === "up" ? (
                       <ArrowUpRight className="w-4 h-4 text-success" />
                     ) : (
                       <ArrowDownRight className="w-4 h-4 text-destructive" />
                     )}
                     <span className={stat.trend === "up" ? "text-success text-sm" : "text-destructive text-sm"}>
                       {stat.change}
                     </span>
                     <span className="text-muted-foreground text-sm">{stat.description}</span>
                   </div>
                 </div>
                 <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                   <stat.icon className="w-5 h-5 text-primary" />
                 </div>
               </div>
             </CardContent>
           </Card>
         ))}
       </div>
 
       {/* Main Content Grid */}
       <div className="grid lg:grid-cols-3 gap-6">
         {/* Recent Placements Table */}
         <Card className="lg:col-span-2 border border-border">
           <CardHeader className="flex flex-row items-center justify-between">
             <CardTitle className="text-lg font-semibold">Recent Placements</CardTitle>
             <Button variant="ghost" size="sm">View All</Button>
           </CardHeader>
           <CardContent>
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>Student</TableHead>
                   <TableHead>Company</TableHead>
                   <TableHead>Role</TableHead>
                   <TableHead>Package</TableHead>
                   <TableHead>Status</TableHead>
                   <TableHead className="w-10"></TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {recentPlacements.map((placement, index) => (
                   <TableRow key={index}>
                     <TableCell className="font-medium">{placement.student}</TableCell>
                     <TableCell>{placement.company}</TableCell>
                     <TableCell>{placement.role}</TableCell>
                     <TableCell className="font-semibold text-accent">{placement.package}</TableCell>
                     <TableCell>
                       <Badge variant={placement.status === "Confirmed" ? "default" : "secondary"}>
                         {placement.status}
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
 
         {/* Upcoming Drives */}
         <Card className="border border-border">
           <CardHeader className="flex flex-row items-center justify-between">
             <CardTitle className="text-lg font-semibold">Upcoming Drives</CardTitle>
             <Button variant="ghost" size="sm">View All</Button>
           </CardHeader>
           <CardContent className="space-y-4">
             {upcomingDrives.map((drive, index) => (
               <div 
                 key={index} 
                 className="p-4 rounded-lg bg-secondary/50 border border-border"
               >
                 <div className="flex items-center justify-between mb-2">
                   <span className="font-semibold text-foreground">{drive.company}</span>
                   <span className="text-sm text-muted-foreground">{drive.date}</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-muted-foreground">{drive.roles} openings</span>
                   <span className="text-accent font-medium">{drive.registered} registered</span>
                 </div>
               </div>
             ))}
           </CardContent>
         </Card>
       </div>
     </div>
   );
 };
 
 export default AdminDashboard;