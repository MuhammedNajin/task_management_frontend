import React from "react";
import { useAppSelector } from "../hooks/redux";
import { Navigate } from "react-router-dom";

interface AuthRedirectProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export const AuthRedirect: React.FC<AuthRedirectProps> = ({
  children,
  redirectPath = "/home",
}) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  console.log("isAuthenticated", isAuthenticated);
  

  if (!isAuthenticated) {
    
    return <>{children}</>;
    
  }

  return <Navigate to={redirectPath} replace />;
};