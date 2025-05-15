import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paginateOptions } from "../../../constants/config";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { Paginator } from "primereact/paginator";
import { setDateFilter, setStatusFilter } from "../../../shares/shareSlice";
import { FilterByDate } from "../../../shares/FilterByDate";
import { Card } from "primereact/card";
import { NavigateId } from "../../../shares/NavigateId";
import { setPaginate } from "../repaymentSlice";
import { repaymentPayload } from "../repaymentPayload";
import { repaymentService } from "../repaymentService";
import moment from "moment";
import numeral from "numeral";
import { FilterByDay } from "../../../shares/FilterByDay";

export const RepaymentTableView = () => {
  const [loading, setLoading] = useState(false);

  const { repayments, paginateParams } = useSelector(
    (state) => state.repayment
  );
  const dispatch = useDispatch();

  const first = useRef(0);
  const total = useRef(0);
  const columns = useRef(repaymentPayload.columns);
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

  const onDayFilter = (range) => {
    const updatePaginateParams = {
      ...paginateParams,
      start_date: range.startDate
        ? moment(range.startDate).format("YYYY-MM-DD")
        : "",
      end_date: range.endDate ? moment(range.endDate).format("YYYY-MM-DD") : "",
    };

    dispatch(setPaginate(updatePaginateParams));
    dispatch(setDateFilter(range));
  };

  const onFilterByDate = (e) => {
    let updatePaginateParams = { ...paginateParams };

    if (e.startDate === "" || e.endDate === "") {
      delete updatePaginateParams.start_date;
      delete updatePaginateParams.end_date;
    } else {
      updatePaginateParams.start_date = moment(e.startDate).format("yy-MM-DD");
      updatePaginateParams.end_date = moment(e.endDate).format("yy-MM-DD");
    }

    dispatch(setDateFilter(e));
    dispatch(setPaginate(updatePaginateParams));
  };

  /**
   *  Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);
    const result = await repaymentService.index(dispatch, paginateParams);
    if (result.status === 200) {
      total.current = result?.data?.total;
    }

    setLoading(false);
  }, [dispatch, paginateParams]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  /**
   * Table Footer Render
   * **/
  const FooterRender = () => {
    return (
      <div className=" flex items-center justify-content-between">
        <div>
          {" "}
          Total -{" "}
          <span style={{ color: "#4338CA" }}>
            {" "}
            {total.current > 0 ? total.current : 0}
          </span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => {
              dispatch(setPaginate(repaymentPayload.paginateParams));
              dispatch(setStatusFilter("ALL"));
              dispatch(setDateFilter({ startDate: "", endDate: "" }));
            }}
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
          tooltipLabel={"Search Repayment"}
          placeholder={"Search Repayment"}
          onSearch={(e) => onSearchChange(e)}
          label="Search Repayment"
        />
        <FilterByDay label="Filter By Day" onFilter={(e) => onDayFilter(e)} />

        <FilterByDate
          onFilter={(e) => onFilterByDate(e)}
          label="Filter By Date"
        />
      </div>
    );
  };

  return (
    <Card title="Repayment List">
      <DataTable
        dataKey="id"
        size="normal"
        value={repayments}
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
        emptyMessage="No township found."
        globalFilterFields={repaymentPayload.columns}
        header={<HeaderRender />}
        footer={<FooterRender />}
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
                    case "id":
                      return (
                        <NavigateId
                          url={`/${paths.repayment}/${value["id"]}`}
                          value={value[col.field]}
                        />
                      );
                    case "partner_id":
                      return (
                        <NavigateId
                          url={`/${paths.partner}/${value["id"]}`}
                          value={value[col.field]}
                        />
                      );
                    case "transaction_id":
                      return (
                        <NavigateId
                          url={`/${paths.transaction}/${value["id"]}`}
                          value={value[col.field]}
                        />
                      );
                    case "deposit_id":
                      return (
                        <NavigateId
                          url={`${paths.deposit}/${value["id"]}`}
                          value={value[col.field]}
                        />
                      );
                    case "date":
                      return (
                        <span>
                          {" "}
                          {moment(value[col.field]).format(
                            "DD-MM-YYYY hh:mm:ss A"
                          )}{" "}
                        </span>
                      );
                    case "amount":
                      return (
                        <span>
                          {" "}
                          {numeral(value[col.field]).format("0,0")} (EMU){" "}
                        </span>
                      );
                    case "oneday_amount":
                      return (
                        <span>
                          {" "}
                          {numeral(value[col.field]).format("0,0")} (EMU){" "}
                        </span>
                      );
                    case "total_amount":
                      return (
                        <span>
                          {" "}
                          {numeral(value[col.field]).format("0,0")} (EMU){" "}
                        </span>
                      );
                    case "created_at":
                      return (
                        <span>
                          {" "}
                          {moment(value[col.field]).format(
                            "DD-MM-YYYY hh:mm:ss A"
                          )}{" "}
                        </span>
                      );
                    case "updated_at":
                      return (
                        <span>
                          {" "}
                          {moment(value[col.field]).format(
                            "DD-MM-YYYY hh:mm:ss A"
                          )}{" "}
                        </span>
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
