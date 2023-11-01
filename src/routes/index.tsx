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
import { Inventory } from "../screens/Inventory";
import { StatisticOS } from "../screens/Statistic/StatisticOS";

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
        <RouteProtector requiresTech>
          <Maintenance />
        </RouteProtector>
      ),
    },
    {
      path: "/statistics",
      element: (
        <RouteProtector requiresTech>
          <Statistic />
        </RouteProtector>
      ),
    },
    {
      path: "/statistics/os",
      element: (
        <RouteProtector requiresTech>
          <StatisticOS />
        </RouteProtector>
      ),
    },
    {
      path: "/settings",
      element: (
        <RouteProtector requiresTech>
          <Settings />
        </RouteProtector>
      ),
    },
    {
      path: "/providers",
      element: (
        <RouteProtector requiresTech>
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
        <RouteProtector requiresTech>
          <Deposit />
        </RouteProtector>
      ),
    },
    {
      path: "/inventory",
      element: (
        <RouteProtector requiresTech>
          <Inventory />
        </RouteProtector>
      ),
    },
    {
      path: "/deposit/:id",
      element: (
        <RouteProtector requiresTech>
          <DepositView />
        </RouteProtector>
      ),
    },
  ]);
  return routes;
}
