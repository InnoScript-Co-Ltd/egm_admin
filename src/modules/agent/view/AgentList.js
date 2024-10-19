import { BreadCrumb } from "../../../shares/BreadCrumb"
import { AgentListViewTable } from "../list/AgentListViewTable";

export const AgentList = () => {

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <AgentListViewTable />
            </div>
        </div>
    )
}