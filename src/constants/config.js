import { Button } from "primereact/button";
import { getData } from "../helpers/localstorage";

const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
// const paginatorRight = <Button type="button" icon="pi pi-download" text />;

export const digitalOcenToken = {
    egm_space_access_key: "DO0073VTCE6B7PQT7ZG4",
    eng_space_secret_key: "BWYxZfW6yTdfJO1s4/xUAz3xCZBia4lhvOFPJDhX1LY",
    egm_token: "dop_v1_889c18d431e45425bbdae3520a3ecfe22569d1fada2e372ac4c75f3a4bd8c8dd"
}

export const firebaseConfig = {
    apiKey: "AIzaSyC3e9K_RlhPHMQMI_AOoZ71Oqx0CD1mSMA",
    authDomain: "evanglobalmanagement.firebaseapp.com",
    projectId: "evanglobalmanagement",
    storageBucket: "evanglobalmanagement.appspot.com",
    messagingSenderId: "942057067166",
    appId: "1:942057067166:web:bfaa597bf8b50ca270618f",
    measurementId: "G-BGLCQ9M6XS"
};

export const env = [
    'http://localhost:8000',
    'https://api.evanglobalmanagement.com',
];

export const paginateOptions = {
    rows: 100,
    rowsPerPageOptions: [10, 50, 100, 150, 500, 1000],
    total: 0,
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "{first} to {last} of {totalRecords}",
    paginatorLeft: paginatorLeft,
    sortMode: "single",
    resizableColumns: true,
    lazy: true
}

export const keys = {
    API_TOKEN: "TOKEN",
    USER: "USER",
    PERMISSION: "PERMISSION",
    ROLE: "ROLE",
    LANGUAGE: "LANGUAGE"
}

export const bankTypes = [
    {
        label: "AYA BANK",
        value: "aya_bank",
        icon: ""
    },
    {
        label: "CB BANK",
        value: "cb_bank",
        icon: ""
    },
    {
        label: "UAB BANK",
        value: "uab_bank",
        icon: ""
    },
    {
        label: "KBZ BANK SPECIAL ACC",
        value: "kbz_bank_special",
        icon: ""
    },
    {
        label: "A BANK",
        value: "a_bank",
        icon: ""
    },
    {
        label: "MCB BANK",
        value: "mcb_bank",
        icon: ""
    },

    {
        label: "YOMA (Flexi every day)",
        value: "yoma_bank_flexi",
        icon: ""
    },
    {
        label: "YOMA (Flexi saving)",
        value: "yoma_bank_flexi_saving",
        icon: ""
    },
    {
        label: "YOMA (Flexi acc)",
        value: "yoma_bank_flexi_acc",
        icon: ""
    },

]


export const ReferralLinkType = {
    LEVEL_FOUR_REFERRAL: "LEVEL_FOUR_REFERRAL",
    CLIENT_REFERRAL: "CLIENT_REFERRAL",
    COMMISSION_REFERRAL: "COMMISSION_REFERRAL"
}

export const AgentType = {
    MAIN_AGENT: "MAIN_AGENT",
    SUB_AGENT: "SUB_AGENT"
}

export const notificationOptions = {
    severity: "info",
    sticky: false,
    life: 2000,
    closable: true,
    icon: "pi pi-info-circle",
}

export const statusOptions = [
    { status: "ACTIVE", color: "chip-success" },
    { status: "FULL_KYC", color: "chip-success" },
    { status: "DISABLE", color: "chip-default" },
    { status: "DELETED", color: "chip-info" },
    { status: "PENDING", color: "chip-warn" },
    { status: "CHECKING", color: "chip-warn" },
    { status: "BLOCK", color: "chip-danger" },
    { status: "COMPLETE", color: "chip-success" },
    { status: "MEMBER_WALLET", color: "chip-success" },
    { status: "CASH", color: "chip-info" },
    { status: "ONLINE_PAYMENT", color: "chip-warn" }
];

export const tooltipOptions = {
    position: 'top'
}

export const auditColumns = [
    { field: "created_by", header: "Created By" },
    { field: "updated_by", header: "Updated By" },
    { field: "created_at", header: "Created At" },
    { field: "updated_at", header: "Updated At" },
    { field: "deleted_at", header: "Deleted At" },
];

export const responsiveOptions = [
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
];

export const itemTemplate = (item) => {
    return <img src={item?.itemImageSrc} alt={'GSC Export'} style={{ width: '100%', minHeight: '368px', display: 'block' }} />;
}

export const thumbnailTemplate = (item) => {
    return <img width={100} height={80} src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
}

/**
 * Language / Region / Country
 */
export const countries = [
    { name: 'China', code: 'CN' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'English', code: 'UK' }
];
export const defaultLanguage = getData(keys.LANGUAGE) ? getData(keys.LANGUAGE) : countries[1];

export const renderHeader = () => {
    return (
        <span className="ql-formats">
            <select className="ql-font">
                <option value="serif"></option>
                <option value="sans-serif"></option>
                <option value="monospace"></option>
            </select>
            <select className="ql-size">
                <option value="small"></option>
                <option value="large"></option>
                <option value="huge"></option>
            </select>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
            <button className="ql-align" aria-label="Align"></button>
            <button className="ql-color" aria-label="Color"></button>
            <button className="ql-background" aria-label="Background"></button>
            <button className="ql-list" aria-label="Ordered"></button>
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
            <button className="ql-code" aria-label="Code"></button>
            <button className="ql-link" aria-label="Link"></button>
            <button className="ql-clean" aria-label="Clean"></button>
        </span>
    );
};