import { paths } from "../../constants/paths"
import { DepositDetail } from "./view/DepositDetail"
import { AgentDepositList } from "./view/AgentDepositList"
import { PartnerDepositList } from "./view/PartnerDepositList"
import { DepositUpdate } from "./entry/DepositUpdate"

export const depositRoutes = [
    {
        id: "agent_deposit",
        path: `${paths.deposit}/agent`,
        element: <AgentDepositList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                ],
                role: ['ADMINISTRATOR']
            }
        },
        
    },      
    {
        id: "partner_deposit",
        path: `${paths.deposit}/partner`,
        element: <PartnerDepositList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                ],
                role: ['ADMINISTRATOR']
            }
        },
    }, 

    {
        id: "deposit-detail",
        path: `${paths.deposit}/:type/:id`,
        element: <DepositDetail />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                ],
                role: ['ADMINISTRATOR']
            }
        },
    },
    // },
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
    {
        id: "repaymentDetail",
        path : `${paths.deposit}/:type/:id/${paths.repayment}/:id`,
        element: <DepositUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                ]
            }
        }
    }
]