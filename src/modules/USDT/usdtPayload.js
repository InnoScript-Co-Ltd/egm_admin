import { paginateOptions } from "../../constants/config";

export const usdtPayload = {
  create: {
    partner_id: "",
    email: "",
    phone: "",
    name: "",
    address: "",
    address_type: "",
    status: "",
  },
  update: {
    partner_id: "",
    email: "",
    phone: "",
    name: "",
    address: "",
    address_type: "",
    status: "",
  },
  searchableFields: "bank_name,bank_type",
  columns: [
    { field: "partner_id", header: "Partner ID", sortable: true, show: true },
    { field: "email", header: "Email", sortable: true, show: true },
    { field: "phone", header: "Phone", sortable: true, show: true },
    { field: "name", header: "Name", sortable: true, show: true },
    { field: "address", header: "Address", sortable: true, show: true },
    {
      field: "address_type",
      header: "Address Type",
      sortable: true,
      show: true,
    },
    { field: "status", header: "Status", sortable: true, show: true },
  ],
  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "partner_id,email,phone,name,address,address_type,status",
    search: "",
    order: "id",
    sort: "DESC",
    filter: "status",
    value: "",
    start_date: "",
    end_date: "",
  },
};
