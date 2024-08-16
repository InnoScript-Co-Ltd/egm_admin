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
        url: paths.agent
    },
    {
        key: 'package',
        label: 'Package',
        data: 'Package',
        icon: 'pi pi-fw pi-user',
        url: paths.package
    },
    {
        key: "deposit",
        label: "Deposit",
        icon: "pi pi-fw pi-money-bill",
        url: null,
        children: [
            {
                key: 'deposint_pending',
                label: 'Pending',
                icon: 'pi pi-fw pi-list',
                url: `${paths.deposit}/pending`
            },
            {
                key: 'deposint_reject',
                label: 'Reject',
                icon: 'pi pi-fw pi-list',
                url: `${paths.deposit}/reject`
            },
            {
                key: 'deposint_payment_accepted',
                label: 'Payment Accepted',
                icon: 'pi pi-fw pi-list',
                url: `${paths.deposit}/payment_accepted`
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
        key: 'setting',
        url: "/setting",
        label: 'Setting',
        icon: 'pi pi-fw pi-cog'
    },
];
