import CashDispatch from "../Pages/Account/CashDispatch";
import CashDispatchForm from "../Pages/Account/CashDispatchForm";
import CustomerLedger from "../Pages/Account/CustomerLedger";
import DriverLedger from "../Pages/Account/DriverLedger";
import OfficeLedger from "../Pages/Account/OfficeLedger";
import PaymentList from "../Pages/Account/PaymentList";
import PaymentReceive from "../Pages/Account/PaymentReceive";
import PaymentReceiveForm from "../Pages/Account/PaymentReceiveForm";
import SupplierLedger from "../Pages/Account/SupplierLedger";
import VendorLedger from "../Pages/Account/VendorLedger";

export const AccountsRoutes = [
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
];
