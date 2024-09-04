import { paginateOptions } from "../../constants/config";

export const emailContentPayload = {
    create: {
        country_id: "", 
        country_code: "",
        template: "",
        content_type: "",
        title: "",
        content: "",
    },
    update: {
        country_id: "", 
        country_code: "",
        template: "",
        content_type: "",
        title: "",
        content: "",
        status: ""  
    },
    searchableFields: "country_code,template,title,content",
    columns: [
        { field: "title", header: "Title", sortable: true, show: true },
        { field: "country_code", header: "Country Code", sortable: true, show: true },
        { field: "template", header: "Template Name", sortable: true, show: true },
        { field: "content_type", header: "Content Type", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "",
        search: "",
        order: "id",
        sort: "DESC",
        filter: "status",
        value: "",
        start_date: '',
        end_date: ''
    }
}