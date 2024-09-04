import { BreadCrumb } from "../../../shares/BreadCrumb"
import { EmailContentTableView } from "../list/EmailContentTableView";

export const EmailContentList = () => {

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <EmailContentTableView />
            </div>
        </div>
    )
}