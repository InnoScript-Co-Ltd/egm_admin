import { useCallback, useEffect, useRef, useState } from "react"
import { BreadCrumb } from "../../../shares/BreadCrumb"
import { useDispatch, useSelector } from "react-redux";
import { transactionService } from "../transactionService";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { transactionPayload } from "../transactionPayload";
import { paginateOptions } from "../../../constants/config";
import { Column } from "primereact/column";
import { NavigateId } from "../../../shares/NavigateId";
import { useNavigate } from "react-router-dom";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import moment from "moment";
import numeral from "numeral";
import { setPaginate } from "../transactionSlice";
import { Button } from "primereact/button";
import { Search } from "../../../shares/Search";
import { FilterByDay } from "../../../shares/FilterByDay";
import { FilterByDate } from "../../../shares/FilterByDate";

export const TransactionPendingList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { transactions, paginateParams, total } = useSelector(state => state.transaction);

    const [loading, setLoading] = useState(false);

    const first = useRef(0);
    const columns = useRef(transactionPayload.columns);
    const showColumns = useRef(columns.current.filter((col) => col.show === true));

    const onSort = (event) => {
        const sortOrder = event.sortOrder === 1 ? "DESC" : "ASC";
        dispatch(setPaginate({
            ...paginateParams,
            sort: sortOrder,
            order: event.sortField,
            })
        );
    };

    const onPageChange = async(event) => {
        first.current = event.page * paginateParams.per_page;
        dispatch(
            setPaginate({
                ...paginateParams,
                page: event?.page + 1,
                per_page: event?.rows,
            })
        )
    }

    const onFilterByDay = (e) => {
        const updatePaginateParams = { ...paginateParams };
            
        if (e.startDate === "" || e.endDate === "") {
            delete updatePaginateParams.start_date;
            delete updatePaginateParams.end_date;
        } else {
            updatePaginateParams.start_date = moment(e.startDate).format("yy-MM-DD");
            updatePaginateParams.end_date = moment(e.endDate).format("yy-MM-DD");
        }

        console.log(updatePaginateParams);
        dispatch(setPaginate(updatePaginateParams));
    }
    
    const onSearchChange = (event) => {
        dispatch(
            setPaginate({
                ...paginateParams,
                search: event,
            })
        );
    };

    const onDayFilter = (event) => {

    }

    /**
     * Mount Initialize Data
     */
    const mount = useCallback(async () => {
        setLoading(true);
        const updatePaginateParams = {...paginateParams};
        updatePaginateParams.value = "DEPOSIT_PENDING";

        await transactionService.index(dispatch, updatePaginateParams);
        setLoading(false);
    },[paginateParams]);

    useEffect(() => {
        mount();
    }, [mount]);

    const FooterRender = () => {
        return (
            <div className="flex items-center justify-content-between">
                <div> Total - <span style={{ color: "#fff" }}>{total ? total : 0}</span> </div>
                <div className=" flex align-items-center gap-3">
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(transactionPayload.paginateParams));
                        }}
                    />
                </div>
            </div>
        );
    };

    const HeaderRender = () => {
        return (
            <>
                <div className="flex flex-column md:flex-row justify-content-between md:justify-content-between align-items-start md:align-items-start gap-3 mb-3">
                    <Search
                        tooltipLabel={"Search Pending Transcation"}
                        placeholder={"Search Pending Transcation"}
                        onSearch={(e) => onSearchChange(e)}
                    />
                </div>

                <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3 mt-3">
                    <div className="flex align-items-center gap-3">
                        <FilterByDay
                        onFilter={(e) => onFilterByDay(e)}
                        />
                    </div>

                    <FilterByDate
                        onFilter={(e) => onFilterByDay(e)}
                    />
                </div>
            </>
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>
        
            <div className="col-12">
                <Card title="Pending Transactions">
                    <DataTable
                        id="pending-transactions"
                        dataKey="id"
                        size="normal"
                        value={transactions}
                        sortField={paginateParams.order}
                        sortOrder={ paginateParams.sort === "DESC" ? 1 : paginateParams.sort === "ASC" ? -1 : 0}
                        onSort={onSort}
                        loading={loading}
                        emptyMessage="No Pending Transactions Found."
                        globalFilterFields={transactionPayload.columns}
                        sortMode={paginateOptions.sortMode}
                        header={<HeaderRender />}
                        footer={<FooterRender />}
                        lazy={true}
                    >
                        {showColumns.current.map((col, index) => {
                        return (
                            <Column
                                resizeable={true}
                                key={`transaction_pending_col_index_${index}`}
                                style={{ minWidth: col.field === "action" ? "" : "250px" }}
                                field={col.field}
                                header={col.header}
                                frozen={col.frozen}
                                sortable={col.sortable}
                                body={(value) => {
                                    switch (col.field) {
                                        case "id":
                                            return (
                                                <NavigateId 
                                                    url={`${paths.transaction}/${value[col.field]}`} 
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
                                            return (<span> {numeral(value[col.field]).format("0,0")} (EMU) </span>);
                                        case "package_roi_rate":
                                            return <span> {value[col.field]} % </span>;
                                        case "package_duration":
                                            return <span> {value[col.field]} Months </span>;
                                        case "status":
                                            return <Status status={value[col.field]} />;
                                        case "created_at":
                                            return (<span> {moment(value[col.field]).format("DD-MM-YYYY hh:mm:ss A")}</span>);
                                        case "updated_at":
                                            return (<span> {moment(value[col.field]).format("DD-MM-YYYY hh:mm:ss A")}</span>);
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
                        totalRecords={total}
                        rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                        template={
                        "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                        }
                        currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                        onPageChange={onPageChange}
                    />
                </Card>
            </div>
        </div>
    )
}