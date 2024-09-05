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
import { countryPayload } from '../countryPayload';
import { countryService } from '../countryService';
import { Thumbnail } from '../../../shares/Thumbnail';
import { formBuilder } from '../../../helpers/formBuilder';

export const CountryCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(countryPayload.create);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /** Create Country */
    const submitCountryCreate = async () => {
        setLoading(true);
        const form = formBuilder(payload, countryPayload.create);
        const response = await countryService.store(form, dispatch);

        if (response.data) {
            navigate(paths.country);
        }
        setLoading(false);
    }

    return (
        <div className=' grid'>
            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <Card title="Create Country" >

                    <Loading loading={loading} />

                    <div className='grid'>
                        <div className='col-12'>
                            <Thumbnail
                                preview={payload.flag ? payload.flag.image : null}
                                onSelect={(e) => payloadHandler(payload, e, 'flag', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                            <ValidationMessage field={"flag"} />
                        </div>


                        <div className=' col-12 md:col-6 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className='input-label'> Name <span> (required*)</span></label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='Region name'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter region name'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"name"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className='input-label'> Country Code <span> (required*)</span></label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='Country Code'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter country code'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'country_code', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"country_code"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="mobile_prefix" className='input-label'> Mobile Prefix <span> (required*)</span></label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='mobile number prefix'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter mobile prefix'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'mobile_prefix', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"mobile_prefix"} />
                            </div>
                        </div>

                        <FormMainAction
                            cancel={"Cancel"}
                            onCancel={() => navigate(paths.country)}
                            submit={'Create'}
                            onSubmit={submitCountryCreate}
                            loading={loading}
                        />

                    </div>

                </Card>
            </div>
        </div>
    )
}
