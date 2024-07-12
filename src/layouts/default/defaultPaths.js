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
