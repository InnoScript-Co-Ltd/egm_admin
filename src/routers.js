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
import { agentRoutes } from "./modules/agent/agentRoutes";
import { permissionRoutes } from "./modules/authorization/permissionRoutes";
import { roleRoutes } from "./modules/authorization/roleRoutes";
import { packageRoutes } from "./modules/package/packageRoutes";

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
            ...agentRoutes,
            ...permissionRoutes,
            ...roleRoutes,
            ...packageRoutes
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