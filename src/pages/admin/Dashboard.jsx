import { useState } from "react";
 import { 
   Users, 
   Building2, 
   Briefcase, 
   TrendingUp, 
   ArrowUpRight,
   ArrowDownRight,
  MoreHorizontal,
  Plus,
  X,
  Download
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
   const [isAddDriveOpen, setIsAddDriveOpen] = useState(false);
   const [drives, setDrives] = useState(upcomingDrives);
   const [newDrive, setNewDrive] = useState({
     company: "",
     photoUrl: "",
     date: "",
     cgpa: "",
     role: "",
     openings: "",
     location: "",
     jd: null
   });
   const [placements, setPlacements] = useState(recentPlacements);
   const [isAddPlacementOpen, setIsAddPlacementOpen] = useState(false);
   const [newPlacement, setNewPlacement] = useState({
     student: "",
     department: "",
     course: "",
     company: "",
     role: "",
     package: ""
   });
 
   const handleAddDrive = (e) => {
     e.preventDefault();
     setDrives([...drives, {
       company: newDrive.company,
       date: newDrive.date,
       roles: parseInt(newDrive.openings) || 0,
       registered: 0
     }]);
     setIsAddDriveOpen(false);
     setNewDrive({
       company: "",
       photoUrl: "",
       date: "",
       cgpa: "",
       role: "",
       openings: "",
       location: "",
       jd: null
     });
   };

   const handleAddPlacement = (e) => {
     e.preventDefault();
     setPlacements([{
       student: newPlacement.student,
       company: newPlacement.company,
       role: newPlacement.role,
       package: newPlacement.package,
       date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
       status: "Confirmed"
     }, ...placements]);
     setIsAddPlacementOpen(false);
     setNewPlacement({
       student: "",
       department: "",
       course: "",
       company: "",
       role: "",
       package: ""
     });
   };

   const handleExportPlacements = () => {
     const headers = ["Student", "Company", "Role", "Package", "Date", "Status"];
     const csvContent = [
       headers.join(","),
       ...placements.map(p => 
         [p.student, p.company, p.role, p.package, p.date, p.status].map(field => 
           `"${field}"`
         ).join(",")
       )
     ].join("\n");

     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
     const link = document.createElement("a");
     if (link.download !== undefined) {
       const url = URL.createObjectURL(blob);
       link.setAttribute("href", url);
       link.setAttribute("download", "placements.csv");
       link.style.visibility = "hidden";
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
     }
   };

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
             <div className="flex gap-2">
               <Button variant="outline" size="sm" className="gap-2" onClick={handleExportPlacements}>
                 <Download className="w-4 h-4" />
                 Export
               </Button>
               <Button variant="ghost" size="sm">View All</Button>
               <Button size="sm" className="gap-2" onClick={() => setIsAddPlacementOpen(true)}>
                 <Plus className="w-4 h-4" />
                 Add Placement
               </Button>
             </div>
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
                 {placements.map((placement, index) => (
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
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">View All</Button>
              <Button size="sm" className="gap-2" onClick={() => setIsAddDriveOpen(true)}>
                <Plus className="w-4 h-4" />
                Add Drive
              </Button>
            </div>
           </CardHeader>
           <CardContent className="space-y-4">
            {drives.map((drive, index) => (
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

      {isAddDriveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-4">
            <Card className="border border-border shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Add New Company Drive</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsAddDriveOpen(false)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleAddDrive} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input 
                      required
                      value={newDrive.company}
                      onChange={(e) => setNewDrive({...newDrive, company: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Logo URL</label>
                    <Input 
                      value={newDrive.photoUrl}
                      onChange={(e) => setNewDrive({...newDrive, photoUrl: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Arrival</label>
                      <Input 
                        required
                        type="date"
                        value={newDrive.date}
                        onChange={(e) => setNewDrive({...newDrive, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CGPA Required</label>
                      <Input 
                        required
                        value={newDrive.cgpa}
                        onChange={(e) => setNewDrive({...newDrive, cgpa: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Post / Role</label>
                      <Input 
                        required
                        value={newDrive.role}
                        onChange={(e) => setNewDrive({...newDrive, role: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">No. of Openings</label>
                      <Input 
                        required
                        type="number"
                        value={newDrive.openings}
                        onChange={(e) => setNewDrive({...newDrive, openings: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input 
                      required
                      value={newDrive.location}
                      onChange={(e) => setNewDrive({...newDrive, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Description (JD)</label>
                    <Input 
                      required
                      type="file"
                      onChange={(e) => setNewDrive({...newDrive, jd: e.target.files[0]})}
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddDriveOpen(false)}>Cancel</Button>
                    <Button type="submit">Add Drive</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {isAddPlacementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-4">
            <Card className="border border-border shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Add New Placement</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsAddPlacementOpen(false)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleAddPlacement} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Student Name</label>
                    <Input 
                      required
                      value={newPlacement.student}
                      onChange={(e) => setNewPlacement({...newPlacement, student: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input 
                        required
                        value={newPlacement.department}
                        onChange={(e) => setNewPlacement({...newPlacement, department: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Course</label>
                      <Input 
                        required
                        value={newPlacement.course}
                        onChange={(e) => setNewPlacement({...newPlacement, course: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input 
                      required
                      value={newPlacement.company}
                      onChange={(e) => setNewPlacement({...newPlacement, company: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <Input 
                        required
                        value={newPlacement.role}
                        onChange={(e) => setNewPlacement({...newPlacement, role: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Package</label>
                      <Input 
                        required
                        value={newPlacement.package}
                        onChange={(e) => setNewPlacement({...newPlacement, package: e.target.value})}
                        placeholder="e.g. ₹12 LPA"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddPlacementOpen(false)}>Cancel</Button>
                    <Button type="submit">Add Placement</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
     </div>
   );
 };
 
 export default AdminDashboard;