import { paths } from "../../constants/paths";
import { AgentUpdate } from "./entry/AgentUpate";
import { AgentList } from "./view/AgentList";

export const agentRoutes = [
    {
        id: "agents",
        path : `${paths.agent}/:type`,
        element : <AgentList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Main Agent", url: `${paths.agent}/MAIN_AGENT` },
                    { label: "Sub Agent", url: `${paths.agent}/SUB_AGENT` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "agent_detail",
        path : `${paths.agent}/:type/:id`,
        element : <AgentUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Main Agent", url: `${paths.agent}/MAIN_AGENT` },
                    { label: "Sub Agent", url: `${paths.agent}/SUB_AGENT` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]