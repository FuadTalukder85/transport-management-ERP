import DriverReport from "../Pages/Reports/DriverReport";
import EmployeeReport from "../Pages/Reports/EmployeeReport";
import FuelReport from "../Pages/Reports/FuelReport";
import InventoryReport from "../Pages/Reports/InventoryReport";
import PurchaseReport from "../Pages/Reports/PurchaseReport";
import TripReport from "../Pages/Reports/TripReport";

export const ReportsRoutes = [
  {
    path: "/Reports/Employee-Report",
    element: <EmployeeReport />,
  },
  {
    path: "/Reports/Driver-Report",
    element: <DriverReport />,
  },
  {
    path: "/Reports/Fuel-Report",
    element: <FuelReport />,
  },
  {
    path: "/Reports/Purchase-Report",
    element: <PurchaseReport />,
  },
  {
    path: "/Reports/Inventory-Report",
    element: <InventoryReport />,
  },
  {
    path: "/Reports/Trip-Report",
    element: <TripReport />,
  },
];
