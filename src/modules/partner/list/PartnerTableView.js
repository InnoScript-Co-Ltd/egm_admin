import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../../shares/Search";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { Button } from "primereact/button";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { datetime } from "../../../helpers/datetime";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { Paginator } from "primereact/paginator";
import { Card } from "primereact/card";
import { FilterByStatus } from "../../../shares/FilterByStatus";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { setDateFilter, setStatusFilter } from "../../../shares/shareSlice";
import { NavigateId } from "../../../shares/NavigateId";
import { setPaginate } from "../partnerSlice";
import { partnerPayload } from "../partnerPayload";
import { partnerService } from "../partnerService";
import moment from "moment";
import { FilterByDay } from "../../../shares/FilterByDay";
import { FilterByDate } from "../../../shares/FilterByDate";

export const PartnerTableView = () => {
  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);
  const [dayFilter, setDayFilter] = useState({ startDate: "", endDate: "" });

  const columns = useRef(partnerPayload.columns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );
  const total = useRef(0);
  const first = useRef(0);
  const partnerStatus = useRef([]);

  const { partners, paginateParams } = useSelector((state) => state.partner);

  const dispatch = useDispatch();

  /**
   * On Change Date Filter
   * @param {*} range { startDate, endDate }
   */
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

  /**
   * On Change Filter
   * @param {*} e
   */
  const onFilter = (e) => {
    let updatePaginateParams = { ...paginateParams };

    if (e === "ALL") {
      updatePaginateParams.filter = "";
      updatePaginateParams.value = "";
    } else {
      updatePaginateParams.filter = "status";
      updatePaginateParams.value = e;
    }

    dispatch(setPaginate(updatePaginateParams));
    dispatch(setStatusFilter(e));
  };

  /**
   *  Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);

    const result = await partnerService.index(dispatch, paginateParams);
    if (result.status === 200) {
      total.current = result.data.total
        ? result.data.total
        : result.data.length;
    }
    setLoading(false);
  }, [dispatch, paginateParams]);

  /**
   * Loading General Status
   */
  const loadingStatus = useCallback(async () => {
    const partnerResult = await getRequest(`${endpoints.status}?type=partner`);

    if (partnerResult.status === 200) {
      partnerStatus.current = [...partnerResult.data.partner, "ALL"];
    }
  }, []);

  useEffect(() => {
    loadingStatus();
  }, [loadingStatus]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const FooterRender = () => {
    return (
      <div className="flex items-center justify-content-between">
        <div>
          Total Partner Account -{" "}
          <span>{total.current > 0 ? total.current : 0}</span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => {
              dispatch(setPaginate(partnerPayload.paginateParams));
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
  const HeaderRender = () => {
    return (
      <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3">
        <Search
          tooltipLabel={partnerPayload.searchableFields}
          placeholder={"Search partner"}
          onSearch={(e) => onSearchChange(e)}
          label="Search partner"
        />

        <FilterByStatus
          status={partnerStatus.current}
          onFilter={(e) => onFilter(e)}
          label="Filter By Status"
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
    <Card title={"Partner Account List"}>
      <DataTable
        dataKey="id"
        size="normal"
        value={partners}
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
        emptyMessage="No partner accounts found."
        globalFilterFields={partnerPayload.columns}
        header={<HeaderRender />}
        footer={<FooterRender />}
      >
        {showColumns.current.map((col, index) => {
          return (
            <Column
              key={`partner_account_col_index_${index}`}
              style={{ minWidth: "250px" }}
              field={col.field}
              header={col.header}
              sortable
              body={(value) => {
                switch (col.field) {
                  case "first_name":
                    return (
                      <NavigateId
                        url={`${paths.partner}/${value["id"]}`}
                        value={value[col.field]}
                      />
                    );
                  case "last_name":
                    return (
                      <NavigateId
                        url={`${paths.partner}/${value["id"]}`}
                        value={value[col.field]}
                      />
                    );
                  case "dob":
                    return (
                      <span>
                        {" "}
                        {moment(value[col.field]).format("DD/MM/YYYY")}{" "}
                      </span>
                    );
                  case "status":
                    return <Status status={value[col.field]} />;
                  case "kyc_status":
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
  );
};
