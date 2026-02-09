import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Plus,
  X,
  Download,
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
import api from "@/api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    companies: 0,
    placements: 0,
    avgPackage: 0,
  });

  const [drives, setDrives] = useState([]);
  const [placements, setPlacements] = useState([]);

  const [isAddDriveOpen, setIsAddDriveOpen] = useState(false);
  const [isAddPlacementOpen, setIsAddPlacementOpen] = useState(false);

  const [newDrive, setNewDrive] = useState({
    companyName: "",
    logoUrl: "",
    arrivalDate: "",
    cgpaRequired: "",
    role: "",
    openings: "",
    location: "",
    jdUrl: "",
  });

  const [newPlacement, setNewPlacement] = useState({
    studentId: "",
    companyId: "",
    role: "",
    package: "",
    status: "Confirmed",
  });

  // ===== FETCH ALL DATA =====
  useEffect(() => {
    fetchDashboardData();
    fetchCompanies();
    fetchPlacements();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [studentRes, companyRes, placementRes, avgRes] = await Promise.all([
        api.get("/students/count"),
        api.get("/companies/all"),
        api.get("/placements/count"),
        api.get("/placements/average-package"),
      ]);

      setStats({
        students: studentRes.data.count,
        companies: companyRes.data.count,
        placements: placementRes.data.count,
        avgPackage: avgRes.data.avgPackage || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/companies/all");
      setDrives(res.data.companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchPlacements = async () => {
    try {
      const res = await api.get("/placements");
      setPlacements(res.data.placements);
    } catch (error) {
      console.error("Error fetching placements:", error);
    }
  };

  // ===== ADD COMPANY DRIVE (UNCHANGED) =====
  const handleAddDrive = async (e) => {
    e.preventDefault();

    try {
      await api.post("/companies/add", {
        companyName: newDrive.companyName,
        logoUrl: newDrive.logoUrl,
        arrivalDate: newDrive.arrivalDate,
        cgpaRequired: Number(newDrive.cgpaRequired),
        role: newDrive.role,
        openings: Number(newDrive.openings),
        location: newDrive.location,
        jdUrl: newDrive.jdUrl,
        registeredCount: 0,
      });

      setIsAddDriveOpen(false);
      fetchCompanies();
      fetchDashboardData();

      setNewDrive({
        companyName: "",
        logoUrl: "",
        arrivalDate: "",
        cgpaRequired: "",
        role: "",
        openings: "",
        location: "",
        jdUrl: "",
      });
    } catch (error) {
      console.error("Error adding drive:", error);
      alert("Failed to add drive. Check backend.");
    }
  };

  // ===== ADD PLACEMENT (UPDATED) =====
  const handleAddPlacement = async (e) => {
    e.preventDefault();

    try {
      await api.post("/placements", {
        student: newPlacement.studentId,
        company: newPlacement.companyId,
        role: newPlacement.role,
        package: Number(newPlacement.package),
        status: newPlacement.status,
      });

      setIsAddPlacementOpen(false);
      fetchPlacements();
      fetchDashboardData();

      setNewPlacement({
        studentId: "",
        companyId: "",
        role: "",
        package: "",
        status: "Confirmed",
      });
    } catch (error) {
      console.error("Error adding placement:", error);
      alert("Failed to add placement. Check backend.");
    }
  };

  // ===== EXPORT CSV =====
  const handleExportPlacements = () => {
    const headers = ["Student", "Company", "Role", "Package", "Status"];
    const csvContent = [
      headers.join(","),
      ...placements.map((p) =>
        [
          p.student?.user?.name || "N/A",
          p.company?.companyName || "N/A",
          p.role,
          p.package + " LPA",
          p.status,
        ]
          .map((field) => `"${field}"`)
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "placements.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time analytics from your database.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Students",
            value: stats.students,
            icon: Users,
          },
          {
            title: "Active Companies",
            value: stats.companies,
            icon: Building2,
          },
          {
            title: "Placements",
            value: stats.placements,
            icon: Briefcase,
          },
          {
            title: "Avg. Package",
            value: `₹${stats.avgPackage.toFixed(1)} LPA`,
            icon: TrendingUp,
          },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Placements */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Recent Placements</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPlacements}
              >
                Export
              </Button>
              <Button size="sm" onClick={() => setIsAddPlacementOpen(true)}>
                + Add Placement
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {placements.map((p) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.student?.user?.name || "N/A"}</TableCell>
                    <TableCell>{p.company?.companyName || "N/A"}</TableCell>
                    <TableCell>{p.role}</TableCell>
                    <TableCell>{p.package} LPA</TableCell>
                    <TableCell>
                      <Badge>{p.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Upcoming Drives (UNCHANGED) */}
        <Card>
          <CardHeader className="flex flex-row justify-between">
            <CardTitle>Upcoming Drives</CardTitle>
            <Button size="sm" onClick={() => setIsAddDriveOpen(true)}>
              + Add Drive
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {drives.map((d) => (
              <div
                key={d._id}
                className="p-4 rounded-lg bg-secondary/50 border"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{d.companyName}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(d.arrivalDate).toDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{d.openings} openings</span>
                  <span>{d.registeredCount || 0} registered</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ADD DRIVE MODAL (UNCHANGED) */}
      {isAddDriveOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <Card className="w-full max-w-lg p-4">
            <CardHeader className="flex justify-between">
              <CardTitle>Add Company Drive</CardTitle>
              <Button variant="ghost" onClick={() => setIsAddDriveOpen(false)}>
                <X />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddDrive} className="space-y-3">
                <Input
                  placeholder="Company Name"
                  value={newDrive.companyName}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, companyName: e.target.value })
                  }
                  required
                />

                <Input
                  type="date"
                  value={newDrive.arrivalDate}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, arrivalDate: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="CGPA Required"
                  value={newDrive.cgpaRequired}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, cgpaRequired: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="Role"
                  value={newDrive.role}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, role: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="Openings"
                  type="number"
                  value={newDrive.openings}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, openings: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="Location"
                  value={newDrive.location}
                  onChange={(e) =>
                    setNewDrive({ ...newDrive, location: e.target.value })
                  }
                  required
                />

                <Button type="submit" className="w-full">
                  Add Drive
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ===== ADD PLACEMENT MODAL (ONLY THIS PART CHANGED) ===== */}
      {isAddPlacementOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <Card className="w-full max-w-lg p-4">
            <CardHeader className="flex justify-between">
              <CardTitle>Add Placement</CardTitle>
              <Button
                variant="ghost"
                onClick={() => setIsAddPlacementOpen(false)}
              >
                <X />
              </Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPlacement} className="space-y-3">
                <Input
                  placeholder="Student ID (Mongo ObjectId)"
                  value={newPlacement.studentId}
                  onChange={(e) =>
                    setNewPlacement({
                      ...newPlacement,
                      studentId: e.target.value,
                    })
                  }
                  required
                />

                {/* ✅ COMPANY NAME DROPDOWN (NEW) */}
                <select
                  className="w-full border p-2 rounded"
                  value={newPlacement.companyId}
                  onChange={(e) =>
                    setNewPlacement({
                      ...newPlacement,
                      companyId: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Company</option>
                  {drives.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.companyName}
                    </option>
                  ))}
                </select>

                <Input
                  placeholder="Role (e.g. SDE)"
                  value={newPlacement.role}
                  onChange={(e) =>
                    setNewPlacement({ ...newPlacement, role: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="Package (e.g. 12)"
                  type="number"
                  value={newPlacement.package}
                  onChange={(e) =>
                    setNewPlacement({
                      ...newPlacement,
                      package: e.target.value,
                    })
                  }
                  required
                />

                <Button type="submit" className="w-full">
                  Add Placement
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
