import { paths } from "../../constants/paths";
import { RepaymentCreate } from "./entry/RepaymentCreate";
import { RepaymentUpdate } from "./entry/RepaymentUpdate";
import { RepaymentList } from "./views/RepaymentList";

export const repaymentRoutes = [
  {
    id: "repaymentList",
    path: paths.repayment,
    element: <RepaymentList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Create", url: paths.repaymentCreate },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },

  {
    id: "repaymentCreate",
    path: `${paths.repayment}/new`,
    element: <RepaymentCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          //   { label: "Repayment List", url: paths.repayment },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "repaymentUpdate",
    path: `${paths.repayment}/:id`,
    element: <RepaymentUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          //   { label: "Repayment", url: paths.repayment },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
];
