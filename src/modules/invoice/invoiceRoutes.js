import { paths } from "../../constants/paths";
import { InvoiceList } from "./views/InvoiceList";
import { Invoice } from "./views/Invoice";

export const invoiceRoutes = [
  {
    id: "invoiceList",
    path: paths.invoice,
    element: <InvoiceList />,
    loader: () => {
      return {
        breadcrumbs: [{ label: "Dashboard", url: paths.dashboard }],
        role: ["ADMINISTRATOR"],
      };
    },
  },

  {
    id: "invoice-detail",
    path: `${paths.invoice}/:invoice_uuid`,
    element: <Invoice />,
    loader: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: paths.dashboard },
          { label: "Invoice List", url: paths.invoice },
        ],
        role: ["ADMINISTRATOR"],
      };
    },
  },
];
