import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { Button } from "primereact/button";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { datetime } from "../../../helpers/datetime";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { Paginator } from "primereact/paginator";
import { Card } from "primereact/card";
import { setDateFilter, setStatusFilter } from "../../../shares/shareSlice";
import { NavigateId } from "../../../shares/NavigateId";
import { merchantBankAccountPayload } from "../merchantBankAccountPayload";
import { setPaginate } from "../merchantBankAccountSlice";
import { merchantBankAccountService } from "../merchantBankAccountService";

export const TransactionInMerchantBankAccountTableView = () => {
  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const columns = useRef(merchantBankAccountPayload.columns2);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );
  const total = useRef(0);
  const first = useRef(0);

  const { merchantBankAccount, paginateParams } = useSelector(
    (state) => state.merchantBankAccount
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  /**
   * Event - Paginate Page Change
   * @param {*} event
   */
  const onPageChange = (event) => {
    first.current = event.page * paginateParams.per_page;
    dispatch(
      setPaginate({
        ...paginateParams,
        page: event?.page + 1,
        per_page: event?.rows,
      })
    );
  };

  /**
   * Event - Column sorting "DESC | ASC"
   * @param {*} event
   */
  const onSort = (event) => {
    const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
    dispatch(
      setPaginate({
        ...paginateParams,
        sort: sortOrder,
        order: event.sortField,
      })
    );
  };

  /**
   *  Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);

    const result = await merchantBankAccountService.show(
      dispatch,
      params.id,
      paginateParams
    );
    if (result.status === 200) {
      total.current = result.data.total
        ? result.data.total
        : result.data.length;
    }
    setLoading(false);
  }, [dispatch, paginateParams, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const FooterRender = () => {
    return (
      <div className="flex items-center justify-content-between">
        <div>
          Total Merchant Bank Account -
          <span style={{ color: "#4338CA" }}>
            {total.current > 0 ? total.current : 0}
          </span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => {
              dispatch(setPaginate(merchantBankAccountPayload.paginateParams));
              dispatch(setStatusFilter("ALL"));
              dispatch(setDateFilter({ startDate: "", endDate: "" }));
            }}
          />
          <PaginatorRight
            show={showAuditColumn}
            onHandler={(e) => setShowAuditColumn(e)}
            label="Audit Columns"
          />
        </div>
      </div>
    );
  };

  /**
   * Table Header Render
   */

  return (
    <div className="grid">
      <div className="col-12 md:col-6 lg:col-3 flex justify-content-center">
        <div className="count-card">
          <div className="h-126 p-3">
            <div className="flex align-items-center justify-content-between">
              <div>
                <h2 className="font-bold text-gray">Total Deposit Amount</h2>
              </div>
              <div className="count-status count-total"> Total </div>
            </div>
            <div className="h-60 text-gray flex align-items-center justiry-content-start gap-5">
              <i className="pi pi-users" style={{ fontSize: "3rem" }}></i>
              <div style={{ fontSize: "2.5rem" }}>
                {merchantBankAccount?.total_deposit_amount}
              </div>
            </div>
          </div>
          <div className=" mt-auto h-40 count-view total flex align-items-center justify-content-center">
            View More
          </div>
        </div>
      </div>

      <div className="col-12 md:col-6 lg:col-3 flex justify-content-center">
        <div className="count-card">
          <div className="h-126 p-3">
            <div className="flex align-items-center justify-content-between">
              <div>
                <h2 className="font-bold text-gray">
                  This Month Deposit Amount
                </h2>
              </div>
              <div className="count-status count-total"> Total </div>
            </div>
            <div className="h-60 text-gray flex align-items-center justiry-content-start gap-5">
              <i className="pi pi-users" style={{ fontSize: "3rem" }}></i>
              <div style={{ fontSize: "2.5rem" }}>
                {merchantBankAccount?.this_month_deposit_amount}
              </div>
            </div>
          </div>
          <div className=" mt-auto h-40 count-view verified total flex align-items-center justify-content-center">
            View More
          </div>
        </div>
      </div>

      <Card title={"Transaction In Merchant Bank Account List"}>
        <DataTable
          dataKey="id"
          size="normal"
          value={merchantBankAccount?.transactions}
          sortField={paginateParams.order}
          sortOrder={
            paginateParams.sort === "DESC"
              ? 1
              : paginateParams.sort === "ASC"
              ? -1
              : 0
          }
          onSort={onSort}
          lazy={paginateOptions.lazy}
          loading={loading}
          resizableColumns={paginateOptions.resizableColumns}
          emptyMessage="No transaction in merchant bank accounts found."
          globalFilterFields={merchantBankAccountPayload.columns}
          footer={<FooterRender />}
        >
          {showColumns.current.map((col, index) => {
            return (
              <Column
                key={`transaction_merchant_bank_account_col_index_${index}`}
                style={{ minWidth: "250px" }}
                field={col.field}
                header={col.header}
                sortable
                body={(value) => {
                  switch (col.field) {
                    case "sender_id":
                      return (
                        <NavigateId
                          url={`${paths.transaction}/${value["transaction_type"]}/${value["id"]}`}
                          value={value[col.field]}
                        />
                      );
                    case "status":
                      return <Status status={value[col.field]} />;
                    default:
                      return value[col.field];
                  }
                }}
              />
            );
          })}

          {showAuditColumn &&
            auditColumns.map((col, index) => {
              return (
                <Column
                  key={`audit_column_key_${index}`}
                  style={{ minWidth: "250px" }}
                  field={col.field}
                  header={col.header}
                  sortable
                  body={(value) => {
                    if (
                      col.field === "expired_at" ||
                      col.field === "created_at" ||
                      col.field === "updated_at" ||
                      col.field === "deleted_at"
                    ) {
                      return <label> {datetime.long(value[col.field])} </label>;
                    } else {
                      return (
                        <label>
                          {" "}
                          {value[col.field] && value[col.field].name}{" "}
                        </label>
                      );
                    }
                  }}
                />
              );
            })}
        </DataTable>
        <Paginator
          first={first.current}
          rows={paginateParams.per_page}
          totalRecords={total?.current ? total.current : 0}
          rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
          template={
            "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          }
          currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
          onPageChange={onPageChange}
        />
      </Card>
    </div>
  );
};
