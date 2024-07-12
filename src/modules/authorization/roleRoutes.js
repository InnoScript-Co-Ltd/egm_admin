import { paths } from "../../constants/paths"
import { PermissionUpdate } from "./entry/PermissionUpdate"
import { RoleList } from "./view/RoleList"


export const roleRoutes = [
    {
        id: "roleLists",
        path: paths.role,
        element : <RoleList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Role & Permission", url: null },
                    { label: "Permission", url: paths.permission },
                    { label: "Role", url: paths.role },
                    { label: "Role Create", url: `${paths.role}/new` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    // {
    //     id: "permissionUpdate",
    //     path: `${paths.permission}/:id`,
    //     element : <PermissionUpdate />,
    //     loader: () => {
    //         return {
    //             breadcrumbs: [
    //                 { label: "Dashboard", url: "/" },
    //                 { label: "Role & Permission", url: null },
    //                 { label: "Permission", url: paths.permission },
    //                 { label: "Role", url: paths.role },
    //             ],
    //             role: ['ADMINISTRATOR']
    //         }
    //     }
    // },
]