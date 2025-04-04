import { paginateOptions } from "../../constants/config";

export const repaymentPayload = {
    update: {
        count_days: "",
        total_days: "",
        amount: "",
        oneday_amount: "",
        total_amount: "",
        date: "",
        created_at: "",
        updated_at: "",
        status: ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "transaction_id", header: "Transaction ID", sortable: true, show: true },
        { field: "deposit_id", header: "Deposit ID", sortable: true, show: true },
        { field: "partner_id", header: "Partner ID", sortable: true, show: true },
        { field: "count_days", header: "Count Days", sortable: true, show: true },
        { field: "total_days", header: "Total Days", sortable: true, show: true },
        { field: "amount", header: "Amount", sortable: true, show: true },
        { field: "oneday_amount", header: "One Day Amount", sortable: true, show: true },
        { field: "total_amount", header: "Total Amount", sortable: true, show: true },
        { field: "date", header: "Repayment Date", sortable: true, show: true },
        { field: "created_at", header: "Created At", sortable: true, show: true },
        { field: "updated_at", header: "Updated At", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,transaction_id,deposit_id,partner_id,agent_id,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}