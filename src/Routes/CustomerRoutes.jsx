import AddCustomer from "../Pages/Customer/AddCustomer";
import Customer from "../Pages/Customer/Customer";
import UpdateCustomerForm from "../Pages/Customer/UpdateCustomerForm";

export const CustomerRoutes = [
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
];
