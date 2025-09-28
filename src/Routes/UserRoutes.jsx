import AddUserForm from "../Pages/AddUserForm";
import AllUsers from "../Pages/AllUsers";
import UpdateUsersForm from "../Pages/updateForm/UpdateUsersForm";
import Login from "../components/Form/Login";
import ResetPass from "../components/Form/ResetPass";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

export const UserRoutes = [
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
];
