import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import PrivateRoute from "./PrivateRoute";
import { CustomerRoutes } from "./CustomerRoutes";
import { VendorRoutes } from "./VendorRoutes";
import { FleetRoutes } from "./FleetRoutes";
import { RentVehicleRoutes } from "./RentVehicleRoutes";
import { HrRoutes } from "./HrRoutes";
import { InventoryRoutes } from "./InventoryRoutes";
import { PurchaseRoutes } from "./PurchaseRoutes";
import { AccountsRoutes } from "./AccountsRoutes";
import { BillingRoutes } from "./BillingRoutes";
import { ReportsRoutes } from "./ReportsRoutes";
import { UserRoutes } from "./UserRoutes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      ...CustomerRoutes,
      ...VendorRoutes,
      ...FleetRoutes,
      ...RentVehicleRoutes,
      ...HrRoutes,
      ...InventoryRoutes,
      ...PurchaseRoutes,
      ...AccountsRoutes,
      ...BillingRoutes,
      ...ReportsRoutes,
      ...UserRoutes,
    ],
  },
]);
