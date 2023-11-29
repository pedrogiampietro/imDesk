import { useRoutes } from "react-router-dom";

import { Login } from "../screens/Login";
import { Dashboard } from "../screens/Dashboard";
import { Ticket } from "../screens/Ticket";
import {
  Statistic,
  StatisticTicketsViolatedByTech,
} from "../screens/Statistic/StatisticTicketsViolatedByTech";
import { Maintenance } from "../screens/Maintenance";
import { Settings } from "../screens/Settings";
import { Provider } from "../screens/Provider";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Deposit } from "../screens/Deposit";
import { DepositView } from "../screens/DepositView";

import RouteProtector from "./RouteProtector";
import { Inventory } from "../screens/Inventory";
import { StatisticOS } from "../screens/Statistic/StatisticOS";
import { CreateUser } from "../screens/Settings/CreateUser";
import { CreateLocation } from "../screens/Settings/CreateLocation";
import { CreatePriority } from "../screens/Settings/CreatePriority";
import { CreateType } from "../screens/Settings/CreateType";
import { CreateCategory } from "../screens/Settings/CreateCategory";
import { ShiftChange } from "../screens/ShiftChange";
import { SuggestionComplaint } from "../screens/SuggestionComplaint";
import { StatisticTicketsOpenedByLocation } from "../screens/Statistic/StatisticTicketsOpenedByLocation";

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
      path: "/statistics/violated-by-techs",
      element: (
        <RouteProtector requiresTech>
          <StatisticTicketsViolatedByTech />
        </RouteProtector>
      ),
    },
    {
      path: "/statistics/opened-by-locations",
      element: (
        <RouteProtector requiresTech>
          <StatisticTicketsOpenedByLocation />
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
        <RouteProtector>
          <Settings />
        </RouteProtector>
      ),
    },
    {
      path: "/settings/create-user",
      element: (
        <RouteProtector requiresTech>
          <CreateUser />
        </RouteProtector>
      ),
    },
    {
      path: "/settings/create-location",
      element: (
        <RouteProtector requiresTech>
          <CreateLocation />
        </RouteProtector>
      ),
    },
    {
      path: "/settings/create-priority",
      element: (
        <RouteProtector requiresTech>
          <CreatePriority />
        </RouteProtector>
      ),
    },
    {
      path: "/settings/create-type",
      element: (
        <RouteProtector requiresTech>
          <CreateType />
        </RouteProtector>
      ),
    },
    {
      path: "/settings/create-category",
      element: (
        <RouteProtector requiresTech>
          <CreateCategory />
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
      path: "/shift-change",
      element: (
        <RouteProtector requiresTech>
          <ShiftChange />
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
    {
      path: "/suggestion-complaint",
      element: (
        <RouteProtector requiresTech>
          <SuggestionComplaint />
        </RouteProtector>
      ),
    },
  ]);
  return routes;
}
