import { paginateOptions } from "../../constants/config";

export const bankAccountTypePayload = {
        create: {
            bank_name: "",
            bank_type: "",
            logo: ""
        },
        update: {
            bank_name: "",
            bank_type: "",
            logo: ""
        },
        searchableFields: "bank_name,bank_type",
        columns: [
            { field: "bank_name", header: "Bank Name", sortable: true, show: true },
            { field: "bank_type", header: "Bank Type", sortable: true, show: true },
            { field: "logo", header: "Logo", sortable: true, show: true },
            { field: "status", header: "Status", sortable: true, show: true }
        ],
        paginateParams: {
            page: 1,
            per_page: paginateOptions.rows,
            columns: "bank_name,bank_type,logo,status",
            search: "",
            order: "id",
            sort: "DESC",
            filter: "status",
            value: "",
            start_date: '',
            end_date: ''
        }
}