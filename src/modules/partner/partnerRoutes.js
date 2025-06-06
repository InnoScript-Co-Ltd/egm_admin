import { paths } from "../../constants/paths";
import { PartnerCreate } from "./entry/PartnerCreate";
import { PartnerUpdate } from "./entry/PartnerUpdate";
import { PartnerList } from "./view/PartnerList";
import { PartnerTransactionList } from "./view/PartnerTransactionList";

export const partnerRoutes = [
  {
    id: "partnerList",
    path: paths.partner,
    element: <PartnerList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Create", url: `${paths.partner}/new` },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "partnerTransactionList",
    path: `${paths.partner}/:id/transactions`,
    element: <PartnerTransactionList />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Partners", url: paths.partner },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "partnerUpdate",
    path: `${paths.partner}/:id`,
    element: <PartnerUpdate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Partners", url: paths.partner },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
  {
    id: "partnerCreate",
    path: `${paths.partner}/new`,
    element: <PartnerCreate />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Partner", url: paths.partner },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
];
