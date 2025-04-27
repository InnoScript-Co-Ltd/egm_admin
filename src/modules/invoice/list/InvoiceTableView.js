import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/config";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { paths } from "../../../constants/paths";
import { Paginator } from "primereact/paginator";
import { Card } from "primereact/card";
import { setPaginate } from "../invoiceSlice";
import { invoicePayload } from "../invoicePayload";
import { invoiceService } from "../invoiceService";
import { useNavigate } from "react-router-dom";
import { NavigateId } from "../../../shares/NavigateId";
import moment from "moment";
import numeral from "numeral";

export const InvoiceTableView = () => {
  const [loading, setLoading] = useState(false);

  const { invoices, paginateParams } = useSelector((state) => state.invoice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const first = useRef(0);
  const total = useRef(0);
  const columns = useRef(invoicePayload.columns);
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
    const result = await invoiceService.index(dispatch, paginateParams);
    if (result?.meta?.total) {
      total.current = result.meta.total;
    }
    setLoading(false);
  }, [dispatch, paginateParams]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Card title="Invoice List">
      <DataTable
        dataKey="id"
        size="normal"
        value={invoices?.invoices}
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
        emptyMessage="No invoice found."
        globalFilterFields={invoicePayload.columns}
      >
        {showColumns &&
          showColumns.current?.map((col, index) => {
            return (
              <Column
                key={`invoice_col_index_${index}`}
                style={{ minWidth: "250px" }}
                field={col.field}
                header={col.header}
                sortable
                body={(value) => {
                  switch (col.field) {
                    case "invoice_uuid":
                      return (
                        <NavigateId
                          url={`${paths.invoice}/${value["invoice_uuid"]}`}
                          value={value[col.field]}
                        />
                      );
                    case "amount":
                      return value[col.field];
                    case "date":
                      return value[col.field];
                    case "invoice_id":
                      return value[col.field];
                    case "status":
                      return value[col.field];
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
