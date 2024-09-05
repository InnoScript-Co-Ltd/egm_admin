import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { packagePayload } from '../packagePayload';
import { packageService } from '../packageService';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { Dropdown } from 'primereact/dropdown';
import { BreadCrumb } from '../../../shares/BreadCrumb';

export const PackageUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(packagePayload.update);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();

    const status = useRef([]);
    const packageType = useRef([]);

    const { packageDetail } = useSelector(state => state.depositPackage);

    /** Update Package Information */
    const submitPackageUpdate = async () => {
        setLoading(true);
        const updatePayload = {...payload};
        updatePayload.deposit_amount = payload.deposit_amount.split(',');
        await packageService.update(dispatch, params.id, updatePayload);
        setLoading(false);
    }

    /** Initialize Loading Data */
    const mount = useCallback(async () => {
        setLoading(true);
        await packageService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    /** Loading General Status Data */
    const loadingStatus = useCallback(async () => {
        setLoading(true);
        const result = await getRequest(`${endpoints.status}?type=general`);
        if (result.status === 200) {
            status.current = result.data.general
        }
        setLoading(false);
    }, []);

    /** Loading Package Type Data */
    const loadingPackageType = useCallback(async () => {
        setLoading(true);
        const result = await getRequest(`${endpoints.status}?type=package`);
        if (result.status === 200) {
            packageType.current = result.data.package
        }
        setLoading(false);
    }, []);

    /** Loading Initialize */
    useEffect(() => {
        loadingPackageType();
    }, [loadingPackageType]);

    useEffect(() => {
        loadingStatus();
    }, [loadingStatus]);

    useEffect(() => {
        mount();
    }, [mount]);

    useEffect(() => {
        if (packageDetail) {
            const updatePayload = { ...packageDetail };
            updatePayload.deposit_amount = packageDetail.deposit_amount.toString();
            setPayload(updatePayload);
        }
    }, [packageDetail]);


    return (
        <div className=' grid'>
            <div className=" col-12">
                <BreadCrumb />
            </div>

            {packageDetail && (
                <div className=' col-12'>
                    <Card title={"Update Package Information"}>

                        <Loading loading={loading} />

                        <div className=' grid'>
                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className='input-label'> Name </label>
                                    <InputText
                                        className="p-inputtext-sm"
                                        tooltip='package name'
                                        value={payload.name ? payload.name : ""}
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter package name'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"name"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="roi_rate" className='input-label'> ROI Rate (%) </label>
                                    <InputText
                                        type='number'
                                        className="p-inputtext-sm"
                                        tooltip='ROI Rate'
                                        value={payload.roi_rate ? payload.roi_rate : ""}
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter ROI Rate'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'roi_rate', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"roi_rate"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="duration" className='input-label'> Duration </label>
                                    <InputText
                                        type='number'
                                        className="p-inputtext-sm"
                                        value={payload.duration ? payload.duration : ""}
                                        tooltip='duration'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter duration'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'duration', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"duration"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="deposit_rate" className='input-label'> Deposit Rate </label>
                                    <InputText
                                        className="p-inputtext-sm"
                                        value={payload.deposit_amount ? payload.deposit_amount : ""}
                                        tooltip='deposit_rate'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Deposit Rate'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'deposit_amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"deposit_amount"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label className='input-label'> Choose Package Type </label>
                                    <Dropdown
                                        className="p-inputtext-sm"
                                        placeholder="Select package type"
                                        options={packageType.current}
                                        disabled={loading}
                                        value={payload.package_type ? payload.package_type : ""}
                                        onChange={(e) => payloadHandler(payload, e.value, 'package_type', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />

                                    <ValidationMessage field={"status"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label className='input-label'> Status </label>
                                    <Dropdown
                                        options={status.current}
                                        placeholder="Select a general status"
                                        disabled={loading}
                                        value={payload.status ? payload.status : ""}
                                        className="p-inputtext-sm"
                                        onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />

                                    <ValidationMessage field={"status"} />
                                </div>
                            </div>

                            <div className=' col-12 py-3'>
                                <FormMainAction
                                    cancel={"Cancel"}
                                    onCancel={() => navigate(paths.package)}
                                    submit={"Update"}
                                    onSubmit={submitPackageUpdate}
                                    loading={loading}
                                />
                            </div>

                        </div>

                    </Card>
                </div>
            )}
        </div>
    )
}
