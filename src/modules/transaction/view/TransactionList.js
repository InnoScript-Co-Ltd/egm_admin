import { BreadCrumb } from "../../../shares/BreadCrumb"
import { TransactionTableView } from "../list/TransactionTableView"

export const TransactionList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <TransactionTableView />
            </div>

        </div>
    )
}