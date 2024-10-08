import { DataTable } from "primereact/datatable"
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
import { countryPayload } from "../countryPayload";
import { countryService } from "../countryService";
import { setPaginate } from "../countrySlice";
import { endpoints } from "../../../constants/endpoints";
import { Avatar } from "primereact/avatar";

export const CountryTableView = () => {

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const { countries, paginateParams } = useSelector(state => state.country);

    const dispatch = useDispatch();

    const first = useRef(0);
    const total = useRef(0);
    const columns = useRef(countryPayload.columns);
    const showColumns = useRef(columns.current.filter(col => col.show === true));

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
        const response = await countryService.index(dispatch, paginateParams);
        if (response.status === 200) {
            total.current = response.data.total ? response.data.total : response.data.length;
        }
        setLoading(false);
    }, [dispatch, paginateParams]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    const FooterRender = () => {
        return (
            <div className=' flex items-center justify-content-between'>
                <div> Total - <span>{total ? total.current : 0}</span></div>
                <div className=' flex align-items-center gap-3'>
                    <Button
                        outlined
                        icon="pi pi-refresh"
                        size="small"
                        onClick={() => {
                            dispatch(setPaginate(countryPayload.paginateParams));
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
        )
    }

    /**
    * Table Header Render
    */
    const HeaderRender = () => {
        return (
            <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3">
                <Search
                    tooltipLabel={countryPayload.columns}
                    placeholder={"Search Contries"}
                    onSearch={(e) => onSearchChange(e)}
                    label="Search Country"
                />
            </div>
        )
    }

    /** Render - Column Icon Field
    * @returns
    */
    const IconRender = ({ dataSource }) => {
        return (
            <Avatar
                className="category-icon"
                icon="pi pi-image"
                shape="circle"
                image={dataSource ? `${endpoints.image}/${dataSource}` : null}
            />
        );
    };

    return (
        <Card title="Country">
            <DataTable
                dataKey="id"
                size="normal"
                value={countries}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                loading={loading}
                emptyMessage="No country found."
                globalFilterFields={countryPayload.columns}
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
                                    case "country_code":
                                        return (
                                            <NavigateId
                                                url={`${paths.country}/${value['id']}`}
                                                value={value[col.field]}
                                            />
                                        );
                                    case "flag":
                                        return <IconRender dataSource={value[col.field]} />
                                    case "status":
                                        return <Status status={value[col.field]} />;
                                    case "address":
                                        return <span>{value[col.field]?.substring(0, 8)}...</span>;
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