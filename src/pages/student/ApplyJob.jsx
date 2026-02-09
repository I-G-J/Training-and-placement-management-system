import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Link as LinkIcon } from "lucide-react";

const COURSE_OPTIONS = [
  "BCA",
  "BSc Computer Science",
  "BTech CSE",
  "BTech IT",
  "MCA",
  "MBA",
  "BBA",
  "BCom",
  "BA",
  "Other",
];

const DEPARTMENT_OPTIONS = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Management",
  "Commerce",
  "Arts",
  "Science",
];

const ApplyJobDialog = ({ job, trigger }) => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enrollmentNo: "",
    course: "",
    department: "",
    resumeLink: "",
  });

  // 🔹 Prefill user data
  useEffect(() => {
    if (user && open) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        enrollmentNo: user.enrollmentNo || "",
        course: user.course || "",
        department: user.department || "",
      }));
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "enrollmentNo" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Safety check
    if (!job || !job._id) {
      toast.error("Invalid job. Please refresh the page.");
      return;
    }

    if (!formData.resumeLink.trim()) {
      toast.error("Please provide your resume drive link");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/applications/apply/${job._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            company: job.company, // ✅ IMPORTANT
            role: job.role, // ✅ IMPORTANT
            ...formData,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Application failed");
      }

      toast.success(`Applied to ${job.company} successfully`);

      setOpen(false);
      setFormData({
        fullName: user?.name || "",
        email: user?.email || "",
        phone: "",
        enrollmentNo: user?.enrollmentNo || "",
        course: user?.course || "",
        department: user?.department || "",
        resumeLink: "",
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button size="sm">Apply</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Apply to {job?.company}</DialogTitle>
          <DialogDescription>
            Applying for <b>{job?.role}</b>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <Label>Phone Number</Label>
            <Input
              id="phone"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Enrollment */}
          <div>
            <Label>Enrollment Number</Label>
            <Input
              id="enrollmentNo"
              placeholder="Example:- 006BCA23GT019"
              value={formData.enrollmentNo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Course */}
          <div>
            <Label>Course</Label>
            <select
              id="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">Select course</option>
              {COURSE_OPTIONS.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div>
            <Label>Department</Label>
            <select
              id="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              required
            >
              <option value="">Select department</option>
              {DEPARTMENT_OPTIONS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Resume Link */}
          <div>
            <Label>Resume Drive Link</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="resumeLink"
                placeholder="https://drive.google.com/..."
                value={formData.resumeLink}
                onChange={handleChange}
                className="pl-9"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyJobDialog;
