import { paginateOptions } from "../../constants/config";

export const promotionPayload = {
        create: {
            title: "",
            image: "",
            description: ""
        },
        update: {
            bank_name: "",
            bank_type: "",
            logo: ""
        },
        searchableFields: "bank_name,bank_type",
        columns: [
            { field: "title", header: "Title", sortable: true, show: true },
            { field: "image", header: "Image", sortable: true, show: true },
            { field: "description", header: "Description", sortable: true, show: true }
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