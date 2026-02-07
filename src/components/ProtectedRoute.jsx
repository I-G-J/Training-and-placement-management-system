import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    // You can return a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;