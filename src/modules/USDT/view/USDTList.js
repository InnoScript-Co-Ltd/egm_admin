import { BreadCrumb } from "../../../shares/BreadCrumb";
import { USDTTableView } from "../list/USDTTableView";

export const USDTList = () => {
  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <USDTTableView />
      </div>
    </div>
  );
};
