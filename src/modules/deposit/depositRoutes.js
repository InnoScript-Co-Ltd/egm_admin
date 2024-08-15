import { paths } from "../../constants/paths"
import { DepositList } from "./view/DepositList"

export const depositRoutes = [
    {
        id: "deposit",
        path: `${paths.deposit}/:type`,
        element: <DepositList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Payment Accepted", url: `${paths.deposit}/payment_accepted` },
                    { label: "Reject", url: `${paths.deposit}/reject` },
                ],
                role: ['ADMINISTRATOR']
            }
        },
        
    },
    // {
    //     id: "packageCreate",
    //     path: `${paths.package}/new`,
    //     element: <PackageCreate />,
    //     loader: () => {
    //         return {
    //             breadcrumbs: [
    //                 { label: "Dashboard", url: paths.dashboard },
    //                 { label: "Package", url: paths.package },
    //             ]
    //         }
    //     }
    // },
    // {
    //     id: "packageDetail",
    //     path : `${paths.package}/:id`,
    //     element: <PackageUpdate />,
    //     loader: () => {
    //         return {
    //             breadcrumbs: [
    //                 { label: "Dashboard", url: paths.dashboard },
    //                 { label: "List", url: paths.package },
    //                 { label: "Create", url: `${paths.package}/new` }
    //             ]
    //         }
    //     }
    // }
]