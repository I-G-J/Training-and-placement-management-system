import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Download,
  X,
  BookOpen,
  Calendar,
  Edit
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const initialTrainings = [
  { id: 1, title: "Full Stack Web Development", department: "CSE", instructor: "TechEdu", date: "2025-02-10", duration: "8 Weeks", status: "Upcoming" },
  { id: 2, title: "Data Structures & Algorithms", department: "All", instructor: "CodeMaster", date: "2025-02-15", duration: "6 Weeks", status: "Upcoming" },
  { id: 3, title: "VLSI Design", department: "ECE", instructor: "ChipLogic", date: "2025-02-20", duration: "4 Weeks", status: "Upcoming" },
];

const AdminTrainings = () => {
  const [trainings, setTrainings] = useState(initialTrainings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    instructor: "",
    date: "",
    duration: "",
    status: "Upcoming"
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrainings = trainings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trainings.length / itemsPerPage);

  const handleSaveTraining = (e) => {
    e.preventDefault();
    if (editingId) {
      setTrainings(trainings.map(t => t.id === editingId ? { ...t, ...formData } : t));
    } else {
      const training = {
        id: trainings.length + 1,
        ...formData,
      };
      setTrainings([training, ...trainings]);
    }
    setIsFormOpen(false);
    setEditingId(null);
    setFormData({
      title: "",
      department: "",
      instructor: "",
      date: "",
      duration: "",
      status: "Upcoming"
    });
  };

  const handleEdit = (training) => {
    setFormData({
      title: training.title,
      department: training.department,
      instructor: training.instructor,
      date: training.date,
      duration: training.duration,
      status: training.status
    });
    setEditingId(training.id);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setFormData({
      title: "",
      department: "",
      instructor: "",
      date: "",
      duration: "",
      status: "Upcoming"
    });
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleExport = () => {
     const headers = ["Title", "Department", "Instructor", "Date", "Duration", "Status"];
     const csvContent = [
       headers.join(","),
       ...trainings.map(t =>
         [t.title, t.department, t.instructor, t.date, t.duration, t.status].map(field =>
           `"${field}"`
         ).join(",")
       )
     ].join("\n");

     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
     const link = document.createElement("a");
     if (link.download !== undefined) {
       const url = URL.createObjectURL(blob);
       link.setAttribute("href", url);
       link.setAttribute("download", "trainings.csv");
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
          <h1 className="text-2xl font-bold text-foreground">Trainings</h1>
          <p className="text-muted-foreground">Manage training programs and workshops</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
            </Button>
            <Button className="gap-2" onClick={handleAddNew}>
            <Plus className="w-4 h-4" />
            Add Training
            </Button>
        </div>
      </div>

      <Card className="border border-border mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search trainings..."
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
                <TableHead>Training Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Taken By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        {training.title}
                    </div>
                  </TableCell>
                  <TableCell>{training.department}</TableCell>
                  <TableCell>{training.instructor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {training.date}
                    </div>
                  </TableCell>
                  <TableCell>{training.duration}</TableCell>
                  <TableCell>
                    <Badge variant={training.status === "Upcoming" ? "secondary" : "default"}>
                      {training.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(training)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-4">
            <Card className="border border-border shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{editingId ? 'Edit Training' : 'Add New Training'}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsFormOpen(false)} className="h-8 w-8">
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSaveTraining} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Training Title</label>
                    <Input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Department</label>
                      <Input
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        placeholder="e.g. CSE, All"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Taken By</label>
                      <Input
                        required
                        value={formData.instructor}
                        onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                        placeholder="Instructor/Org"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <Input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration</label>
                      <Input
                        required
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        placeholder="e.g. 2 Weeks"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                    <Button type="submit">{editingId ? 'Save Changes' : 'Add Training'}</Button>
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

export default AdminTrainings;