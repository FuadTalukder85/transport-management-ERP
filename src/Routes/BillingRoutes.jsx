import Hatim from "../Pages/Billing/Hatim";
import HatimPubail from "../Pages/Billing/HatimPubail";
import Honda from "../Pages/Billing/Honda";
import Suzuki from "../Pages/Billing/Suzuki";
import Yamaha from "../Pages/Billing/Yamaha";

export const BillingRoutes = [
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
];
