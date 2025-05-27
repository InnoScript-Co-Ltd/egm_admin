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
  secondColumns: [
    { field: "action", header: "Action", sortable: false, show: true },
    { field: "sender_name", header: "Name", sortable: true, show: true },
    { field: "sender_type", header: "Type", sortable: true, show: true },
    {
      field: "sender_account_name",
      header: "Account Name",
      sortable: true,
      show: true,
    },
    {
      field: "sender_account_number",
      header: "Account No.",
      sortable: true,
      show: true,
    },
    { field: "bank_type", header: "Bank", sortable: true, show: true },
    {
      field: "merchant_account_name",
      header: "Merchant Name",
      sortable: true,
      show: true,
    },
    {
      field: "merchant_account_number",
      header: "Merchant Account",
      sortable: true,
      show: true,
    },
    {
      field: "package_deposit_amount",
      header: "Deposit Amount",
      sortable: true,
      show: true,
    },
    {
      field: "package_name",
      header: "Package Name",
      sortable: true,
      show: true,
    },
    {
      field: "package_roi_rate",
      header: "ROI Rate",
      sortable: true,
      show: true,
    },
    {
      field: "package_duration",
      header: "Duration",
      sortable: true,
      show: true,
    },
    { field: "commession", header: "Commession", sortable: true, show: true },
    { field: "sender_phone", header: "Phone", sortable: true, show: true },
    { field: "sender_email", header: "Email", sortable: true, show: true },
    { field: "sender_nrc", header: "NRC", sortable: true, show: true },
    {
      field: "sender_bank_branch",
      header: "Bank Branch",
      sortable: true,
      show: true,
    },
    { field: "status", header: "Status", sortable: true, show: true },
    { field: "created_at", header: "Deposit Date", sortable: true, show: true },
    { field: "updated_at", header: "Approve Date", sortable: true, show: true },
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
  paginateTransactionParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns:
      "id,sender_name,sender_type,sender_account_name,sender_account_number,bank_type,merchant_account_name,merchant_account_number,package_deposit_amount,package_name,package_roi_rate,package_duration,sender_phone,sender_email,sender_nrc,sender_bank_branch",
    search: "",
    order: "id",
    sort: "DESC",
  },
};
