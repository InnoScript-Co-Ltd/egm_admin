import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import { BlankTemplate } from "./layouts/default/pages/BlankTemplate";
import { Login } from "./modules/auth/entry/Login";
import { userRoutes } from "./modules/user/userRoutes";
import { adminRoutes } from "./modules/admin/adminRoutes";
import { regionRoutes } from "./modules/region/regionRoutes";
import { dashbardRoutes } from "./modules/dashboard/dashboardRoutes";
import { authorizationRoutes } from "./modules/authorization/authorizationRoutes";
import { settingRoutes } from "./modules/setting/settingRoutes";
import { countryRoutes } from "./modules/country/countryRoutes";
import { regionAndStateRoutes } from "./modules/regionAndState/regionAndStateRoutes";
import { cityRoutes } from "./modules/city/cityRoutes";
import { townshipRoutes } from "./modules/township/townshipRoutes";
import { permissionRoutes } from "./modules/authorization/permissionRoutes";
import { roleRoutes } from "./modules/authorization/roleRoutes";
import { packageRoutes } from "./modules/package/packageRoutes";
import { merchantBankAccountRoutes } from "./modules/merchantBankAccount/merchantBankAccountRoutes";
import { partnerRoutes } from "./modules/partner/partnerRoutes";
import { transactionRoutes } from "./modules/transaction/transactionRoutes";
import { depositRoutes } from "./modules/deposit/depositRoutes";
import { emailContentRoutes } from "./modules/emailContent/emailContentRoutes";
import { bankAccountTypeRoutes } from "./modules/bankAccountType/bankAccountTypeRoutes.";
import { agentRoutes } from "./modules/agent/agentRoutes";
import { bonusPointRoutes } from "./modules/bonusPoint/bonusPointRoutes";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <NotFound />,
        children: [
            ...dashbardRoutes,
            ...userRoutes,
            ...adminRoutes,
            ...regionRoutes,
            ...authorizationRoutes,
            ...settingRoutes,
            ...countryRoutes,
            ...regionAndStateRoutes,
            ...cityRoutes,
            ...townshipRoutes,
            ...permissionRoutes,
            ...roleRoutes,
            ...packageRoutes,
            ...merchantBankAccountRoutes,
            ...bankAccountTypeRoutes,
            ...partnerRoutes,
            ...transactionRoutes,
            ...depositRoutes,
            ...emailContentRoutes,
            ...agentRoutes,
            ...bonusPointRoutes
        ]
    },
    {
        path: "auth",
        element: <BlankTemplate />,
        errorElement: <NotFound />,
        children: [
            {
                path: "login",
                element: <Login />
            }
        ]
    }
])