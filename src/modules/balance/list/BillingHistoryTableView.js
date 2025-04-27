import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/config";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { paths } from "../../../constants/paths";
import { Paginator } from "primereact/paginator";
import { Card } from "primereact/card";
import { setPaginate } from "../balanceSlice";
import { balancePayload } from "../balancePayload";
import { balanceService } from "../balanceService";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

export const BillingHistoryTableView = () => {
  const [loading, setLoading] = useState(false);

  const { balances, paginateParams } = useSelector((state) => state.balance);
  console.log(balances, "hi");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const first = useRef(0);
  const total = useRef(0);
  const columns = useRef(balancePayload.columns);
  const showColumns = useRef(
    columns?.current?.filter((col) => col.show === true)
  );

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
    const result = await balanceService.index(dispatch, paginateParams);
    if (result?.meta?.total) {
      total.current = result.meta.total;
    }
    setLoading(false);
  }, [dispatch, paginateParams]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Card title="Billing List">
      <DataTable
        dataKey="id"
        size="normal"
        value={balances?.billing_history}
        sortField={paginateParams.order}
        sortOrder={
          paginateParams.sort === "DESC"
            ? 1
            : paginateParams.sort === "ASC"
            ? -1
            : 0
        }
        onSort={onSort}
        sortMode={paginateOptions.sortMode}
        loading={loading}
        emptyMessage="No billing history found."
        globalFilterFields={balancePayload.columns}
      >
        {showColumns &&
          showColumns.current?.map((col, index) => {
            return (
              <Column
                key={`user_col_index_${index}`}
                style={{ minWidth: "250px" }}
                field={col.field}
                header={col.header}
                sortable
                body={(value) => {
                  switch (col.field) {
                    case "amount":
                      return value[col.field];
                    case "date":
                      return (
                        <span>
                          {moment(value[col.field]).format("DD-MM-YYYY ")}
                        </span>
                      );

                    case "description":
                      return value[col.field];
                    case "receipt_id":
                      return value[col.field];
                    case "type":
                      return value[col.field];
                    // case "action":
                    //   return (
                    //     <>
                    //       <i
                    //         className="pi pi-folder-open"
                    //         style={{ cursor: "pointer", fontSize: "1.5rem" }}
                    //         onClick={() =>
                    //           navigate(
                    //             `${paths.billing_history}/${value.receipt_id}`
                    //           )
                    //         }
                    //       ></i>
                    //     </>
                    //   );
                    default:
                      return value[col.field];
                  }
                }}
              />
            );
          })}
      </DataTable>

      <Paginator
        first={first.current}
        rows={paginateParams.per_page}
        totalRecords={total?.current}
        rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
        template={
          "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        }
        currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
        onPageChange={onPageChange}
      />
    </Card>
  );
};
