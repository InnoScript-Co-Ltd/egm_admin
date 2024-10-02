import { BreadCrumb } from "../../../shares/BreadCrumb"
import { PartnerTransactionTableView } from "../list/PartnerTransactionTableView"

export const PartnerTransactionList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <PartnerTransactionTableView />
            </div>
        </div>
    )
}