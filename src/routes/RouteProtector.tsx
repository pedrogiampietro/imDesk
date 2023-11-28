import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PropsI {
  children: ReactNode;
  requiresTech?: boolean;
}

export default function RouteProtector({ children, requiresTech }: PropsI) {
  const { isAuthenticated, loading, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      console.log("Inside useEffect: isAuthenticated:", isAuthenticated);

      if (!isAuthenticated) {
        navigate("/login");
      } else if (requiresTech && !user?.isTechnician) {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, loading, navigate, requiresTech, user?.isTechnician]);

  return <>{children}</>;
}
