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
import { setAgentPaginate } from "../agentSlice";
import { agentPayload } from "../agentPayload";
import { agentServices } from "../agentServices";
import { useParams } from "react-router-dom";
import moment from "moment";

export const AgentListViewTable = () => {

  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const columns = useRef(agentPayload.columns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );
  const total = useRef(0);
  const first = useRef(0);
  const partnerStatus = useRef([]);

  const { agents, paginateParams } = useSelector((state) => state.agent);

  const dispatch = useDispatch();
  const params = useParams();

  /**
   * Event - Paginate Page Change
   * @param {*} event
   */
  const onPageChange = (event) => {
    first.current = event.page * paginateParams.per_page;
    dispatch(
      setAgentPaginate({
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
      setAgentPaginate({
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
      setAgentPaginate({
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

    dispatch(setAgentPaginate(updatePaginateParams));
    dispatch(setStatusFilter(e));
  };

  /**
   *  Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);

    const result = await agentServices.index(dispatch, params.type, paginateParams);
    if (result.status === 200) {
      total.current = result.data.total
        ? result.data.total
        : result.data.length;
    }
    setLoading(false);
  }, [dispatch, paginateParams, params.type]);

  /**
   * Loading General Status
   */
  const loadingStatus = useCallback(async () => {
    const partnerResult = await getRequest(
      `${endpoints.status}?type=partner`
    );

    if (partnerResult.status === 200) {
      partnerStatus.current = [...partnerResult.data.partner, "ALL"]
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
          Total Agent Account - <span>{total.current > 0 ? total.current : 0}</span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => {
              dispatch(setAgentPaginate(agentPayload.paginateParams));
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
          tooltipLabel={agentPayload.searchableFields}
          placeholder={"Search agent"}
          onSearch={(e) => onSearchChange(e)}
          label="Search agent"
        />

        <FilterByStatus
          status={partnerStatus.current}
          onFilter={(e) => onFilter(e)}
          label="Filter By Status"
        />
      </div>
    );
  };

  return (
    <Card title={"Agent Account List"}>
      <DataTable
        dataKey="id"
        size="normal"
        value={agents ? agents : []}
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
        emptyMessage="No agents accounts found."
        globalFilterFields={agentPayload.columns}
        header={<HeaderRender />}
        footer={<FooterRender />}
      >
        {showColumns.current.map((col, index) => {
          return (
            <Column
              key={`agent_account_col_index_${index}`}
              style={{ minWidth: "250px" }}
              field={col.field}
              header={col.header}
              sortable
              body={(value) => {
                switch (col.field) {
                  case "name":
                    return (
                      <NavigateId
                        url={`${paths.agent}/${params.type}/${value["id"]}`}
                        value={`${value['first_name']} ${value['last_name']}`}
                      />
                    );
                  case "dob":
                    return (
                      <span> {moment(value[col.field]).format("DD/MM/YYYY")} </span>
                    )
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
