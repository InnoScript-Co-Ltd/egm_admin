import { paths } from "../../constants/paths"
import { TransactionDetail } from "./view/TransactionDetail"
import { AgentTransactionList } from "./view/AgentTransactionList"
import { PartnerTransactionTableView } from "./list/PartnerTransactionTableView"
import { PartnerTransactionList } from "./view/PartnerTransactionList"
import { TransactionUpdate } from "./entry/TransactionUpdate"

export const transactionRoutes = [
    {
        id: "agent_transcation",
        path: `${paths.transaction}/agent/:type`,
        element: <AgentTransactionList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Pending", url: `${paths.transaction}/agent/DEPOSIT_PENDING` },
                    { label: "Payment Accepted", url: `${paths.transaction}/agent/DEPOSIT_PAYMENT_ACCEPTED` },
                    { label: "Reject", url: `${paths.transaction}/agent/DEPOSIT_REJECT` },
                ],
                role: ['ADMINISTRATOR']
            }
        },
        
    },
    {
        id: "partner_transcation",
        path: `${paths.transaction}/partner/:type`,
        element: <PartnerTransactionList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Pending", url: `${paths.transaction}/partner/DEPOSIT_PENDING` },
                    { label: "Payment Accepted", url: `${paths.transaction}/partner/DEPOSIT_PAYMENT_ACCEPTED` },
                    { label: "Reject", url: `${paths.transaction}/partner/DEPOSIT_REJECT` },
                ],
                role: ['ADMINISTRATOR']
            }
        },
        
    },
    {
        id: "deposit_detail",
        path: `${paths.transaction}/:type/:id`,
        element: <TransactionDetail />,
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
        id: "transaction_update",
        path: `${paths.transactionUpdate}/:id`,
        element: <TransactionUpdate />,
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