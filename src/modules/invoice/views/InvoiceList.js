import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { InvoiceTableView } from "../list/InvoiceTableView";

export const InvoiceList = () => {
  return (
    <div className=" grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <InvoiceTableView />
      </div>
    </div>
  );
};
