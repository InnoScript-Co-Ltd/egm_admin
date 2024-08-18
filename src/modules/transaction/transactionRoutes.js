import { paths } from "../../constants/paths"
import { DepositDetail } from "./view/DepositDetail"
import { DepositList } from "./view/DepositList"

export const transactionRoutes = [
    {
        id: "deposit",
        path: `${paths.transaction}/:type`,
        element: <DepositList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Pending", url: `${paths.transaction}/DEPOSIT_PENDING` },
                    { label: "Payment Accepted", url: `${paths.transaction}/DEPOSIT_PAYMENT_ACCEPTED` },
                    { label: "Reject", url: `${paths.transaction}/DEPOSIT_REJECT` },
                ],
                role: ['ADMINISTRATOR']
            }
        },
        
    },
    {
        id: "deposit_detail",
        path: `${paths.transaction}/:type/:id`,
        element: <DepositDetail />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Pending", url: `${paths.transaction}/DEPOSIT_PENDING` },
                    { label: "Payment Accepted", url: `${paths.transaction}/DEPOSIT_PAYMENT_ACCEPTED` },
                    { label: "Reject", url: `${paths.transaction}/DEPOSIT_REJECT` },
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