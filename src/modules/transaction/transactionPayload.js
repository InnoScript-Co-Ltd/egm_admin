import { paginateOptions } from "../../constants/config";

export const transactionPayload = {
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
        { field: "action", header: "Action", sortable: false, show: true},
        { field: "sender_name", header: "Agent Name", sortable: true, show: true },
        { field: "sender_account_name", header: "Agent Account Name", sortable: true, show: true },
        { field: "sender_account_number", header: "Agent Account", sortable: true, show: true },
        { field: "bank_type", header: "Bank", sortable: true, show: true },
        { field: "merchant_account_name", header: "Merchant Name", sortable: true, show: true },
        { field: "merchant_account_number", header: "Merchant Account", sortable: true, show: true },
        { field: "package_deposit_amount", header: "Deposit Amount", sortable: true, show: true },
        { field: "package_name", header: "Package Name", sortable: true, show: true },
        { field: "package_roi_rate", header: "ROI Rate", sortable: true, show: true },
        { field: "package_duration", header: "Duration", sortable: true, show: true },
        { field: "commession", header: "Commession", sortable: true, show: true },
        { field: "sender_phone", header: "Agent Phone", sortable: true, show: true },
        { field: "sender_email", header: "Agent email", sortable: true, show: true },
        { field: "sender_nrc", header: "Agent NRC", sortable: true, show: true },
        { field: "sender_bank_branch", header: "Agent Bank Branch", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
        { field: "created_at", header: "Deposit Date", sortable: true, show: true },
        { field: "updated_at", header: "Approve Date", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,agent_name,agent_account_name,agent_account_number,bank_type,merchant_account_name,merchant_account_number,package_deposit_amount,package_name,package_roi_rate,package_duration,agent_phone,agent_email,agent_nrc,agent_bank_branch,agent_bank_address",
        search: "",
        order: "id",
        sort: "DESC"
    }
}