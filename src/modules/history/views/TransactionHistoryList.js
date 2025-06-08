import { BreadCrumb } from "../../../shares/BreadCrumb";
import { TransactionHistoryTableView } from "../list/TransactionHistoryTableView";

export const TransactionHistoryList = () => {
  return (
    <div className="grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <TransactionHistoryTableView />
      </div>
    </div>
  );
};
