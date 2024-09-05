import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { packagePayload } from '../packagePayload';
import { packageService } from '../packageService';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { Dropdown } from 'primereact/dropdown';

export const PackageCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(packagePayload.create);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const packageType = useRef([]);

    const submitPackageCreate = async () => {
        setLoading(true);

        const updatePayload = {...payload};
        updatePayload.deposit_amount = payload.deposit_amount.split(',');

        const response = await packageService.store(updatePayload, dispatch);
        if (response.status === 200) {
            navigate(paths.package);
        }
        setLoading(false);
    }

    /** Initialize Loading Data */
    const mount = useCallback(async () => {
        setLoading(true);
        const packageTypeResult = await getRequest(`${endpoints.status}?type=package`);

        if (packageTypeResult.status === 200) {
            packageType.current = packageTypeResult.data.package;
        }

        setLoading(false);
    }, []);

    /** Mouth Initialize */
    useEffect(() => {
        mount();
    }, [mount]);

    return (
        <div className=' grid'>
            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <Card title={"Create New Package"}>

                    <Loading loading={loading} />

                    <div className=' grid'>
                        <div className=' col-12 md:col-3 lg:col-3 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className='input-label'> Name <span> (required*) </span> </label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='package name'
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
                                <label className='input-label'> Choose Deposit Package Type <span> (required*) </span> </label>
                                <Dropdown
                                    className="p-inputtext-sm"
                                    placeholder='Choose Deposit Package Type'
                                    options={packageType.current}
                                    disabled={loading}
                                    value={payload.package_type ? payload.package_type : ""}
                                    onChange={(e) => payloadHandler(payload, e.value, 'package_type', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"package_type"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-3 lg:col-3 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className=' input-label'> ROI Rate (%) <span>  (required*) </span></label>
                                <InputText
                                    className="p-inputtext-sm input-label"
                                    placeholder='Enter ROI Rate'
                                    type='number'
                                    tooltip='ROI Rate'
                                    tooltipOptions={{ ...tooltipOptions }}
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
                                <label className=' input-label'> Duration <span> (required*) </span></label>
                                <InputText
                                    className="p-inputtext-sm input-label"
                                    tooltip='duration'
                                    type='number'
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
                                <label className=' input-label'> Deposit Amount <span> (required*) </span></label>
                                <InputText
                                    className="p-inputtext-sm input-label"
                                    tooltip='Deposit Amount'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter Deposit Amount'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'deposit_amount', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"deposit_amount"} />
                            </div>
                        </div>

                        <FormMainAction
                            cancel={"Cancel"}
                            onCancel={() => navigate(paths.package)}
                            submit={"Create"}
                            onSubmit={submitPackageCreate}
                            loading={loading}
                        />

                    </div>

                </Card>
            </div>
        </div>
    )
}
