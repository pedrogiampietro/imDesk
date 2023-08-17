import { useRoutes } from "react-router-dom";

import { Login } from "../screens/Login";
import { Dashboard } from "../screens/Dashboard";
import { Ticket } from "../screens/Ticket";
import { Statistic } from "../screens/Statistic";
import { Maintenance } from "../screens/Maintenance";
import { Settings } from "../screens/Settings";

import RouteProtector from "./RouteProtector";

export function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },

    // {
    // 	path: '/recuperar-senha',
    // 	element: <RecoverPassword />,
    // },
    // {
    // 	path: '/redefinir-senha/*',
    // 	element: <ResetPassword />,
    // },
    {
      path: "/dashboard",
      element: (
        <RouteProtector>
          <Dashboard />
        </RouteProtector>
      ),
    },
    {
      path: "/tickets",
      element: (
        <RouteProtector>
          <Ticket />
        </RouteProtector>
      ),
    },
    {
      path: "/maintenance",
      element: (
        <RouteProtector>
          <Maintenance />
        </RouteProtector>
      ),
    },
    {
      path: "/statistics",
      element: (
        <RouteProtector>
          <Statistic />
        </RouteProtector>
      ),
    },
    {
      path: "/settings",
      element: (
        <RouteProtector>
          <Settings />
        </RouteProtector>
      ),
    },
  ]);
  return routes;
}
