import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { setDateFilter } from "../../../shares/shareSlice";
import { Card } from "primereact/card";
import { NavigateId } from "../../../shares/NavigateId";
import { setPaginate } from "../transactionSlice";
import { transactionPayload } from "../transactionPayload";
import { transactionService } from "../transactionService";
import { FilterByDate } from "../../../shares/FilterByDate";
import { FilterByDay } from "../../../shares/FilterByDay";
import { Dropdown } from "primereact/dropdown";
import numeral from "numeral";
import moment from "moment";

export const TransactionTableView = () => {
  const { transactions, paginateParams } = useSelector(
    (state) => state.transaction
  );
  const [dayFilter, setDayFilter] = useState({ startDate: "", endDate: "" });

  const [loading, setLoading] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const columns = useRef(transactionPayload.columns);
  const showColumns = useRef(
    columns.current.filter((col) => col.show === true)
  );
  const first = useRef(0);
  const total = useRef(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const handlePartnerChange = (e) => {
    const updatePaginateParams = {
      ...paginateParams,
      page: 1,
      filter: "status,sender_id",
    };
    console.log("Updated Filter Params:", updatePaginateParams);
    delete updatePaginateParams.search;
    dispatch(setPaginate(updatePaginateParams));
    setPartnerList(e.value);
  };
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

  const partners = useCallback(async () => {
    const response = await transactionService.index(dispatch);
    if (response.status === 200) {
      const partnerOptions = response.data.map((item) => ({
        label: item.sender_name,
        value: item.sender_id,
      }));
      setPartnerList(partnerOptions);
    }
  }, [dispatch]);

  useEffect(() => {
    partners();
  }, [partners]);

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
   * Navigate Transaction Type
   * @param {*} type
   */
  const navigateHandler = (type) => {
    navigate(`${paths.transaction}/${type}`);
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
   * Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);

    const updateParams = { ...paginateParams };

    updateParams.filter = "status";
    updateParams.value = `${params.type.toUpperCase()}`;

    const response = await transactionService.index(dispatch, updateParams);

    if (response.status === 200) {
      total.current = response.data.total
        ? response.data.total
        : response.data.length;
    }
    setLoading(false);
  }, [dispatch, paginateParams, params.type]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const FooterRender = () => {
    return (
      <div className="flex items-center justify-content-between">
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
              dispatch(setPaginate(transactionPayload.paginateParams));
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
      <>
        <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-between align-items-start md:align-items-start gap-3">
          <Search
            tooltipLabel={"Search Transcation"}
            placeholder={"Search Transcation"}
            onSearch={(e) => onSearchChange(e)}
          />

          <div>
            <Button
              label="Create Transaction"
              className="ml-3"
              icon="pi pi-plus"
              onClick={() => navigate(paths.transactionCreate)}
            />

            <Button
              className="ml-3"
              onClick={() => navigateHandler("DEPOSIT_PENDING")}
            >
              DEPOSIT PENDING
            </Button>

            <Button
              className="ml-3"
              onClick={() => navigateHandler("DEPOSIT_PAYMENT_ACCEPTED")}
            >
              PAYMENT ACCEPTED
            </Button>

            <Button className="ml-3" onClick={() => navigateHandler("REJECT")}>
              REJECT
            </Button>
          </div>
        </div>

        <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3 mt-3">
          <div className="flex align-items-center gap-3">
            <FilterByDay
              label="Filter By Day"
              onFilter={(e) => onDayFilter(e)}
            />
            <div className="flex flex-column">
              <label className="font-medium">Filter By Partner</label>
              <div className="form-group flex mt-1">
                <Dropdown
                  inputId="partner"
                  autoComplete="partner name"
                  name="partner"
                  filter
                  value={paginateParams.sender_id}
                  onChange={handlePartnerChange}
                  options={partnerList}
                  placeholder="Select a partner"
                  disabled={loading}
                  className="p-inputtext-sm w-full"
                />
              </div>
            </div>
          </div>
          <FilterByDate
            onFilter={(e) => onFilterByDate(e)}
            label="Filter By Date"
          />
        </div>
      </>
    );
  };

  return (
    <Card title={`Transcations List - ${params.type.toUpperCase()}`}>
      <DataTable
        dataKey="id"
        size="normal"
        value={transactions}
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
        emptyMessage="No Transactions Found."
        globalFilterFields={transactionPayload.columns}
        sortMode={paginateOptions.sortMode}
        header={<HeaderRender />}
        footer={<FooterRender />}
      >
        {showColumns.current.map((col, index) => {
          return (
            <Column
              key={`category_col_index_${index}`}
              style={{ minWidth: col.field === "action" ? "" : "250px" }}
              field={col.field}
              header={col.header}
              sortable={col.sortable}
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
                              `${paths.transaction}/${params.type}/${value.id}`
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
