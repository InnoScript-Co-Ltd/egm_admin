import { paths } from "../../constants/paths"
import { PromotionList } from "./view/PromotionList"
import { PromotionCreate } from "./entry/PromotionCreate"
import { PromotionUpdate } from "./entry/PromotionUpdate"

export const promotionRoutes = [
    {
        id: "promotionList",
        path : paths.promotion,
        element : <PromotionList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Create", url: `${paths.promotionCreate}/new` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "promotionCreate",
        path : `${paths.promotion}/new`,
        element : <PromotionCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Promotion List", url: paths.promotion},
                    { label: "Create", url: `${paths.promotion}/new` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "promotionUpdate",
        path : `${paths.promotion}/:id`,
        element : <PromotionUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Promotion List", url: paths.promotion},
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]