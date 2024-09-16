import { BreadCrumb } from "../../../shares/BreadCrumb"
import { BankAccountTypeTableView } from "../list/BankAccountTypeTableView";

export const BankAccountTypeList = () => {

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <BankAccountTypeTableView />
            </div>
        </div>
    )
}