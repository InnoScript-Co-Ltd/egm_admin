

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auditColumns, paginateOptions } from '../../../constants/config';
import { Search } from '../../../shares/Search';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { PaginatorRight } from '../../../shares/PaginatorRight';
import { Column } from 'primereact/column';
import { datetime } from '../../../helpers/datetime';
import { paths } from '../../../constants/paths';
import { Paginator } from 'primereact/paginator';
import { setPermissionPaginate } from '../authorizationSlice';
import { setDateFilter } from '../../../shares/shareSlice';
import { Card } from 'primereact/card';
import { NavigateId } from '../../../shares/NavigateId';
import { permissionService } from '../permissionService';
import { setPaginate } from '../permissionSlice';
import { permissionPayload } from '../permissionPayload';
import { Loading } from '../../../shares/Loading';

export const PermissionTableView = () => {

    const dispatch = useDispatch();
    const { permissions, paginateParams } = useSelector(state => state.permission);

    const [loading, setLoading] = useState(false);
    const [showAuditColumn, setShowAuditColumn] = useState(false);

    const first = useRef(0);
    const total = useRef(0);

    const columns = useRef(permissionPayload.columns);
    const showColumns = useRef(columns?.current?.filter(col => col.show === true));


    /**
     * Event - Paginate Page Change
     * @param {*} event 
     */
    const onPageChange = (event) => {
        first.current = event.page * paginateParams.per_page;
        dispatch(
            setPermissionPaginate({
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
            setPermissionPaginate({
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
            setPermissionPaginate({
                ...paginateParams,
                sort: sortOrder,
                order: event.sortField
            })
        );
    }

    /** Loading Permission List Data */
    const loadingData = useCallback(async () => {
        setLoading(true);
        const result = await permissionService.index(dispatch, paginateParams);
        if (result.status === 200) {
            total.current = result?.data?.total ? result.data.total : result.data.length;
        }

        setLoading(false);
    }, [dispatch, paginateParams]);


    useEffect(() => {
        loadingData();
    }, [loadingData])

    /** Footer for datatable  **/
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
                            dispatch(setPaginate(permissionPayload.paginateParams));
                            dispatch(setDateFilter({ startDate: "", endDate: "" }));
                        }}
                    />
                    <PaginatorRight
                        show={showAuditColumn}
                        onHandler={(e) => setShowAuditColumn(e)}
                        label={"Show Audit Column"}
                    />
                </div>
            </div>
        )
    }

    /** Header for datatable */
    const HeaderRender = () => {
        return (
            <div className="w-full flex flex-column md:flex-row justify-content-between md:justify-content-start align-items-start md:align-items-center gap-3">
                <Search
                    tooltipLabel={"search role by id, name, description"}
                    placeholder={"Search permission"}
                    onSearch={(e) => onSearchChange(e)}
                    label={"Search Permission"}
                />
            </div>
        )
    }


    return (
        <Card
            title={"Permssion List"}
        >
            <Loading loading={loading} />
            
            <DataTable
                dataKey="id"
                size="normal"
                value={permissions}
                sortField={paginateParams.order}
                sortOrder={paginateParams.sort === 'DESC' ? 1 : paginateParams.sort === 'ASC' ? -1 : 0}
                onSort={onSort}
                sortMode={paginateOptions.sortMode}
                loading={loading}
                emptyMessage="No permission found."
                globalFilterFields={permissionPayload.columns}
                header={<HeaderRender />}
                footer={<FooterRender />}
            >
                {showColumns && showColumns.current?.map((col, index) => {
                    return (
                        <Column
                            key={`role_col_index_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {

                                switch (col.field) {
                                    case "name":
                                      return (
                                        <NavigateId
                                          url={`${paths.permission}/${value.id}`}
                                          value={value[col.field]}
                                        />
                                      );
                                    default:
                                      return value[col.field];
                                  }

                            }}
                        />
                    )
                })}

                {showAuditColumn && auditColumns?.map((col, index) => {
                    return (
                        <Column
                            key={`audit_column_key_${index}`}
                            style={{ minWidth: "250px" }}
                            field={col.field}
                            header={col.header}
                            sortable
                            body={(value) => {
                                if (col.field === 'created_at' || col.field === 'updated_at' || col.field === 'deleted_at') {
                                    return <label> {datetime.long(value[col.field])} </label>
                                } else {
                                    return <label> {value[col.field] && value[col.field].name} </label>
                                }
                            }}
                        />
                    )
                })}
            </DataTable>
            <Paginator
                first={first.current}
                rows={paginateParams.per_page}
                totalRecords={total?.current}
                rowsPerPageOptions={paginateOptions?.rowsPerPageOptions}
                template={"FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"}
                currentPageReportTemplate="Total - {totalRecords} | {currentPage} of {totalPages}"
                onPageChange={onPageChange}
            />
        </Card>
    )
}