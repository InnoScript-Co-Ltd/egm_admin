import { BreadCrumb } from "../../../shares/BreadCrumb";
import { RepaymentHistoryTableView } from "../list/RepaymentHistoryTableView";

export const RepaymentHistoryList = () => {
  return (
    <div className="grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <RepaymentHistoryTableView />
      </div>
    </div>
  );
};
