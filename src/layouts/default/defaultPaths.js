import { paths } from "../../constants/paths";

export const items = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-desktop',
        url: "/dashboard"
    },
    {
        key: 'package',
        label: 'Package',
        data: 'Package',
        icon: 'pi pi-fw pi-user',
        url: paths.package
    },
    {
        key: "partner",
        label: "Partner",
        icon: "pi pi-fw pi-user-plus",
        url: paths.partner
    },
    
    {
        key: 'agent',
        label: 'Agent',
        data: 'Agent',
        icon: 'pi pi-fw pi-user',
        url: null,
        children: [
            {
                key: 'main_agent',
                label: 'Main Agent',
                icon: 'pi pi-fw pi-list',
                url: `${paths.agent}/MAIN_AGENT`
            },
            {
                key: 'sub_agent',
                label: 'Sub Agent',
                icon: 'pi pi-fw pi-list',
                url: `${paths.transaction}/SUB_AGENT`
            },
        ]
    },
    {
        key: "Transactions",
        label: "Transaction",
        icon: "pi pi-fw pi-money-bill",
        url: null,
        children: [
            {
                key: 'agent_deposit',
                label: 'Agent Deposit',
                icon: 'pi pi-fw pi-list',
                url: `${paths.transaction}/agent/DEPOSIT_PENDING`
            },
            {
                key: 'partner_deposit',
                label: 'Partner Deposit',
                icon: 'pi pi-fw pi-list',
                url: `${paths.transaction}/partner/DEPOSIT_PENDING`
            },
        ]
    },
    {
        key: "bank_account",
        label: "Bank Accounts",
        icon: "pi pi-fw pi-credit-card",
        url: null,
        children: [
            {
                key: 'merchant_bank_account',
                label: 'Merechant',
                icon: 'pi pi-fw pi-list',
                url: paths.merchantBankAccount
            },
            {
                key: 'bank_type',
                label: 'Bank Type',
                icon: 'pi pi-fw pi-list',
                url: paths.bankAccountType
            },
        ]
    },
    {
        key: "location",
        label: "Location",
        icon: "pi pi-fw pi-map-marker",
        url: null,
        children: [
            {
                key: 'location.country',
                label: 'Countries',
                icon: 'pi pi-fw pi-list',
                url: paths.country
            },
        ]
    },
    {
        key: 'email',
        label: 'Email',
        data: 'Email',
        icon: 'pi pi-fw pi-envelope',
        children: [
            {
                key: 'email_content',
                label: 'Content',
                icon: 'pi pi-fw pi-list',
                url: paths.emailContent
            },
        ]
    },
    {
        key: 'menu_role_and_permission',
        label: 'Role & Permission',
        icon: 'pi pi-fw pi-lock',
        children: [
            {
                key: 'menu_role_and_permission_permission',
                label: 'Permission',
                icon: 'pi pi-fw pi-list',
                url: paths.permission
            },
            {
                key: 'menu_role_and_permission_role',
                label: 'role',
                icon: 'pi pi-fw pi-list',
                url: paths.role
            },
        ]
    },
    
    {
        key: 'bonus-point',
        label: 'Bonus Point',
        data: null,
        icon: 'pi pi-fw pi-ticket',
        url: paths.bonusPoint,
    },

    {
        key: 'setting',
        url: "/setting",
        label: 'Setting',
        icon: 'pi pi-fw pi-cog'
    },

];
