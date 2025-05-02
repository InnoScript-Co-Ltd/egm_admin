import { paths } from "../../constants/paths";
import { MerchantBankAccountCreate } from "./entry/MerchantBankAccountCreate";
import { MerchantBankAccountUpdate } from "./entry/MerchantBankAccountUpdate";
import { MerchantBankAccountList } from "./view/MerchantBankAccountList";
import { TransactionInMerchantBankAccountList } from "./view/TransactionInMerchantBankAccountList";

export const merchantBankAccountRoutes = [
  {
    id: "merchantBankAccountList",
    path: paths.merchantBankAccount,
    element: <MerchantBankAccountList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Create", url: `${paths.merchantBankAccount}/new` },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "transactionInMerchantBankAccountList",
    path: `${paths.transactionInMerchantBankAccount}/:id`,
    element: <TransactionInMerchantBankAccountList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Merchant Bank Accounts", url: paths.merchantBankAccount },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "merchantBankAccountUpdate",
    path: `${paths.merchantBankAccount}/:id`,
    element: <MerchantBankAccountUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Merchant Bank Accounts", url: paths.merchantBankAccount },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "merchantBankAccountCreate",
    path: `${paths.merchantBankAccount}/new`,
    element: <MerchantBankAccountCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Merchant Bank Accounts", url: paths.merchantBankAccount },
          { label: "Create", url: `${paths.merchantBankAccount}/new` },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
];
