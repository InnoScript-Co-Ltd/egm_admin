import { BreadCrumb } from "../../../shares/BreadCrumb"
import { AgentTransactionTableView } from "../list/AgentTransactiontableView"

export const AgentTransactionList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <AgentTransactionTableView />
            </div>
        </div>
    )
}