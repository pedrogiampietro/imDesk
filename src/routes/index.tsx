import { useRoutes } from "react-router-dom";

import { Login } from "../screens/Login";
import { Dashboard } from "../screens/Dashboard";
import { Ticket } from "../screens/Ticket";
import { Statistic } from "../screens/Statistic";
import { Maintenance } from "../screens/Maintenance";
import { Settings } from "../screens/Settings";
import { Provider } from "../screens/Provider";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Deposit } from "../screens/Deposit";
import { DepositView } from "../screens/DepositView";

import RouteProtector from "./RouteProtector";
import { Nutrition } from "../screens/Nutrition";
import { Inventory } from "../screens/Inventory";

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
    {
      path: "/providers",
      element: (
        <RouteProtector>
          <Provider />
        </RouteProtector>
      ),
    },
    {
      path: "/profile",
      element: (
        <RouteProtector>
          <ProfileScreen />
        </RouteProtector>
      ),
    },
    {
      path: "/deposit",
      element: (
        <RouteProtector>
          <Deposit />
        </RouteProtector>
      ),
    },
    {
      path: "/inventory",
      element: (
        <RouteProtector>
          <Inventory />
        </RouteProtector>
      ),
    },
    {
      path: "/deposit/:id",
      element: (
        <RouteProtector>
          <DepositView />
        </RouteProtector>
      ),
    },
    {
      path: "/nutrition",
      element: (
        <RouteProtector>
          <Nutrition />
        </RouteProtector>
      ),
    },
  ]);
  return routes;
}
