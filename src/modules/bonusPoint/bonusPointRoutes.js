import { paths } from "../../constants/paths"
import { BonusPointCreate } from "./entry/BonusPointCreate"
import { BonusPointUpdate } from "./entry/BonusPointUpdate"
import { BonusPointList } from "./view/BonusPointList"

export const bonusPointRoutes = [
    {
        id: "bonusPointList",
        path: `${paths.bonusPoint}`,
        element: <BonusPointList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Create", url: `/${paths.bonusPoint}/create`}
                ],
                role: ['ADMINISTRATOR']
            }
        },
    },
    {
        id: "bonusPointCreate",
        path: `${paths.bonusPoint}/create`,
        element: <BonusPointCreate />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: `/${paths.bonusPoint}`}
                ],
                role: ['ADMINISTRATOR']
            }
        },
    },
    {
        id: "bonusPointUpdate",
        path: `${paths.bonusPoint}/:id`,
        element: <BonusPointUpdate />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: `/${paths.bonusPoint}`},
                    { label: "Create", url: `/${paths.bonusPoint}/create`}
                ],
                role: ['ADMINISTRATOR']
            }
        },
    }
]