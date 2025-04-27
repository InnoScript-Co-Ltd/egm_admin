import { paginateOptions } from "../../constants/config";

export const balancePayload = {
  columns: [
    {
      field: "amount",
      header: "Amount",
      sortable: true,
      show: true,
    },
    {
      field: "date",
      header: "Date",
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
      field: "receipt_id",
      header: "Receipt Id",
      sortable: true,
      show: true,
    },
    { field: "type", header: "Type", sortable: true, show: true },
  ],
  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "amount,date,description,receipt_id,type",
    search: "",
    order: "id",
    sort: "DESC",
  },
};
