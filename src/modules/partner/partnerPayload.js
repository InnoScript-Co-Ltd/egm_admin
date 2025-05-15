import { paginateOptions } from "../../constants/config";

export const partnerPayload = {
  create: {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  },

  update: {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    nrc: "",
    dob: "",
  },

  searchableFields:
    "first_name,last_name,username,email,phone,nrc,dob,kyc_status,status",
  columns: [
    { field: "username", header: "Username", sortable: true, show: true },
    { field: "first_name", header: "First Name", sortable: true, show: true },
    { field: "last_name", header: "Last Name", sortable: true, show: true },
    { field: "email", header: "Email", sortable: true, show: true },
    { field: "phone", header: "Phone", sortable: true, show: true },
    { field: "roi", header: "ROI Rate", sortable: true, show: true },
    { field: "nrc", header: "NRC", sortable: true, show: true },
    { field: "dob", header: "DOB", sortable: true, show: true },
    { field: "address", header: "Address", sortable: true, show: true },
    { field: "kyc_status", header: "KYC Status", sortable: true, show: true },
    { field: "status", header: "Status", sortable: true, show: true },
  ],

  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns:
      "first_name,last_name,username,email,phone,nrc,dob,kyc_status,status",
    search: "",
    order: "id",
    sort: "DESC",
    filter: "status",
    value: "",
    start_date: "",
    end_date: "",
  },
};
