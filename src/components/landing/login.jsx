import { SignIn } from "@clerk/clerk-react";
import Header from "@/components/landing/Header";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <SignIn signUpUrl="/signup" afterSignInUrl="/" />
      </main>
    </div>
  );
};

export default Login;
