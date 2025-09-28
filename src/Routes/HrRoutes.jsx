import AddHelper from "../Pages/AddHelper";
import AddEmployee from "../Pages/HR/HRM/AddEmployee";
import AttendanceForm from "../Pages/HR/HRM/AttendanceForm";
import AttendanceList from "../Pages/HR/HRM/AttendanceList";
import EmployeeList from "../Pages/HR/HRM/Employee-list";
import Office from "../Pages/HR/HRM/Office";
import OfficeForm from "../Pages/HR/HRM/OfficeForm";
import UpdateEmployeeForm from "../Pages/HR/HRM/UpdateEmployeeForm";
import UpdateOfficeForm from "../Pages/HR/HRM/UpdateOfficeForm";
import Leave from "../Pages/HR/Leave";
import LeaveForm from "../Pages/HR/LeaveForm";
import AdvanceSalary from "../Pages/HR/Payroll/AdvanceSalary";
import AdvanceSalaryForm from "../Pages/HR/Payroll/AdvanceSalaryForm";
import GenerateSalary from "../Pages/HR/Payroll/GenerateSalary";
import GenerateSalaryForm from "../Pages/HR/Payroll/GenerateSalaryForm";
import UpdateLeaveForm from "../Pages/HR/UpdateLeaveForm";
import HelperList from "../Pages/HelperList";
import PrivateRoute from "./PrivateRoute";

export const HrRoutes = [
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
];
