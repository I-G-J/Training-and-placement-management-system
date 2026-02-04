import { Building2, Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const upcomingCompanies = [
  {
    name: "Microsoft",
    logo: "M",
    role: "Software Engineer",
    date: "Feb 15, 2025",
    location: "Bangalore",
    openings: 25,
    package: "₹18-24 LPA",
    status: "Upcoming"
  },
  {
    name: "Google",
    logo: "G",
    role: "Associate Product Manager",
    date: "Feb 20, 2025",
    location: "Hyderabad",
    openings: 15,
    package: "₹20-28 LPA",
    status: "Upcoming"
  },
  {
    name: "Amazon",
    logo: "A",
    role: "SDE I",
    date: "Feb 25, 2025",
    location: "Multiple",
    openings: 40,
    package: "₹16-22 LPA",
    status: "Upcoming"
  },
  {
    name: "Deloitte",
    logo: "D",
    role: "Business Analyst",
    date: "Mar 1, 2025",
    location: "Mumbai",
    openings: 30,
    package: "₹8-12 LPA",
    status: "Registrations Open"
  },
  {
    name: "Adobe",
    logo: "Ad",
    role: "Computer Scientist",
    date: "Mar 5, 2025",
    location: "Noida",
    openings: 20,
    package: "₹18-25 LPA",
    status: "Upcoming"
  },
  {
    name: "Flipkart",
    logo: "F",
    role: "SDE",
    date: "Mar 10, 2025",
    location: "Bangalore",
    openings: 35,
    package: "₹14-20 LPA",
    status: "Upcoming"
  }
];

const Companies = () => {
  return (
    <section id="companies" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Recruitment Drives</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Upcoming Company Visits
          </h2>
          <p className="text-muted-foreground text-lg">
            Top recruiters visiting our campus this placement season. 
            Register early to secure your slot.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingCompanies.map((company, index) => (
            <div 
              key={company.name}
              className="group bg-card rounded-2xl p-6 border border-border card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                    {company.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{company.name}</h3>
                    <p className="text-sm text-muted-foreground">{company.role}</p>
                  </div>
                </div>
                <Badge 
                  variant={company.status === "Registrations Open" ? "default" : "secondary"}
                  className={company.status === "Registrations Open" ? "bg-success text-success-foreground" : ""}
                >
                  {company.status}
                </Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{company.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{company.openings} openings</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Package</span>
                <span className="font-semibold text-accent">{company.package}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;
