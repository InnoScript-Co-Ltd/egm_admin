import { paths } from "../../constants/paths"
import { RoleCreate } from "./entry/RoleCreate"
import { RoleDetail } from "./view/RoleDetail"

export const authorizationRoutes = [
    {
        id: "roleCreate",
        path: paths.roleCreate,
        element : <RoleCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: 'Dashboard', url : '/' },
                    { label : "List", url: paths.role }
                ]
            }
        }
    },
    {
        id: "roleDetail",
        path: `/${paths.role}/:id`,
        element: <RoleDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.role }
                ]
            }
        }
    },
]