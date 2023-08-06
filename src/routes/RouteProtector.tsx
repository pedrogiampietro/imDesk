import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PropsI {
  children: ReactNode;
}

export default function RouteProtector(props: PropsI) {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "Inside useEffect: isAuthenticated:",
      isAuthenticated,
      "loading:",
      loading
    );
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  return <>{props.children}</>;
}
