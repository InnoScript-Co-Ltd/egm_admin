import { paths } from "../../constants/paths";
import { TransactionHistoryList } from "./views/TransactionHistoryList";
import { WithdrawHistoryList } from "./views/WithdrawHistoryList";
import { RepaymentHistoryList } from "./views/RepaymentHistoryList";

export const historyRoutes = [
  {
    id: "transactionhistoryList",
    path: paths.transaction_history,
    element: <TransactionHistoryList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "history", url: paths.history },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },

  {
    id: "withdrawhistoryList",
    path: paths.with_draw,
    element: <WithdrawHistoryList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "history", url: paths.history },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },

  {
    id: "repaymenthistoryList",
    path: paths.repayment_history,
    element: <RepaymentHistoryList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "history", url: paths.history },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
];
