import AddVendorForm from "../Pages/AddVendorForm";
import UpdateVendorForm from "../Pages/UpdateVendorForm";
import VendorList from "../Pages/VendorList";
import PrivateRoute from "./PrivateRoute";

export const VendorRoutes = [
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
];
