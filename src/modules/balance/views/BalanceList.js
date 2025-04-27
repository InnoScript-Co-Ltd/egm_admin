import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { BalanceTableView } from "../list/BalanceTableView";

export const BalanceList = () => {
  return (
    <div className=" grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <BalanceTableView />
      </div>
    </div>
  );
};
