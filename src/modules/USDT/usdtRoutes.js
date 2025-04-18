import { paths } from "../../constants/paths";
import { USDTList } from "./view/USDTList";
import { USDTCreate } from "./entry/USDTCreate";
import { USDTUpdate } from "./entry/USDTUpdate";

export const usdtRoutes = [
  {
    id: "USDTList",
    path: paths.usdt,
    element: <USDTList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Create", url: `${paths.usdt}/new` },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "USDTCreate",
    path: `${paths.usdt}/new`,
    element: <USDTCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "USDT List", url: paths.usdt },
          { label: "Create", url: `${paths.usdt}/new` },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "USDTUpdate",
    path: `${paths.usdt}/:id`,
    element: <USDTUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "USDT List", url: paths.usdt },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
];
