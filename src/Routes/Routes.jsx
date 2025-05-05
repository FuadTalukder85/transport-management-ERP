import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import CarList from "../Pages/CarList";
import AddCarForm from "../Pages/AddCarForm";
import DriverList from "../Pages/DriverList";
import AddDriverForm from "../Pages/AddDriverForm";
import TripList from "../Pages/TripList";
import AddTripForm from "../Pages/AddTripForm";
import Fuel from "../Pages/Fuel";
import FuelForm from "../Pages/FuelForm";
import Parts from "../Pages/Parts";
import Maintenance from "../Pages/Maintenance";
import MaintenanceForm from "../Pages/MaintenanceForm";
import DailyIncome from "../Pages/DailyIncome";
import DailyExpense from "../Pages/DailyExpense";
import AllUsers from "../Pages/AllUsers";
import AddUserForm from "../Pages/AddUserForm";
import Login from "../components/Form/Login";
import ResetPass from "../components/Form/ResetPass";
import PrivateRoute from "./PrivateRoute";
import UpdateCarForm from "../Pages/updateForm/UpdateCarForm";
import UpdateTripForm from "../Pages/updateForm/UpdateTripForm";
import UpdateFuelForm from "../Pages/updateForm/UpdateFuelForm";
import UpdatePartsForm from "../Pages/updateForm/UpdatePartsForm";
import UpdateUsersForm from "../Pages/updateForm/UpdateUsersForm";
import UpdateMaintenanceForm from "../Pages/updateForm/UpdateMaintenanceForm";
import UpdateDriverForm from "../Pages/updateForm/UpdateDriverForm";
import UpdateDailyIncomeForm from "../Pages/updateForm/UpdateDailyIncomeForm";
import UpdateExpenseForm from "../Pages/updateForm/UpdateExpenseForm";
import AdminRoute from "./AdminRoute";
import VendorList from "../Pages/VendorList";
import AddVendorForm from "../Pages/AddVendorForm";
import RentList from "../Pages/RentList";
import AddRentVehicleForm from "../Pages/AddRentVehicleForm";
import EmployeeList from "../Pages/HR/HRM/Employee-list";
import AddEmployee from "../Pages/HR/HRM/AddEmployee";
import Leave from "../Pages/HR/Leave";
import LeaveForm from "../Pages/HR/LeaveForm";
import PurchaseList from "../Pages/Purchase/PurchaseList";
import PurchaseForm from "../Pages/Purchase/PurchaseForm";
import Stockin from "../Pages/Inventory/Stockin";
import AddStock from "../Pages/Inventory/AddStock";
import StockOut from "../Pages/Inventory/StockOut";
import StockOutForm from "../Pages/Inventory/StockOutForm";
import Vendor from "../Pages/Inventory/Vendor";
import InventoryVendorForm from "../Pages/Inventory/InventoryVendorForm";
import SupplierList from "../Pages/Purchase/SupplierList";
import AddSupply from "../Pages/Purchase/AddSupply";
import AttendanceList from "../Pages/HR/HRM/AttendanceList";
import AdvanceSalary from "../Pages/HR/Payroll/AdvanceSalary";
import AdvanceSalaryForm from "../Pages/HR/Payroll/AdvanceSalaryForm";
import Customer from "../Pages/Customer/Customer";
import AddCustomer from "../Pages/Customer/AddCustomer";
import ExployeeReport from "../Pages/Reports/ExployeeReport";
import DriverReport from "../Pages/Reports/DriverReport";
import FuelReport from "../Pages/Reports/FuelReport";
import PurchaseReport from "../Pages/Reports/PurchaseReport";
import InventoryReport from "../Pages/Reports/InventoryReport";
import TripReport from "../Pages/Reports/TripReport";
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
      {
        path: "CarList",
        element: (
          <PrivateRoute>
            <CarList />
          </PrivateRoute>
        ),
      },
      {
        path: "AddCarForm",
        element: (
          <PrivateRoute>
            <AddCarForm />
          </PrivateRoute>
        ),
      },
      {
        path: "UpdateCarForm/:id",
        element: (
          <PrivateRoute>
            <UpdateCarForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/vehicle/${params.id}`),
      },
      {
        path: "DriverList",
        element: (
          <PrivateRoute>
            <DriverList />
          </PrivateRoute>
        ),
      },
      {
        path: "AddDriverForm",
        element: (
          <PrivateRoute>
            <AddDriverForm />
          </PrivateRoute>
        ),
      },
      {
        path: "UpdateDriverForm/:id",
        element: (
          <PrivateRoute>
            <UpdateDriverForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/driver/${params.id}`),
      },
      {
        path: "TripList",
        element: (
          <PrivateRoute>
            <TripList />
          </PrivateRoute>
        ),
      },
      {
        path: "AddTripForm",
        element: (
          <PrivateRoute>
            <AddTripForm />
          </PrivateRoute>
        ),
      },
      {
        path: "UpdateTripForm/:id",
        element: (
          <PrivateRoute>
            <UpdateTripForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/trip/${params.id}`),
      },
      {
        path: "Fuel",
        element: (
          <PrivateRoute>
            <Fuel />
          </PrivateRoute>
        ),
      },
      {
        path: "FuelForm",
        element: (
          <PrivateRoute>
            <FuelForm />
          </PrivateRoute>
        ),
      },
      {
        path: "UpdateFuelForm/:id",
        element: (
          <PrivateRoute>
            <UpdateFuelForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/fuel/${params.id}`),
      },
      {
        path: "Parts",
        element: (
          <PrivateRoute>
            <Parts />
          </PrivateRoute>
        ),
      },
      {
        path: "UpdatePartsForm/:id",
        element: (
          <PrivateRoute>
            <UpdatePartsForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/parts/${params.id}`),
      },
      {
        path: "Maintenance",
        element: (
          <PrivateRoute>
            <Maintenance />
          </PrivateRoute>
        ),
      },
      {
        path: "MaintenanceForm",
        element: (
          <PrivateRoute>
            <MaintenanceForm />
          </PrivateRoute>
        ),
      },
      {
        path: "UpdateMaintenanceForm/:id",
        element: (
          <PrivateRoute>
            <UpdateMaintenanceForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/maintenance/${params.id}`),
      },
      {
        path: "VendorList",
        element: (
          // <AdminRoute>
          <VendorList />
          // </AdminRoute>
        ),
      },
      {
        path: "AddVendorForm",
        element: (
          // <AdminRoute>
          <AddVendorForm />
          // </AdminRoute>
        ),
      },
      {
        path: "RentList",
        element: (
          // <AdminRoute>
          <RentList />
          // </AdminRoute>
        ),
      },
      {
        path: "AddRentVehicleForm",
        element: (
          // <AdminRoute>
          <AddRentVehicleForm />
          // </AdminRoute>
        ),
      },
      {
        path: "DailyIncome",
        element: (
          <AdminRoute>
            <DailyIncome />
          </AdminRoute>
        ),
      },
      {
        path: "DailyExpense",
        element: (
          <PrivateRoute>
            <DailyExpense />
          </PrivateRoute>
        ),
      },
      {
        path: "AllUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "AddUserForm",
        element: (
          <AdminRoute>
            <AddUserForm />
          </AdminRoute>
        ),
      },
      {
        path: "UpdateUsersForm/:id",
        element: (
          <PrivateRoute>
            <UpdateUsersForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/users/${params.id}`),
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "ResetPass",
        element: <ResetPass />,
      },
      {
        path: "UpdateDailyIncomeForm/:id",
        element: (
          <AdminRoute>
            <UpdateDailyIncomeForm />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/trip/${params.id}`),
      },
      {
        path: "UpdateExpenseForm/:id",
        element: (
          <PrivateRoute>
            <UpdateExpenseForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.dropshep.com/api/trip/${params.id}`),
      },

      // HR
      {
        path: "/HR/HRM/employee-list",
        element: <EmployeeList />,
      },
      {
        path: "/HR/HRM/AddEmployee",
        element: <AddEmployee />,
      },
      {
        path: "/HR/Attendance/AttendanceList",
        element: <AttendanceList />,
      },
      // payroll
      {
        path: "/HRM/Payroll/Advance-Salary",
        element: <AdvanceSalary />,
      },
      {
        path: "/HRM/Payroll/Advance-Salary-Form",
        element: <AdvanceSalaryForm />,
      },
      {
        path: "/HR/HRM/Leave",
        element: <Leave />,
      },
      {
        path: "/HR/HRM/LeaveForm",
        element: <LeaveForm />,
      },
      {
        path: "/Purchase/PurchaseList",
        element: <PurchaseList />,
      },
      {
        path: "/Purchase/PurchaseForm",
        element: <PurchaseForm />,
      },
      {
        path: "/Purchase/SupplierList",
        element: <SupplierList />,
      },
      {
        path: "/Purchase/AddSupply",
        element: <AddSupply />,
      },
      // Inventory
      {
        path: "/Inventory/Stockin",
        element: <Stockin />,
      },
      {
        path: "/Inventory/AddStock",
        element: <AddStock />,
      },
      {
        path: "/Inventory/StockOut",
        element: <StockOut />,
      },
      {
        path: "/Inventory/StockOutForm",
        element: <StockOutForm />,
      },
      {
        path: "/Inventory/Vendor",
        element: <Vendor />,
      },
      {
        path: "/Inventory/AddVendor",
        element: <InventoryVendorForm />,
      },
      // Customer
      {
        path: "/Customer",
        element: <Customer />,
      },
      {
        path: "/AddCustomer",
        element: <AddCustomer />,
      },
      // Reports
      {
        path: "/Reports/Employee-Report",
        element: <ExployeeReport />,
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
    ],
  },
]);
