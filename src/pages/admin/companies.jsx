import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  MapPin, 
  Calendar, 
  X,
  Pencil,
  Trash2,
  Users,
  Download
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialCompanies = [
  { 
    id: 1, 
    name: "Microsoft", 
    logo: "M", 
    role: "Software Engineer", 
    date: "2025-02-15", 
    location: "Bangalore", 
    openings: 25, 
    cgpa: "8.5",
    status: "Upcoming",
  },
  { 
    id: 2, 
    name: "Google", 
    logo: "G", 
    role: "Associate Product Manager", 
    date: "2025-02-20", 
    location: "Hyderabad", 
    openings: 15, 
    cgpa: "9.0",
    status: "Upcoming",
  },
  { 
    id: 3, 
    name: "Amazon", 
    logo: "A", 
    role: "SDE I", 
    date: "2025-02-25", 
    location: "Multiple", 
    openings: 40, 
    cgpa: "8.0",
    status: "Upcoming",
  },
  { 
    id: 4, 
    name: "Deloitte", 
    logo: "D", 
    role: "Business Analyst", 
    date: "2025-03-01", 
    location: "Mumbai", 
    openings: 30, 
    cgpa: "7.5",
    status: "Registrations Open",
  }
];

const mockApplicants = [
  { id: 1, name: "Rahul Sharma", email: "rahul.s@university.edu", cgpa: "8.9", branch: "CSE", status: "Pending" },
  { id: 2, name: "Priya Patel", email: "priya.p@university.edu", cgpa: "9.2", branch: "CSE", status: "Shortlisted" },
  { id: 3, name: "Amit Kumar", email: "amit.k@university.edu", cgpa: "8.5", branch: "ECE", status: "Rejected" },
  { id: 4, name: "Sneha Reddy", email: "sneha.r@university.edu", cgpa: "8.7", branch: "IT", status: "Pending" },
  { id: 5, name: "Vikram Singh", email: "vikram.s@university.edu", cgpa: "9.0", branch: "CSE", status: "Shortlisted" },
];

const AdminCompanies = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [viewingApplicants, setViewingApplicants] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    photoUrl: "",
    date: "",
    cgpa: "",
    role: "",
    openings: "",
    location: "",
    jd: null
  });

  const handleSaveCompany = (e) => {
    e.preventDefault();
    if (editingId) {
      setCompanies(companies.map(c => c.id === editingId ? {
        ...c,
        name: formData.name,
        logo: formData.name.charAt(0),
        role: formData.role,
        date: formData.date,
        location: formData.location,
        openings: parseInt(formData.openings) || 0,
        cgpa: formData.cgpa,
      } : c));
    } else {
      const company = {
        id: Date.now(),
        name: formData.name,
        logo: formData.name.charAt(0),
        role: formData.role,
        date: formData.date,
        location: formData.location,
        openings: parseInt(formData.openings) || 0,
        cgpa: formData.cgpa,
        status: "Upcoming",
      };
      setCompanies([...companies, company]);
    }
    setIsAddOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      photoUrl: "",
      date: "",
      cgpa: "",
      role: "",
      openings: "",
      location: "",
      jd: null
    });
  };

  const handleEditClick = (company) => {
    setFormData({
      name: company.name,
      photoUrl: "",
      date: company.date,
      cgpa: company.cgpa,
      role: company.role,
      openings: company.openings,
      location: company.location,
      jd: null
    });
    setEditingId(company.id);
    setIsAddOpen(true);
  };

  const handleAddNew = () => {
    setFormData({
      name: "",
      photoUrl: "",
      date: "",
      cgpa: "",
      role: "",
      openings: "",
      location: "",
      jd: null
    });
    setEditingId(null);
    setIsAddOpen(true);
  };

  const handleConfirmDelete = () => {
    if (companyToDelete) {
      setCompanies(companies.filter(c => c.id !== companyToDelete.id));
      setCompanyToDelete(null);
    }
  };

  const handleExportApplicants = () => {
    const headers = ["Student Name", "Email", "CGPA", "Branch", "Status"];
    const csvContent = [
      headers.join(","),
      ...mockApplicants.map(student => 
        [student.name, student.email, student.cgpa, student.branch, student.status].map(field => 
          `"${field}"`
        ).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `applicants_${viewingApplicants?.name || 'list'}.csv`);
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
          <h1 className="text-2xl font-bold text-foreground">Companies</h1>
          <p className="text-muted-foreground">Manage recruitment drives and company details</p>
        </div>
        <Button className="gap-2" onClick={handleAddNew}>
          <Plus className="w-4 h-4" />
          Add Company
        </Button>
      </div>

      <Card className="border border-border mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search companies..." 
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
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Criteria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {company.logo}
                      </div>
                      <div>
                        <div className="font-medium">{company.name}</div>
                        <div className="text-xs text-muted-foreground">{company.openings} Openings</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{company.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {company.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {company.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{company.cgpa} CGPA</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={company.status === "Upcoming" ? "secondary" : "default"}>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setViewingApplicants(company)}>
                          <Users className="w-4 h-4 mr-2" />
                          View Applicants
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(company)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setCompanyToDelete(company)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-4">
            <Card className="border border-border shadow-lg max-h-[90vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{editingId ? 'Edit Company' : 'Add New Company'}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsAddOpen(false)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSaveCompany} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Logo URL</label>
                    <Input 
                      value={formData.photoUrl}
                      onChange={(e) => setFormData({...formData, photoUrl: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date of Arrival</label>
                      <Input 
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">CGPA Required</label>
                      <Input 
                        required
                        value={formData.cgpa}
                        onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Post / Role</label>
                      <Input 
                        required
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">No. of Openings</label>
                      <Input 
                        required
                        type="number"
                        value={formData.openings}
                        onChange={(e) => setFormData({...formData, openings: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <Input 
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Description (JD)</label>
                    <Input 
                      required
                      type="file"
                      onChange={(e) => setFormData({...formData, jd: e.target.files[0]})}
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingId ? 'Save Changes' : 'Add Company'}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <AlertDialog open={!!companyToDelete} onOpenChange={(open) => !open && setCompanyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the company
              "{companyToDelete?.name}" and remove it from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={!!viewingApplicants} onOpenChange={(open) => !open && setViewingApplicants(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between pr-8">
              <DialogTitle>Applicants for {viewingApplicants?.name}</DialogTitle>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleExportApplicants}>
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </div>
          </DialogHeader>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApplicants.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.cgpa}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "Shortlisted" ? "default" : student.status === "Rejected" ? "destructive" : "secondary"}>
                        {student.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCompanies;