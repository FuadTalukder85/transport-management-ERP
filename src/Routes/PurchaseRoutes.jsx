import AddSupply from "../Pages/Purchase/AddSupply";
import PurchaseForm from "../Pages/Purchase/PurchaseForm";
import PurchaseList from "../Pages/Purchase/PurchaseList";
import SupplierList from "../Pages/Purchase/SupplierList";
import UpdatePurchaseForm from "../Pages/Purchase/UpdatePurchaseForm";
import UpdateSupplyForm from "../Pages/Purchase/UpdateSupplyForm";
import PrivateRoute from "./PrivateRoute";

export const PurchaseRoutes = [
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
];
