import { BreadCrumb } from "../../../shares/BreadCrumb"
import { AgentTableView } from "../list/AgentTableView";

export const AgentList = () => {

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <AgentTableView />
            </div>
        </div>
    )
}