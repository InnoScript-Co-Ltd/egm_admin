import { paths } from "../../constants/paths"
import { BankAccountTypeList } from "./view/BankAccountTypeList"

export const bankAccountTypeRoutes = [
    {
        id: "bankAccountTypeList",
        path : paths.bankAccountType,
        element : <BankAccountTypeList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Create", url: `${paths.bankAccountType}/new` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]