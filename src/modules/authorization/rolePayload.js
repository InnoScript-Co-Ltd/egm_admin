import { paginateOptions } from "../../constants/config";

export const rolePayload = {
    createL : {
        name: "",
        description: ""
    },
    update: {
        name: "",
        description : '',
    },
    columns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: 'description', header: "Description", sortable: true, show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,description",
        search: "",
        order: "id",
        sort: "DESC"
    },
}