import { BreadCrumb } from "../../../shares/BreadCrumb"
import { AgentDepositTableView } from "../list/AgentDepositTableView"

export const AgentDepositList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <AgentDepositTableView />
            </div>
        </div>
    )
}