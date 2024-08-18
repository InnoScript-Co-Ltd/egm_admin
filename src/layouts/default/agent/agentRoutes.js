import { paths } from "../../constants/paths";
import { AgentCreate } from "./entry/AgentCreate";
import { AgentUpdate } from "./entry/AgentUpdate";
import { AgentList } from "./view/AgentList";

export const agentRoutes = [
    {
        id: "agentCreate",
        path : `${paths.agent}/new`,
        element : <AgentCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.agent },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "agentList",
        path: paths.agent,
        element: <AgentList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.agent },
                    { label: "List", url: paths.agent },
                    { label: "Create", url: `${paths.agent}/new` }
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "agentDetail",
        path: `/${paths.agent}/:id`,
        element: <AgentUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Agents", url: paths.agent },
                    { label: "Create", url: `${paths.agent}/new`},
                ]
            }
        }
    }
]