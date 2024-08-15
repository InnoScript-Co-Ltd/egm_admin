import { BreadCrumb } from "../../../shares/BreadCrumb"
import { DepositTableView } from "../list/DepositTableView"

export const DepositList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <DepositTableView />
            </div>

        </div>
    )
}