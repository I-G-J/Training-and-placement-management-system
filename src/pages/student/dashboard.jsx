import { useUser } from "@clerk/clerk-react";
import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  FileText,
  Search,
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/landing/Header";

const stats = [
  {
    title: "Applied Jobs",
    value: "12",
    icon: Briefcase,
    description: "In the last 30 days",
  },
  {
    title: "Upcoming Interviews",
    value: "3",
    icon: Calendar,
    description: "Next: Google (Feb 20)",
  },
  {
    title: "Offers Received",
    value: "1",
    icon: CheckCircle,
    description: "Action required",
  },
  {
    title: "Profile Score",
    value: "85%",
    icon: User,
    description: "Add projects to improve",
  }
];

const upcomingDrives = [
  { company: "Microsoft", role: "Software Engineer", date: "Feb 15, 2025", type: "On-Campus", status: "Eligible" },
  { company: "Amazon", role: "SDE I", date: "Feb 25, 2025", type: "On-Campus", status: "Applied" },
  { company: "Deloitte", role: "Business Analyst", date: "Mar 1, 2025", type: "On-Campus", status: "Not Eligible" },
];

const recentApplications = [
  { company: "Google", role: "Associate Product Manager", date: "Feb 10, 2025", status: "Shortlisted" },
  { company: "Flipkart", role: "SDE", date: "Feb 5, 2025", status: "Rejected" },
  { company: "TCS", role: "System Engineer", date: "Jan 28, 2025", status: "Pending" },
];

const StudentDashboard = () => {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Rahul! Here's your placement overview.</p>
            </div>
            <Button className="gap-2">
                <Search className="w-4 h-4" />
                Browse Jobs
            </Button>
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
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Drives */}
                <Card className="border border-border">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl">Upcoming Drives</CardTitle>
                        <Button variant="ghost" size="sm">View All</Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcomingDrives.map((drive, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/50 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center border border-border shrink-0">
                                        <span className="font-bold text-lg">{drive.company.charAt(0)}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{drive.company}</h3>
                                        <p className="text-sm text-muted-foreground">{drive.role} • {drive.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 self-end sm:self-auto">
                                    <Badge variant={drive.status === "Eligible" ? "default" : drive.status === "Applied" ? "secondary" : "outline"}>
                                        {drive.status}
                                    </Badge>
                                    {drive.status === "Eligible" && (
                                        <Button size="sm">Apply</Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Recent Applications */}
                 <Card className="border border-border">
                    <CardHeader>
                        <CardTitle className="text-xl">Recent Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentApplications.map((app, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                                    <div>
                                        <p className="font-medium">{app.company}</p>
                                        <p className="text-sm text-muted-foreground">{app.role}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant={app.status === "Shortlisted" ? "default" : app.status === "Rejected" ? "destructive" : "secondary"} className={app.status === "Shortlisted" ? "bg-success text-success-foreground hover:bg-success/90" : ""}>
                                            {app.status}
                                        </Badge>
                                        <p className="text-xs text-muted-foreground mt-1">Applied on {app.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
                {/* Profile Summary */}
                <Card className="border border-border">
                    <CardHeader>
                        <CardTitle className="text-xl">My Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                            <User className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg">Rahul Sharma</h3>
                        <p className="text-sm text-muted-foreground mb-4">Computer Science • Final Year</p>
                        <div className="grid grid-cols-2 gap-4 mb-6 text-left">
                            <div className="p-3 rounded-lg bg-secondary/30">
                                <p className="text-xs text-muted-foreground">CGPA</p>
                                <p className="font-bold">8.9</p>
                            </div>
                            <div className="p-3 rounded-lg bg-secondary/30">
                                <p className="text-xs text-muted-foreground">Attendance</p>
                                <p className="font-bold">92%</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full">Edit Profile</Button>
                    </CardContent>
                </Card>

                {/* Recommended Trainings */}
                <Card className="border border-border">
                    <CardHeader>
                        <CardTitle className="text-xl">Recommended</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <div className="flex items-start gap-3">
                                <BookOpen className="w-5 h-5 text-accent mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Advanced DSA</p>
                                    <p className="text-xs text-muted-foreground">Starts Feb 20</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer">
                            <div className="flex items-start gap-3">
                                <FileText className="w-5 h-5 text-accent mt-0.5" />
                                <div>
                                    <p className="font-medium text-sm">Resume Workshop</p>
                                    <p className="text-xs text-muted-foreground">Tomorrow, 2 PM</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;