import { paginateOptions } from "../../constants/config";

export const historyPayload = {
  create: {
    name: "",
    history_type: "",
    roi_rate: "",
    duration: "",
    deposit_amount: "",
  },
  update: {
    name: "",
    history_type: "",
    roi_rate: "",
    duration: "",
    deposit_amount: "",
    status: "",
  },
  columns: [
    { field: "name", header: "Name", sortable: true, show: true },
    {
      field: "history_type",
      header: "history Type",
      sortable: true,
      show: true,
    },
    {
      field: "roi_rate",
      header: "ROI Rate (Monthly %)",
      sortable: true,
      show: true,
    },
    {
      field: "roi_rate_yearly",
      header: "ROI Rate (Yearly %)",
      sortable: true,
      show: true,
    },
    {
      field: "duration",
      header: "Duration (Yearly)",
      sortable: true,
      show: true,
    },
    {
      field: "deposit_amount",
      header: "Deposit Amount",
      sortable: true,
      show: true,
    },
    { field: "status", header: "Status", sortable: true, show: true },
  ],
  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "id,name,roi_rate,duration,history_type",
    search: "",
    order: "id",
    sort: "DESC",
  },
};
