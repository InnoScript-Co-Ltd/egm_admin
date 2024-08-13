import { BreadCrumb } from "../../../shares/BreadCrumb"
import { PartnerTableView } from "../list/PartnerTableView";

export const PartnerList = () => {

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <PartnerTableView />
            </div>
        </div>
    )
}