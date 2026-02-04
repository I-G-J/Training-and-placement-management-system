import { Target, Users, TrendingUp, Award } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Industry-Focused Training",
    description: "Comprehensive skill development programs aligned with current industry requirements and emerging technologies."
  },
  {
    icon: Users,
    title: "Corporate Connections",
    description: "Strong partnerships with Fortune 500 companies and innovative startups for diverse placement opportunities."
  },
  {
    icon: TrendingUp,
    title: "Career Guidance",
    description: "Personalized career counseling, resume building workshops, and mock interview sessions."
  },
  {
    icon: Award,
    title: "Excellence Track Record",
    description: "Consistently achieving 90%+ placement rates with competitive salary packages year after year."
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">About Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Empowering Students for Professional Excellence
          </h2>
          <p className="text-muted-foreground text-lg">
            The Training & Placement Cell serves as the bridge between academia and industry, 
            ensuring our students are career-ready and competitively positioned.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group glass-card rounded-2xl p-6 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
