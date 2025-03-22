import { BreadCrumb } from "../../../shares/BreadCrumb"
import { BonusPointTableView } from "../list/BonusPointTableView"

export const BonusPointList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <BonusPointTableView />
            </div>
        </div>
    )
}