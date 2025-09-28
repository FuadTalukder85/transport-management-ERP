import AddStock from "../Pages/Inventory/AddStock";
import InventorySupplier from "../Pages/Inventory/InventorySupplier";
import InventorySupplierForm from "../Pages/Inventory/InventorySupplierForm";
import StockOut from "../Pages/Inventory/StockOut";
import StockOutForm from "../Pages/Inventory/StockOutForm";
import Stockin from "../Pages/Inventory/Stockin";

export const InventoryRoutes = [
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
];
