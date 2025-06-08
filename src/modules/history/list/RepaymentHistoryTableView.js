import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { datetime } from "../../../helpers/datetime";
import { setDateFilter } from "../../../shares/shareSlice";
import { Card } from "primereact/card";
import { NavigateId } from "../../../shares/NavigateId";
import { historyPayload } from "../historyPayload";
import { historyService } from "../historyService";
import { setPaginate } from "../historySlice";
import { FilterByDay } from "../../../shares/FilterByDay";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const RepaymentHistoryTableView = () => {
  const dispatch = useDispatch();
  const { historys, paginateParams } = useSelector((state) => state.history);

  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);
  const [dayFilter, setDayFilter] = useState({ startDate: "", endDate: "" });
  const columns = useRef(historyPayload.columns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );
  const first = useRef(0);
  const total = useRef(0);

  const onDayFilter = (range) => {
    setDayFilter(range);

    const updatePaginateParams = {
      ...paginateParams,
      start_date: range.startDate
        ? moment(range.startDate).format("YYYY-MM-DD")
        : "",
      end_date: range.endDate ? moment(range.endDate).format("YYYY-MM-DD") : "",
    };

    dispatch(setPaginate(updatePaginateParams));
  };

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
   * Event - Search
   * @param {*} event
   */
  const onSearchChange = (event) => {
    dispatch(
      setPaginate({
        ...paginateParams,
        search: event,
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

  const exportToExcel = () => {
    if (!historys || historys.length === 0) return;

    const exportData = historys.map((item) => {
      const exportItem = {};

      // Export normal columns
      showColumns.current.forEach((col) => {
        let value = item[col.field];

        switch (col.field) {
          case "name":
            value = item[col.field];
            break;
          case "roi_rate":
            value = item[col.field] != null ? `${item[col.field]} %` : "";
            break;
          case "roi_rate_yearly":
            value =
              item["roi_rate"] != null ? `${item["roi_rate"] * 12} %` : "";
            break;
          case "duration":
            value =
              item[col.field] != null
                ? `${item[col.field]} ${item[col.field] > 1 ? "Years" : "Year"}`
                : "";
            break;
          case "deposit_amount":
            value = item[col.field] != null ? item[col.field].toString() : "";
            break;
          case "status":
            value = item[col.field];
            break;
          default:
            value = item[col.field];
        }

        exportItem[col.header] = value != null ? value : "";
      });

      // Export audit columns if enabled
      if (showAuditColumn) {
        auditColumns.forEach((col) => {
          let value = item[col.field];
          const formattedValue = value ? datetime.long(value) : "";
          exportItem[col.header] = formattedValue != null ? formattedValue : "";
        });
      }

      return exportItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Repayment History");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(
      data,
      `repayment_history_${moment().format("YYYYMMDD_HHmmss")}.xlsx`
    );
  };

  /**
   * Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);
    const response = await historyService.repaymentHistory(dispatch);
    if (response.status === 200) {
      total.current = response.data.total
        ? response.data.total
        : response.data.length;
    }
    setLoading(false);
  }, [dispatch, paginateParams]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const FooterRender = () => {
    return (
      <div className=" flex items-center justify-content-between">
        <div>
          {" "}
          Total -{" "}
          <span style={{ color: "#4338CA" }}>{total ? total.current : 0}</span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => {
              dispatch(setPaginate(historyPayload.paginateParams));
              dispatch(setDateFilter({ startDate: "", endDate: "" }));
            }}
          />
          <PaginatorRight
            show={showAuditColumn}
            onHandler={(e) => setShowAuditColumn(e)}
            label={"Show Audit Columns"}
          />
        </div>
      </div>
    );
  };

  /**
   * Table Header Render
   */
  const HeaderRender = () => {
    return (
      <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3">
        <Search
          tooltipLabel={"Search history"}
          placeholder={"Search history"}
          onSearch={(e) => onSearchChange(e)}
          label={"Search"}
        />

        <FilterByDay label="Filter By Day" onFilter={(e) => onDayFilter(e)} />

        <div className="col-12 md:col-2 lg:col-2 py-3">
          <label htmlFor="dob" className="input-label text-black">
            Date Filter
          </label>
          <div className="p-inputgroup mt-2">
            <Calendar
              className="p-inputtext-sm"
              value={
                dayFilter.startDate && dayFilter.endDate
                  ? [new Date(dayFilter.startDate), new Date(dayFilter.endDate)]
                  : null
              }
              onChange={(e) => {
                const [start, end] = e.value || [null, null];
                const range = {
                  startDate: start,
                  endDate: end,
                };
                setDayFilter(range);
                onDayFilter(range);
              }}
              selectionMode="range"
              readOnlyInput
              showIcon
              placeholder="Select date range"
            />
          </div>
        </div>

        <div
          style={{ marginTop: "22px" }}
          className="flex justify-content-end align-items-center gap-2"
        >
          <Button
            label="Export Excel"
            icon="pi pi-file-excel"
            className="p-button-success"
            onClick={exportToExcel}
          />
        </div>
      </div>
    );
  };

  return (
    <Card title="Repayment history List">
      <DataTable
        dataKey="id"
        size="normal"
        value={historys}
        sortField={paginateParams.order}
        sortOrder={
          paginateParams.sort === "DESC"
            ? 1
            : paginateParams.sort === "ASC"
            ? -1
            : 0
        }
        onSort={onSort}
        loading={loading}
        emptyMessage="No history found."
        globalFilterFields={historyPayload.columns}
        sortMode={paginateOptions.sortMode}
        header={<HeaderRender />}
        footer={<FooterRender />}
      >
        {showColumns.current.map((col, index) => {
          return (
            <Column
              key={`category_col_index_${index}`}
              style={{ minWidth: "250px" }}
              field={col.field}
              header={col.header}
              sortable
              body={(value) => {
                switch (col.field) {
                  case "name":
                    return (
                      <NavigateId
                        url={`${paths.history}/${value["id"]}`}
                        value={value[col.field]}
                      />
                    );
                  case "roi_rate":
                    return <span> {value[col.field]} % </span>;
                  case "roi_rate_yearly":
                    return <span> {value["roi_rate"] * 12} % </span>;
                  case "duration":
                    return (
                      <span>
                        {" "}
                        {value[col.field]}{" "}
                        {value[col.field] > 1 ? "Years" : "Year"}{" "}
                      </span>
                    );
                  case "deposit_amount":
                    return <span> {value[col.field].toString()} </span>;
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
                body={(value) => (
                  <label> {datetime.long(value[col.field])} </label>
                )}
              />
            );
          })}
      </DataTable>
      <Paginator
        first={first.current}
        rows={paginateParams.per_page}
        totalRecords={total.current}
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
