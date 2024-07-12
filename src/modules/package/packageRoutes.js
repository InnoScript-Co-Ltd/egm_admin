import { paths } from "../../constants/paths"
import { PackageCreate } from "./entry/PackageCreate"
import { PackageUpdate } from "./entry/PackageUpdate"
import { PackageList } from "./views/PackageList"

export const packageRoutes = [
    {
        id: "packageList",
        path: paths.package,
        element: <PackageList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Package", url: paths.package },
                    { label: "Create", url: `${paths.package}/new` }
                ],
                role: ['ADMINISTRATOR']
            }
        },
        
    },
    {
        id: "packageCreate",
        path: `${paths.package}/new`,
        element: <PackageCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Package", url: paths.package },
                ]
            }
        }
    },
    {
        id: "packageDetail",
        path : `${paths.package}/:id`,
        element: <PackageUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.package },
                    { label: "Create", url: `${paths.package}/new` }
                ]
            }
        }
    }
]