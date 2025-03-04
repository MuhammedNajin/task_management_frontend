import React from "react";
import { useAppSelector } from "../hooks/redux"; 
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/signin",
}) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    console.error("user not authurized")
    toast.error("Please log in to access this page");
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};