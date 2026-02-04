import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
}

const ComingSoon = ({ title }: ComingSoonProps) => {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Construction className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground max-w-md">
          This module is under development. Check back soon for updates!
        </p>
      </div>
    </div>
  );
};

export const AdminCompanies = () => <ComingSoon title="Companies" />;
export const AdminPlacements = () => <ComingSoon title="Placements" />;
export const AdminTrainings = () => <ComingSoon title="Trainings" />;
export const AdminReports = () => <ComingSoon title="Reports" />;
export const AdminSettings = () => <ComingSoon title="Settings" />;
