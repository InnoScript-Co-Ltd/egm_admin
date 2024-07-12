import { paginateOptions } from "../../constants/config";

export const packagePayload = {
    create: {
        name: "",
        roi_rate: "",
        duration: "",
        deposit_rate: "",
    },
    update: {
        name: "",
        roi_rate: "",
        duration: "",
        deposit_rate: "",
        status: ""
    },
    columns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "roi_rate", header: "ROI Rate (Monthly %)", sortable: true, show: true },
        { field: "roi_rate_yearly", header: "ROI Rate (Yearly %)", sortable: true, show: true },
        { field: "duration", header: "Duration (Yearly)", sortable: true, show: true },
        { field: "deposit_rate", header: "Deposit Amount", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,roi_rate,duration,deposit_rate",
        search: "",
        order: "id",
        sort: "DESC"
    }
}