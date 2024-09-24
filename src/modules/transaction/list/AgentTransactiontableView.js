import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";
import { Search } from "../../../shares/Search";
import { Button } from "primereact/button";
import { auditColumns, paginateOptions } from "../../../constants/config";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { PaginatorRight } from "../../../shares/PaginatorRight";
import { useDispatch, useSelector } from "react-redux";
import { Paginator } from "primereact/paginator";
import { Status } from "../../../shares/Status";
import { paths } from "../../../constants/paths";
import { datetime } from "../../../helpers/datetime";
import { setDateFilter } from "../../../shares/shareSlice";
import { Card } from "primereact/card";
import { NavigateId } from "../../../shares/NavigateId";
import { setPaginate } from "../transactionSlice";
import { transactionPayload } from "../transactionPayload";
import { transactionService } from "../transactionService";
import numeral from "numeral";

export const AgentTransactionTableView = () => {
    const { transactions, paginateParams } = useSelector(state => state.transaction);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const columns = useRef(transactionPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));
    const first = useRef(0);
    const total = useRef(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

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
                order: event.sortField
            })
        );
    }

    /**
     * Loading Data
     */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const updateParams = { ...paginateParams };
        updateParams.filter = "status,sender_type";
        updateParams.value = `${params.type.toUpperCase()},MAIN_AGENT`;

        const response = await transactionService.index(dispatch, updateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, paginateParams, params.type]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    const FooterRender = () => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div> Total - <span style={{ color: "#4338CA" }}>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(transactionPayload.paginateParams));
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
        )
    }

    /**
    * Table Header Render
    */
    const HeaderRender = () => {
        return (
            <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3">
                <Search
                    tooltipLabel={"Search Transcation"}
                    placeholder={"Search Transcation"}
                    onSearch={(e) => onSearchChange(e)}
                    label={"Search"}
                />
            </div>
        )
    }

    return (
        <Card
            title={`Agent Transcations - ${params.type.toUpperCase()}`}
        >
            <DataTable
                dataKey="id"
                size="normal"
                value={transactions}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                loading={loading}
                emptyMessage="No Transaction transctions found."
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
                                            <i
                                                className="pi pi-folder-open"
                                                style={{ cursor: "pointer", fontSize: '1.5rem' }}
                                                onClick={() => navigate(`${paths.transaction}/${params.type}/${value.id}`)}
                                            ></i>
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
                                            <span> {numeral(value[col.field]).format('0,0')} </span>
                                        );
                                    case "package_roi_rate":
                                        return (
                                            <span> {value[col.field]} % </span>
                                        )
                                    case "package_duration":
                                        return (
                                            <span> {value[col.field]} Months </span>
                                        )
                                    case "commession":
                                        return (
                                            <span> 1 % </span>
                                        )
                                    case "status":
                                        return <Status status={value[col.field]} />;
                                    default:
                                        return value[col.field];
                                }
                            }}
                        />
                    )
                })}

                {showAuditColumn && auditColumns.map((col, index) => {
                    return (
                        <Column
                            key={`audit_column_key_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => <label> {datetime.long(value[col.field])} </label>}
                        />
                    )
                })}
            </DataTable>
            <Paginator
                first={first.current}
                rows={paginateParams.per_page}
                totalRecords={total.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </Card>
    )
}