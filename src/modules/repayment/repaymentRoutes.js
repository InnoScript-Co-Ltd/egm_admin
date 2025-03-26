import { paths } from "../../constants/paths"
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
]