import { BreadCrumb } from "../../../shares/BreadCrumb";
import { TransactionInMerchantBankAccountTableView } from "../list/TransactionInMerchantBankAccountTableView.js";

export const TransactionInMerchantBankAccountList = () => {
  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <TransactionInMerchantBankAccountTableView />
      </div>
    </div>
  );
};
