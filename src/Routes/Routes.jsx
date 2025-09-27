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
import SupplierList from "../Pages/Purchase/SupplierList";
import AddSupply from "../Pages/Purchase/AddSupply";
import AttendanceList from "../Pages/HR/HRM/AttendanceList";
import AdvanceSalary from "../Pages/HR/Payroll/AdvanceSalary";
import AdvanceSalaryForm from "../Pages/HR/Payroll/AdvanceSalaryForm";
import Customer from "../Pages/Customer/Customer";
import AddCustomer from "../Pages/Customer/AddCustomer";
import EmployeeReport from "../Pages/Reports/EmployeeReport";
import DriverReport from "../Pages/Reports/DriverReport";
import FuelReport from "../Pages/Reports/FuelReport";
import PurchaseReport from "../Pages/Reports/PurchaseReport";
import InventoryReport from "../Pages/Reports/InventoryReport";
import TripReport from "../Pages/Reports/TripReport";
import AttendanceForm from "../Pages/HR/HRM/AttendanceForm";
import InventorySupplier from "../Pages/Inventory/InventorySupplier";
import InventorySupplierForm from "../Pages/Inventory/InventorySupplierForm";
import GenerateSalaryForm from "../Pages/HR/Payroll/GenerateSalaryForm";
import GenerateSalary from "../Pages/HR/Payroll/GenerateSalary";
import Yamaha from "../Pages/Billing/Yamaha";
import Hatim from "../Pages/Billing/Hatim";
import Suzuki from "../Pages/Billing/Suzuki";
import Honda from "../Pages/Billing/Honda";
import CashDispatch from "../Pages/Account/CashDispatch";
import Office from "../Pages/HR/HRM/Office";
import CashDispatchForm from "../Pages/Account/CashDispatchForm";
import OfficeForm from "../Pages/HR/HRM/OfficeForm";
import CustomerLedger from "../Pages/Account/CustomerLedger";
import SupplierLedger from "../Pages/Account/SupplierLedger";
import OfficeLedger from "../Pages/Account/OfficeLedger";
import PaymentList from "../Pages/Account/PaymentList";
import PaymentReceiveForm from "../Pages/Account/PaymentReceiveForm";
import PaymentReceive from "../Pages/Account/PaymentReceive";
import DriverLedger from "../Pages/Account/DriverLedger";
import HatimPubail from "../Pages/Billing/HatimPubail";
import UpdateCarForm from "../Pages/UpdateCarForm";
import UpdateCustomerForm from "../Pages/Customer/UpdateCustomerForm";
import UpdatePurchaseForm from "../Pages/Purchase/UpdatePurchaseForm";
import UpdateEmployeeForm from "../Pages/HR/HRM/UpdateEmployeeForm";
import UpdateSupplyForm from "../Pages/Purchase/UpdateSupplyForm";
import UpdateRentVehicleForm from "../Pages/UpdateRentVehicleForm";
import UpdateOfficeForm from "../Pages/HR/HRM/UpdateOfficeForm";
import UpdateVendorForm from "../Pages/UpdateVendorForm";
import UpdateLeaveForm from "../Pages/HR/UpdateLeaveForm";
import HelperList from "../Pages/HelperList";
import AddHelper from "../Pages/AddHelper";
import VendorLedger from "../Pages/Account/VendorLedger";
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
        path: "/CarList",
        element: (
          <PrivateRoute>
            <CarList />
          </PrivateRoute>
        ),
      },
      {
        path: "/AddCarForm",
        element: (
          <PrivateRoute>
            <AddCarForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/UpdateCarForm/:id",
        element: (
          <PrivateRoute>
            <UpdateCarForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/vehicle/show/${params.id}`),
      },
      {
        path: "/DriverList",
        element: (
          <PrivateRoute>
            <DriverList />
          </PrivateRoute>
        ),
      },
      {
        path: "/HelperList",
        element: (
          <PrivateRoute>
            <HelperList />
          </PrivateRoute>
        ),
      },
      {
        path: "/AddHelper",
        element: (
          <PrivateRoute>
            <AddHelper />
          </PrivateRoute>
        ),
      },
      {
        path: "/AddDriverForm",
        element: (
          <PrivateRoute>
            <AddDriverForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/UpdateDriverForm/:id",
        element: (
          <PrivateRoute>
            <UpdateDriverForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/driver/show/${params.id}`),
      },
      {
        path: "/TripList",
        element: (
          <PrivateRoute>
            <TripList />
          </PrivateRoute>
        ),
      },
      {
        path: "/AddTripForm",
        element: (
          <PrivateRoute>
            <AddTripForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/UpdateTripForm/:id",
        element: (
          <PrivateRoute>
            <UpdateTripForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/trip/show/${params.id}`),
      },
      {
        path: "/Fuel",
        element: (
          <PrivateRoute>
            <Fuel />
          </PrivateRoute>
        ),
      },
      {
        path: "/FuelForm",
        element: (
          <PrivateRoute>
            <FuelForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/UpdateFuelForm/:id",
        element: (
          <PrivateRoute>
            <UpdateFuelForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.tramessy.com/api/fuel/${params.id}`),
      },
      {
        path: "/Parts",
        element: (
          <PrivateRoute>
            <Parts />
          </PrivateRoute>
        ),
      },
      {
        path: "/UpdatePartsForm/:id",
        element: (
          <PrivateRoute>
            <UpdatePartsForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.tramessy.com/api/parts/${params.id}`),
      },
      {
        path: "/Maintenance",
        element: (
          <PrivateRoute>
            <Maintenance />
          </PrivateRoute>
        ),
      },
      {
        path: "/MaintenanceForm",
        element: (
          <PrivateRoute>
            <MaintenanceForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/UpdateMaintenanceForm/:id",
        element: (
          <PrivateRoute>
            <UpdateMaintenanceForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.tramessy.com/api/maintenance/${params.id}`),
      },
      {
        path: "/VendorList",
        element: (
          // <AdminRoute>
          <VendorList />
          // </AdminRoute>
        ),
      },
      {
        path: "/AddVendorForm",
        element: (
          // <AdminRoute>
          <AddVendorForm />
          // </AdminRoute>
        ),
      },
      {
        path: "/UpdateVendorForm/:id",
        element: (
          <PrivateRoute>
            <UpdateVendorForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/vendor/show/${params.id}`),
      },
      {
        path: "/RentList",
        element: (
          // <AdminRoute>
          <RentList />
          // </AdminRoute>
        ),
      },
      {
        path: "/AddRentVehicleForm",
        element: (
          // <AdminRoute>
          <AddRentVehicleForm />
          // </AdminRoute>
        ),
      },
      {
        path: "/UpdateRentVehicleForm/:id",
        element: (
          <PrivateRoute>
            <UpdateRentVehicleForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/rent/show/${params.id}`),
      },
      {
        path: "/DailyIncome",
        element: (
          <AdminRoute>
            <DailyIncome />
          </AdminRoute>
        ),
      },
      {
        path: "/DailyExpense",
        element: (
          <PrivateRoute>
            <DailyExpense />
          </PrivateRoute>
        ),
      },
      {
        path: "/AllUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/AddUserForm",
        element: (
          <AdminRoute>
            <AddUserForm />
          </AdminRoute>
        ),
      },
      {
        path: "/UpdateUsersForm/:id",
        element: (
          <PrivateRoute>
            <UpdateUsersForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.tramessy.com/api/users/${params.id}`),
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/ResetPass",
        element: <ResetPass />,
      },
      {
        path: "/UpdateDailyIncomeForm/:id",
        element: (
          <AdminRoute>
            <UpdateDailyIncomeForm />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.tramessy.com/api/trip/${params.id}`),
      },
      {
        path: "/UpdateExpenseForm/:id",
        element: (
          <PrivateRoute>
            <UpdateExpenseForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://api.tramessy.com/api/trip/${params.id}`),
      },

      // HR
      {
        path: "/HR/HRM/employee-list",
        element: <EmployeeList />,
      },
      {
        path: "/HR/HRM/Office",
        element: <Office />,
      },
      {
        path: "/HR/HRM/OfficeForm",
        element: <OfficeForm />,
      },
      {
        path: "/HR/HRM/UpdateOfficeForm/:id",
        element: (
          <PrivateRoute>
            <UpdateOfficeForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/office/show/${params.id}`),
      },
      {
        path: "/HR/HRM/AddEmployee",
        element: <AddEmployee />,
      },
      {
        path: "/UpdateEmployeeForm/:id",
        element: (
          <PrivateRoute>
            <UpdateEmployeeForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/employee/show/${params.id}`),
      },
      {
        path: "/HR/Attendance/AttendanceList",
        element: <AttendanceList />,
      },

      {
        path: "/HR/HRM/Attendance/AttendanceForm",
        element: <AttendanceForm />,
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
        path: "/HRM/payroll/generate-salary",
        element: <GenerateSalary />,
      },
      {
        path: "/HRM/payroll/generate-salary-form",
        element: <GenerateSalaryForm />,
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
        path: "/UpdateLeaveForm/:id",
        element: (
          <PrivateRoute>
            <UpdateLeaveForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/leave/show/${params.id}`),
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
        path: "/Purchase/UpdatePurchaseForm/:id",
        element: <UpdatePurchaseForm />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/purchase/show/${params.id}`),
      },
      {
        path: "/Purchase/SupplierList",
        element: <SupplierList />,
      },
      {
        path: "/Purchase/AddSupply",
        element: <AddSupply />,
      },
      {
        path: "/UpdateSupplyForm/:id",
        element: (
          <PrivateRoute>
            <UpdateSupplyForm />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/supply/show/${params.id}`),
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
        path: "/Inventory/Inventory-supplier",
        element: <InventorySupplier />,
      },
      {
        path: "/Inventory/InventorySupplierForm",
        element: <InventorySupplierForm />,
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
      {
        path: "/UpdateCustomerForm/:id",
        element: <UpdateCustomerForm />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BASE_API}/customer/show/${params.id}`),
      },
      // Reports
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
      // billing
      {
        path: "/billing/Yamaha",
        element: <Yamaha />,
      },
      {
        path: "/billing/Hatim",
        element: <Hatim />,
      },
      {
        path: "/billing/HatimPubail",
        element: <HatimPubail />,
      },
      {
        path: "/billing/Suzuki",
        element: <Suzuki />,
      },
      {
        path: "/billing/Honda",
        element: <Honda />,
      },
      // Account
      {
        path: "/account/CashDispatch",
        element: <CashDispatch />,
      },
      {
        path: "/account/CashDispatchForm",
        element: <CashDispatchForm />,
      },
      {
        path: "/account/PaymentList",
        element: <PaymentList />,
      },
      {
        path: "/account/PaymentReceive",
        element: <PaymentReceive />,
      },
      {
        path: "/account/PaymentReceiveForm",
        element: <PaymentReceiveForm />,
      },
      {
        path: "/account/CustomerLedger",
        element: <CustomerLedger />,
      },
      {
        path: "/account/SupplierLedger",
        element: <SupplierLedger />,
      },
      {
        path: "/account/DriverLedger",
        element: <DriverLedger />,
      },
      {
        path: "/account/VendorLedger",
        element: <VendorLedger />,
      },
      {
        path: "/account/OfficeLedger",
        element: <OfficeLedger />,
      },
    ],
  },
]);
