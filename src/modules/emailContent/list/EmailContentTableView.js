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
import { setPaginate } from "../emailContentSlice";
import { emailContentPayload } from "../emailContentPayload";
import { emailContentServices } from "../emailContentServices";

export const EmailContentTableView = () => {

  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const columns = useRef(emailContentPayload.columns);
  const showColumns = useRef(columns.current.filter((col) => col.show === true));
  const total = useRef(0);
  const first = useRef(0);
  const emailContentStatus = useRef([]);

  const { emailContents, paginateParams } = useSelector((state) => state.emailContent);

  const dispatch = useDispatch();

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

    const result = await emailContentServices.index(dispatch, paginateParams);
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
    const emailContentType = await getRequest(
      `${endpoints.status}?type=emailContent`
    );

    if (emailContentType.status === 200) {
      emailContentStatus.current = [...emailContentType.data.emailContent, "ALL"]
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
          Total Email Content - <span>{total.current > 0 ? total.current : 0}</span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => {
              dispatch(setPaginate(emailContentPayload.paginateParams));
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
          tooltipLabel={emailContentPayload.searchableFields}
          placeholder={"Search Email Content"}
          onSearch={(e) => onSearchChange(e)}
          label="Search email content"
        />

        <FilterByStatus
          status={emailContentStatus.current}
          onFilter={(e) => onFilter(e)}
          label="Filter By Status"
        />
      </div>
    );
  };

  return (
    <Card title={"Email Content List"}>
      <DataTable
        dataKey="id"
        size="normal"
        value={emailContents}
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
        emptyMessage="No email contents found."
        globalFilterFields={emailContentPayload.columns}
        header={<HeaderRender />}
        footer={<FooterRender />}
      >
        {showColumns.current.map((col, index) => {
          return (
            <Column
              key={`email_content_index_${index}`}
              style={{ minWidth: "250px" }}
              field={col.field}
              header={col.header}
              sortable
              body={(value) => {
                switch (col.field) {
                  case "title":
                    return (
                      <NavigateId
                        url={`${paths.emailContent}/${value["id"]}`}
                        value={value[col.field]}
                      />
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