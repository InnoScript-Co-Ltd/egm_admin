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
import { setPaginate } from "../agentSlice";
import { Card } from "primereact/card";
import { FilterByStatus } from "../../../shares/FilterByStatus";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { setDateFilter, setStatusFilter } from "../../../shares/shareSlice";
import { NavigateId } from "../../../shares/NavigateId";
import { agentPayload } from "../agentPayload";
import moment from "moment";
import { agentService } from "../agentService";

export const AgentTableView = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { agents, paginateParams } = useSelector((state) => state.agent);

  const [loading, setLoading] = useState(false);
  const [showAuditColumn, setShowAuditColumn] = useState(false);

  const columns = useRef(agentPayload.columns);

  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );
  const total = useRef(0);
  const first = useRef(0);

  const agentStatus = useRef(["ALL"]);
  const kycStatus = useRef(['ALL']);

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

  /** Filter by agent status handler */
  const onFilterByStatusHandler = (e) => {
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

  /** Filter by agent status handler */
  const onFilterBySKyctatusHandler = (e) => {
    let updatePaginateParams = { ...paginateParams };

    if (e === "ALL") {
      updatePaginateParams.filter = "";
      updatePaginateParams.value = "";
    } else {
      updatePaginateParams.filter = "kyc_status";
      updatePaginateParams.value = e;
    }

    dispatch(setPaginate(updatePaginateParams));
    dispatch(setStatusFilter(e));
  }

  /**  Loading Agent List Data */
  const loadingAgentData = useCallback(async () => {
    setLoading(true);

    const result = await agentService.index(dispatch, paginateParams);
    if (result.status === 200) {
      total.current = result.data.total
        ? result.data.total
        : result.data.length;
    }
    setLoading(false);
  }, [dispatch, paginateParams]);

  /** Loading Agent Status List */
  const loadingAgentStatus = useCallback(async () => {
    const result = await getRequest(`${endpoints.status}?type=agent`);

    if (result.status === 200) {
      agentStatus.current = agentStatus.current.concat(result.data.agent);
    }
  }, []);

  /** Loading KYC Status List */
  const loadingKycStatus = useCallback(async () => {
    const result = await getRequest(`${endpoints.status}?type=kyc`);

    if (result.status === 200) {
      kycStatus.current = kycStatus.current.concat(result.data.kyc);
    }
  }, []);

  useEffect(() => {
    loadingAgentData();
  }, [loadingAgentData]);

  useEffect(() => {
    loadingAgentStatus();
  }, [loadingAgentStatus]);

  useEffect(() => {
    loadingKycStatus();
  }, [loadingKycStatus])

  const FooterRender = () => {
    return (
      <div className="flex items-center justify-content-between">
        <div>
          Total -
          <span style={{ color: "#4338CA" }}>{total.current > 0 ? total.current : 0}</span>
        </div>
        <div className=" flex align-items-center gap-3">
          <Button
            outlined
            icon="pi pi-refresh"
            size="small"
            onClick={() => {
              dispatch(setPaginate(agentPayload.paginateParams));
              dispatch(setStatusFilter("ALL"));
              dispatch(setDateFilter({ startDate: "", endDate: "" }));
            }}
          />
          <PaginatorRight
            show={showAuditColumn}
            onHandler={(e) => setShowAuditColumn(e)}
            label="Show Audit Columns"
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
          label="Search Agent"
        />

        <FilterByStatus
          id="agent_status"
          status={agentStatus.current}
          onFilter={(e) => onFilterByStatusHandler(e)}
          label="Agent Status"
        />

        <FilterByStatus
          id="kyc_status"
          status={kycStatus.current}
          onFilter={(e) => onFilterBySKyctatusHandler(e)}
          label="KYC Status"
        />
      </div>
    );
  };

  return (
    <Card title="Agent List">
      <DataTable
        dataKey="id"
        size="normal"
        value={agents}
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
        emptyMessage="No agent accounts found."
        globalFilterFields={agentPayload.columns}
        header={<HeaderRender />}
        footer={<FooterRender />}
      >
        {showColumns.current.map((col, index) => {
          return (
            <Column
              key={`admin_col_index_${index}`}
              style={{ minWidth: "250px" }}
              field={col.field}
              header={col.header}
              sortable
              body={(value) => {
                switch (col.field) {
                  case "first_name":
                    return (
                      <NavigateId
                        url={`${paths.agent}/${value["id"]}`}
                        value={value[col.field]}
                      />
                    );
                    case "phone":
                      return(
                        <span> {value["prefix"]} {value[col.field]} </span>
                      )
                  case "dob":
                  return(
                    <span> { moment(value[col.field]).format("DD-MM-Y")}</span>
                  )
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
