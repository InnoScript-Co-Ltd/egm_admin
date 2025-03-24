import { paginateOptions } from "../../constants/config";

export const bonusPointPayload = {
    create: {
        label: "",
        limit_amount: "",
    },
    update: {
        label: "",
        limit_amount: "",
        status: ""
    },
    columns: [
        { field: "action", header: "Action", sortable: false, show: true },
        { field: "label", header: "Label", sortable: true, show: true },
        { field: "limit_amount", header: "Limit Amount", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "label,limit_amount,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}