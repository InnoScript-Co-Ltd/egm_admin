import { BreadCrumb } from "../../../shares/BreadCrumb"
import { PackageTableView } from "../list/PackageTableView"

export const PackageList = () => {

    return (
        <div className="grid">

            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                <PackageTableView />
            </div>

        </div>
    )
}