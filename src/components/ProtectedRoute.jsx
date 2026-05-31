import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please log in first.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;