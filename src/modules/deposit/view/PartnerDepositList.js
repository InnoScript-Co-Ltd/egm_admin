import { BreadCrumb } from "../../../shares/BreadCrumb"
import { PartnerDepositTableView } from "../list/PartnerDepositTableView"

export const PartnerDepositList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <PartnerDepositTableView />
            </div>
        </div>
    )
}