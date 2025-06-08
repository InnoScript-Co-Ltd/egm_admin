import { BreadCrumb } from "../../../shares/BreadCrumb";
import { WithdrawHistoryTableView } from "../list/WithdrawHistoryTableView";

export const WithdrawHistoryList = () => {
  return (
    <div className="grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <WithdrawHistoryTableView />
      </div>
    </div>
  );
};
