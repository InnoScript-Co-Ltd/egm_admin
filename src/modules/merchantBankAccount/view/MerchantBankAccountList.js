import { BreadCrumb } from "../../../shares/BreadCrumb"
import { MerchantBankAccountTableView } from "../list/MerchantBankAccountTableView";

export const MerchantBankAccountList = () => {

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <MerchantBankAccountTableView />
            </div>
        </div>
    )
}