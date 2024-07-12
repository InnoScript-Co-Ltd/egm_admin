import React, { useCallback, useEffect, useState } from 'react'
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
    const [status, setStatus] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const { packageDetail } = useSelector(state => state.package);

    const submitPackageUpdate = async () => {
        setLoading(true);
        await packageService.update(dispatch, params.id, payload);
        setLoading(false);
    }

    const lodaingData = useCallback(async () => {
        setLoading(true);
        await packageService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    const loadingStatus = useCallback(async () => {
        setLoading(true);
        const result = await getRequest(`${endpoints.status}?type=general`);
        if (result.status === 200) {
            console.log(result.data.general);
            setStatus(result.data.general);
        }
    }, []);

    useEffect(() => {
        loadingStatus();
    }, [loadingStatus]);

    useEffect(() => {
        lodaingData();
    }, [lodaingData])

    useEffect(() => {
        if (packageDetail) {
            setPayload(packageDetail);
        }
    }, [packageDetail])

    return (
        <div className=' grid'>
            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <Card
                    title={"Update Package Information"}
                    subTitle={"Deposit packages for investor and agent"}
                >

                    <Loading loading={loading} />

                    <div className=' grid'>
                        <div className=' col-12 md:col-3 lg:col-3 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="name" className=' text-black'> Name </label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="name"
                                    name="name"
                                    autoComplete='name'
                                    aria-describedby="name-help"
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
                                <label htmlFor="roi_rate" className=' text-black'> ROI Rate (%) </label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="roi_rate"
                                    name="roi_rate"
                                    autoComplete='roi_rate'
                                    aria-describedby="code-help"
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
                                <label htmlFor="duration" className=' text-black'> Duration </label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="duration"
                                    name="duration"
                                    autoComplete='duration'
                                    value={payload.duration ? payload.duration : ""}
                                    aria-describedby="duration-help"
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
                                <label htmlFor="deposit_rate" className=' text-black'> Deposit Rate </label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="deposit_rate"
                                    name="deposit_rate"
                                    value={payload.deposit_rate ? payload.deposit_rate : ""}
                                    autoComplete='deposit_rate'
                                    aria-describedby="deposit_rate-help"
                                    tooltip='deposit_rate'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter Deposit Rate'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'deposit_rate', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"deposit_rate"} />
                            </div>
                        </div>

                        {status && (
                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="status" className='text-black'> Status </label>
                                    <Dropdown
                                        inputId='status'
                                        name="status"
                                        autoComplete='status'
                                        options={status}
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
                        )}

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
        </div>
    )
}
