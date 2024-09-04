import { paths } from "../../constants/paths";
import { EmailContentCreate } from "./entry/EmailContentCreate";
import { EmailContentUpdate } from "./entry/EmailContentUpdate";
import { EmailContentList } from "./view/EmailContentList";

export const emailContentRoutes = [
    {
        id: "emailContentList",
        path : paths.emailContent,
        element : <EmailContentList />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Create", url: `${paths.emailContent}/new` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "emailContentCreate",
        path : `${paths.emailContent}/new`,
        element : <EmailContentCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Email Contents", url: paths.emailContent },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "emailContentUpdate",
        path : `${paths.emailContent}/:id`,
        element : <EmailContentUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Email Content", url: paths.emailContent },
                    { label: "Create", url: `${paths.emailContent}/new` },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]