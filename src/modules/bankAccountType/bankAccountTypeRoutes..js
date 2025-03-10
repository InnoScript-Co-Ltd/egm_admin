import { paths } from "../../constants/paths"
import { BankAccountTypeList } from "./view/BankAccountTypeList"
import { BankAccountTypeCreate } from "./entry/BankAccountTypeCreate"
import { BankAccountTypeUpdate } from "./entry/BankAccountTypeUpdate"

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
    {
        id: "bankAccountTypeCreate",
        path : `${paths.bankAccountType}/new`,
        element : <BankAccountTypeCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Bank Account Type", url: paths.bankAccountType},
                    { label: "Create", url: `${paths.bankAccountType}/new` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "bankAccountTypeUpdate",
        path : `${paths.bankAccountType}/:id`,
        element : <BankAccountTypeUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Bank Account Type", url: paths.bankAccountType},
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]