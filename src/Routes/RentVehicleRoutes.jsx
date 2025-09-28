import AddRentVehicleForm from "../Pages/AddRentVehicleForm";
import RentList from "../Pages/RentList";
import UpdateRentVehicleForm from "../Pages/UpdateRentVehicleForm";
import PrivateRoute from "./PrivateRoute";

export const RentVehicleRoutes = [
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
];
