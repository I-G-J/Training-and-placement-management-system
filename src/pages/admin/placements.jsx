import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download,
  X,
  Edit,
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

const initialPlacements = [
  { id: 1, student: "Rahul Sharma", department: "CSE", course: "B.Tech", company: "Microsoft", role: "SDE", package: "₹18 LPA", date: "Feb 4, 2025", status: "Confirmed" },
  { id: 2, student: "Priya Patel", department: "CSE", course: "B.Tech", company: "Google", role: "APM", package: "₹22 LPA", date: "Feb 3, 2025", status: "Confirmed" },
  { id: 3, student: "Amit Kumar", department: "ECE", course: "B.Tech", company: "Amazon", role: "SDE I", package: "₹16 LPA", date: "Feb 2, 2025", status: "Pending" },
  { id: 4, student: "Sneha Reddy", department: "IT", course: "B.Tech", company: "Deloitte", role: "Analyst", package: "₹9 LPA", date: "Feb 1, 2025", status: "Confirmed" },
  { id: 5, student: "Vikram Singh", department: "CSE", course: "M.Tech", company: "Adobe", role: "CS", package: "₹20 LPA", date: "Jan 31, 2025", status: "Confirmed" },
];

const AdminPlacements = () => {
  const [placements, setPlacements] = useState(initialPlacements);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [placementToDelete, setPlacementToDelete] = useState(null);
  const [newPlacement, setNewPlacement] = useState({
    student: "",
    department: "",
    course: "",
    company: "",
    role: "",
    package: "",
    status: "Confirmed"
  });

  const handleSavePlacement = (e) => {
    e.preventDefault();
    if (editingId) {
      setPlacements(placements.map(p => p.id === editingId ? { ...p, ...newPlacement } : p));
    } else {
      const placement = {
        id: placements.length + 1,
        ...newPlacement,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      setPlacements([placement, ...placements]);
    }
    setIsAddOpen(false);
    setEditingId(null);
    setNewPlacement({
      student: "",
      department: "",
      course: "",
      company: "",
      role: "",
      package: "",
      status: "Confirmed"
    });
  };

  const handleEdit = (placement) => {
    setNewPlacement({
      student: placement.student,
      department: placement.department,
      course: placement.course,
      company: placement.company,
      role: placement.role,
      package: placement.package,
      status: placement.status
    });
    setEditingId(placement.id);
    setIsAddOpen(true);
  };

  const handleAddNew = () => {
    setNewPlacement({
      student: "",
      department: "",
      course: "",
      company: "",
      role: "",
      package: "",
      status: "Confirmed"
    });
    setEditingId(null);
    setIsAddOpen(true);
  };

  const handleConfirmDelete = () => {
    if (placementToDelete) {
      setPlacements(placements.filter(p => p.id !== placementToDelete.id));
      setPlacementToDelete(null);
    }
  };

  const handleExport = () => {
     const headers = ["Student", "Department", "Course", "Company", "Role", "Package", "Date", "Status"];
     const csvContent = [
       headers.join(","),
       ...placements.map(p => 
         [p.student, p.department, p.course, p.company, p.role, p.package, p.date, p.status].map(field => 
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Placements</h1>
          <p className="text-muted-foreground">Manage student placements and offers</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
            </Button>
            <Button className="gap-2" onClick={handleAddNew}>
            <Plus className="w-4 h-4" />
            Add Placement
            </Button>
        </div>
      </div>

      <Card className="border border-border mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search placements..." 
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
                <TableHead>Student</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {placements.map((placement) => (
                <TableRow key={placement.id}>
                  <TableCell className="font-medium">{placement.student}</TableCell>
                  <TableCell>{placement.department}</TableCell>
                  <TableCell>{placement.company}</TableCell>
                  <TableCell>{placement.role}</TableCell>
                  <TableCell className="font-semibold text-accent">{placement.package}</TableCell>
                  <TableCell>{placement.date}</TableCell>
                  <TableCell>
                    <Badge variant={placement.status === "Confirmed" ? "default" : "secondary"}>
                      {placement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(placement)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => setPlacementToDelete(placement)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
            <Card className="border border-border shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{editingId ? 'Edit Placement' : 'Add New Placement'}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsAddOpen(false)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSavePlacement} className="space-y-4">
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
                    <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingId ? 'Save Changes' : 'Add Placement'}</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <AlertDialog open={!!placementToDelete} onOpenChange={(open) => !open && setPlacementToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the placement record for
              "{placementToDelete?.student}" and remove it from the list.
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

export default AdminPlacements;