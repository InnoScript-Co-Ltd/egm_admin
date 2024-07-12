import { paths } from "../../constants/paths"
import { PermissionUpdate } from "./entry/PermissionUpdate"
import { PermissionList } from "./view/PermissionList"


export const permissionRoutes = [
    {
        id: "permissionList",
        path: paths.permission,
        element : <PermissionList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Role & Permission", url: null },
                    { label: "Role", url: paths.role },
                    { label: "Permission", url: paths.permission },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "permissionUpdate",
        path: `${paths.permission}/:id`,
        element : <PermissionUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Role & Permission", url: null },
                    { label: "Permission", url: paths.permission },
                    { label: "Role", url: paths.role },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]