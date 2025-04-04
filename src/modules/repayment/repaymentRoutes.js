import { paths } from "../../constants/paths"
import { RepaymentUpdate } from "./entry/RepaymentUpdate";
import { RepaymentList } from "./views/RepaymentList";

export const repaymentRoutes = [
    {
        id : "repaymentList",
        path : paths.repayment,
        element : <RepaymentList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id : "repaymentUpdate",
        path : `${paths.repayment}/:id`,
        element : <RepaymentUpdate />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]