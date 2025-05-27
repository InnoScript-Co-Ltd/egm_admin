import { Card } from "primereact/card";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { partnerPayload } from "../partnerPayload";
import { partnerService } from "../partnerService";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { setPaginate } from "../partnerSlice";
import moment from "moment";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { NavigateId } from "../../../shares/NavigateId";
import { Status } from "../../../shares/Status";
import { datetime } from "../../../helpers/datetime";
import numeral from "numeral";
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { Dropdown } from "primereact/dropdown";
import { setDateFilter } from "../../../shares/shareSlice";
import { FilterByDay } from "../../../shares/FilterByDay";
import { FilterByDate } from "../../../shares/FilterByDate";

export const PartnerTransactionTableView = () => {
  const [showAuditColumn, setShowAuditColumn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("DEPOSIT_PENDING");
  const [dayFilter, setDayFilter] = useState({ startDate: "", endDate: "" });

  const { partners, paginateParams } = useSelector((state) => state.partner);

  const columns = useRef(partnerPayload.secondColumns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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

  const statusHandler = (e) => {
    setSelectedStatus(e.value);
    const updateParams = { ...paginateParams };
    updateParams.value = selectedStatus;
    dispatch(setPaginate(updateParams));
  };

  const statusOptions = [
    { label: "Deposit Pending", value: "DEPOSIT_PENDING" },
    { label: "Payment Accepted", value: "DEPOSIT_PAYMENT_ACCEPTED" },
    { label: "Rejected", value: "REJECT" },
  ];

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

  const HeaderRender = () => {
    return (
      <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-between align-items-start md:align-items-center gap-3">
        <div className="mt-3 flex align-items-center gap-3">
          <div className="flex flex-column ">
            <label>Status Filter</label>
            <div className="form-group flex mt-1">
              <Dropdown
                value={selectedStatus}
                options={statusOptions}
                onChange={(e) => statusHandler(e)}
                placeholder="Filter by Status"
                className="p-inputtext-sm w-full"
              />
            </div>
          </div>

          <FilterByDay label="Filter By Day" onFilter={(e) => onDayFilter(e)} />

          <FilterByDate
            onFilter={(e) => onFilterByDate(e)}
            label="Filter By Date"
          />
        </div>
      </div>
    );
  };

  const FooterRender = () => {
    return (
      <div className="flex items-center justify-content-between">
        <PaginatorRight
          show={showAuditColumn}
          onHandler={(e) => setShowAuditColumn(e)}
          label="Audit Columns"
        />
      </div>
    );
  };

  const loadingData = useCallback(async () => {
    setLoading(true);

    const updateParams = { ...paginateParams };
    updateParams.filter = "status";
    updateParams.value = selectedStatus;

    await partnerService.partnerTransaction(dispatch, params.id, updateParams);

    setLoading(false);
  }, [dispatch, paginateParams, params.id, selectedStatus]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <Card title="Partner Transaction List" className="p-0">
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
        globalFilterFields={partnerPayload.secondColumns}
        footer={FooterRender}
        header={HeaderRender}
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
                  case "action":
                    return (
                      <>
                        <i
                          className="pi pi-folder-open"
                          style={{ cursor: "pointer", fontSize: "1.5rem" }}
                          onClick={() =>
                            navigate(
                              `${paths.transaction}/${value.status}/${value.id}`
                            )
                          }
                        ></i>
                      </>
                    );
                  case "agent_account_number":
                    return (
                      <NavigateId
                        url={`${paths.transaction}/${value["id"]}`}
                        value={value[col.field]}
                      />
                    );
                  case "merchant_account_number":
                    return (
                      <NavigateId
                        url={`${paths.transaction}/${value["id"]}`}
                        value={value[col.field]}
                      />
                    );
                  case "package_deposit_amount":
                    return (
                      <span> {numeral(value[col.field]).format("0,0")} </span>
                    );
                  case "package_roi_rate":
                    return <span> {value[col.field]} % </span>;
                  case "package_duration":
                    return <span> {value[col.field]} Months </span>;
                  case "commession":
                    return <span> {value[col.field]} % </span>;
                  case "status":
                    return <Status status={value[col.field]} />;
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
    </Card>
  );
};
