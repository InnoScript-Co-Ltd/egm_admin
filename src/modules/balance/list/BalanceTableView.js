import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { balanceService } from "../balanceService";
import moment from "moment";
import { BillingHistoryTableView } from "./BillingHistoryTableView";

export const BalanceTableView = () => {
  const [loading, setLoading] = useState(false);

  const { balance } = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  /**
   *  Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);
    await balanceService.show(dispatch);
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <div>
      <Card title="Balance List">
        <div className="grid">
          <div className="col-12 md:col-6 lg:col-3 flex justify-content-center">
            <div className="count-card" style={{ height: "130px" }}>
              <div className="h-126 p-3">
                <div className="flex align-items-center justify-content-between">
                  <div>
                    <h2 className="font-bold text-gray">Account Balance</h2>
                  </div>
                  <div className="count-status count-total"> Total </div>
                </div>
                <div className="h-60 text-gray flex align-items-center justiry-content-start gap-5">
                  {/* <i className="pi pi-users" style={{ fontSize: "3rem" }}></i> */}
                  <div style={{ fontSize: "2.5rem" }}>
                    {balance?.account_balance}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 md:col-6 lg:col-3 flex justify-content-center">
            <div className="count-card" style={{ height: "130px" }}>
              <div className="h-126 p-3">
                <div className="flex align-items-center justify-content-between">
                  <div>
                    <h2 className="font-bold text-gray">
                      Month To Date Balance
                    </h2>
                  </div>
                  <div className="count-status count-total"> Total </div>
                </div>
                <div className="h-60 text-gray flex align-items-center justiry-content-start gap-5">
                  {/* <i className="pi pi-users" style={{ fontSize: "3rem" }}></i> */}
                  <div style={{ fontSize: "2.5rem" }}>
                    {balance?.month_to_date_balance}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 md:col-6 lg:col-3 flex justify-content-center">
            <div className="count-card" style={{ height: "130px" }}>
              <div className="h-126 p-3">
                <div className="flex align-items-center justify-content-between">
                  <div>
                    <h2 className="font-bold text-gray">Month To Date Usage</h2>
                  </div>
                  <div className="count-status count-total"> Total </div>
                </div>
                <div className="h-60 text-gray flex align-items-center justiry-content-start gap-5">
                  {/* <i className="pi pi-users" style={{ fontSize: "3rem" }}></i> */}
                  <div style={{ fontSize: "2.5rem" }}>
                    {balance?.month_to_date_usage}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 md:col-6 lg:col-3 flex justify-content-center">
            <div className="count-card" style={{ height: "130px" }}>
              <div className="h-126 p-3">
                <div className="flex align-items-center justify-content-between">
                  <div>
                    <h2 className="font-bold text-gray">Generated Date</h2>
                  </div>
                  <div className="count-status count-total"> Total </div>
                </div>
                <div className="h-60 text-gray flex align-items-center justiry-content-start gap-5">
                  {/* <i className="pi pi-users" style={{ fontSize: "3rem" }}></i> */}
                  <div style={{ fontSize: "2.5rem" }}>
                    {balance?.generated_at
                      ? moment(balance.generated_at).format("YYYY-MM-DD")
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BillingHistoryTableView />
      </Card>
    </div>
  );
};
