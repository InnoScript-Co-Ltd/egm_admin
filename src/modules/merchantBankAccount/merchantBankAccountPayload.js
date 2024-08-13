import { paginateOptions } from "../../constants/config";

export const merchantBankAccountPayload = {
    create: {
        bank_type: "",
        holder_name: "",
        account_number: ""
    },
    update: {
        bank_type: "",
        holder_name: "",
        account_number: "",
        status: ""  
    },
    searchableFields: "holder_name,account_number",
    columns: [
        { field: "holder_name", header: "Holder Name", sortable: true, show: true },
        { field: "account_number", header: "Account Number", sortable: true, show: true },
        { field: "bank_type", header: "Bank Type", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "holder_name,account_number,bank_type,status",
        search: "",
        order: "id",
        sort: "DESC",
        filter: "status",
        value: "",
        start_date: '',
        end_date: ''
    }
}