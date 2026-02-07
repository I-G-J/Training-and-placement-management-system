import { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const initialReports = [
  {
    id: 1,
    name: "GYAN JYOTU",
    email: "gyanjyoti@example.com",
    subject: "Inquiry about Placement Process",
    message: "I would like to know more about the upcoming placement drives for CSE students.",
    date: "2025-02-08",
    status: "New"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    email: "Rajesh@example.com",
    subject: "Technical Issue with Portal",
    message: "I am unable to upload my resume in the profile section. Please assist.",
    date: "2025-02-07",
    status: "In Progress"
  },
  {
    id: 3,
    name: "Laxman kumar",
    email: "robert.b@example.com",
    subject: "Feedback on Training Session",
    message: "The recent DSA workshop was very helpful. Thanks!",
    date: "2025-02-06",
    status: "Resolved"
  }
];

const AdminReports = () => {
  const [reports, setReports] = useState(initialReports);
  const [reportToDelete, setReportToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (reportToDelete) {
      setReports(reports.filter(r => r.id !== reportToDelete.id));
      setReportToDelete(null);
    }
  };

  const handleExport = () => {
    const headers = ["Name", "Email", "Subject", "Message", "Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...reports.map(r => 
        [r.name, r.email, r.subject, r.message, r.date, r.status].map(field => 
          `"${field}"`
        ).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "contact_reports.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Reports</h1>
          <p className="text-muted-foreground">View inquiries and messages from the contact form</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
            </Button>
        </div>
      </div>

      <Card className="border border-border mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search reports..." 
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

      <Card className="border border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="w-[40%]">Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex flex-col">
                        <span className="font-medium">{report.name}</span>
                        <span className="text-xs text-muted-foreground">{report.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.subject}</TableCell>
                  <TableCell>
                    <p className="truncate max-w-md text-muted-foreground" title={report.message}>
                        {report.message}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {report.date}
                  </TableCell>
                  <TableCell>
                    <Badge variant={report.status === "New" ? "default" : report.status === "Resolved" ? "secondary" : "outline"}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setReportToDelete(report)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={!!reportToDelete} onOpenChange={(open) => !open && setReportToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the report from
              "{reportToDelete?.name}" and remove it from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminReports;