import { paginateOptions } from "../../constants/config";

export const invoicePayload = {
  columns: [
    {
      field: "invoice_uuid",
      header: "Invoice Uuid",
      sortable: true,
      show: true,
    },
    {
      field: "amount",
      header: "Amount",
      sortable: true,
      show: true,
    },
    {
      field: "invoice_period",
      header: "Date",
      sortable: true,
      show: true,
    },
    {
      field: "invoice_id",
      header: "Invoice Id",
      sortable: true,
      show: true,
    },
    { field: "status", header: "Status", sortable: true, show: true },
  ],
  columns2: [
    { field: "index", header: "#", sortable: false, show: true },

    {
      field: "product",
      header: "Product",
      sortable: true,
      show: true,
    },
    {
      field: "description",
      header: "Description",
      sortable: true,
      show: true,
    },
    {
      field: "amount",
      header: "Amount",
      sortable: true,
      show: true,
    },
    {
      field: "duration",
      header: "Duration",
      sortable: true,
      show: true,
    },
    {
      field: "duration_unit",
      header: "Duration Unit",
      sortable: true,
      show: true,
    },
    {
      field: "start_time",
      header: "Start Date",
      sortable: true,
      show: true,
    },
    {
      field: "end_time",
      header: "End Date",
      sortable: true,
      show: true,
    },
    {
      field: "category",
      header: "Category",
      sortable: true,
      show: true,
    },
  ],
  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "invoice_uuid,amount,invoice_period,invoice_id,status",
    search: "",
    order: "id",
    sort: "DESC",
  },
};
