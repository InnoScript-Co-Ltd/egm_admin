import React, { useState } from 'react'
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

export const PackageCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(packagePayload.create);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitPackageCreate = async () => {
        setLoading(true);
        const response = await packageService.store(payload , dispatch);
        if(response.data){
            navigate(`${paths.package}/${response.data.id}`);
        }
        setLoading(false);
    }

    return (
        <>

            <div className=' grid'>
                <div className=' col-12'>
                    <BreadCrumb />
                </div>

                <div className=' col-12'>
                    <Card
                        title={"Create New Package"}
                        subTitle="Package for investor and agent"
                    >

                        <Loading loading={loading} />

                        <div className=' grid'>
                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'> Name <span> (required*) </span> </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="name"
                                        name="name"
                                        autoComplete='name'
                                        aria-describedby="name-help"
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
                                    <label htmlFor="roi_rate" className=' text-black'> ROI Rate (%) <span>  (required*) </span></label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="roi_rate"
                                        name="roi_rate"
                                        autoComplete='roi_rate'
                                        aria-describedby="code-help"
                                        tooltip='ROI Rate'
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
                                    <label htmlFor="duration" className=' text-black'> Duration <span> (required*) </span></label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="duration"
                                        name="duration"
                                        autoComplete='duration'
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
                                    <label htmlFor="deposit_rate" className=' text-black'> Deposit Rate <span> (required*) </span></label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="deposit_rate"
                                        name="deposit_rate"
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

        </>
    )
}
