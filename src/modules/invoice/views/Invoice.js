import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { InvoiceDetail } from "../list/InvoiceDetail";

export const Invoice = () => {
  return (
    <div className=" grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <InvoiceDetail />
      </div>
    </div>
  );
};
