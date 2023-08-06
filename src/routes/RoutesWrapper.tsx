import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./index";

export default function RoutesWrapper() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
