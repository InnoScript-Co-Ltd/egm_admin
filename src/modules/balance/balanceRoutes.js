import { paths } from "../../constants/paths";
import { BalanceList } from "./views/BalanceList";

export const balanceRoutes = [
  {
    id: "balanceList",
    path: paths.balance,
    element: <BalanceList />,
    loader: () => {
      return {
        breadcrumbs: [{ label: "Dashboard", url: paths.dashboard }],
        role: ["ADMINISTRATOR"],
      };
    },
  },
];
