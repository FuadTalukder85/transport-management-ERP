import AddCarForm from "../Pages/AddCarForm";
import AddDriverForm from "../Pages/AddDriverForm";
import DriverList from "../Pages/DriverList";
import CarList from "../Pages/CarList";
import UpdateCarForm from "../Pages/UpdateCarForm";
import UpdateDriverForm from "../Pages/updateForm/UpdateDriverForm";
import PrivateRoute from "./PrivateRoute";
import TripList from "../Pages/TripList";
import AddTripForm from "../Pages/AddTripForm";
import UpdateTripForm from "../Pages/updateForm/UpdateTripForm";

export const FleetRoutes = [
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
];
