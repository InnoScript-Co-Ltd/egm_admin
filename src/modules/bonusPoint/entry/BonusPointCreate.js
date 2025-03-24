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
import { bonusPointPayload } from '../bonusPointPayload';
import { bonusPointService } from '../bonusPointService';

export const BonusPointCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(bonusPointPayload.create);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitBonusPointCreate = async () => {
        setLoading(true);
        const response = await bonusPointService.create(dispatch, payload);
        if(response.data){
            navigate(`/${paths.bonusPoint}`);
        }
        setLoading(false);
    }

    return (
        <div className='grid'>
            <div className='col-12'>
                <BreadCrumb />
            </div>

            <div className='col-12'>
                <Card
                    title="Bonus Point Create"
                >
                    <Loading loading={loading} />
                    
                    <div className='grid'>
                        <div className='col-12 md:col-6 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="label" className='text-black'> Label (required*) </label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="label"
                                    name="label"
                                    autoComplete='label'
                                    aria-describedby="label-help"
                                    tooltip='Bonus Point Label'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter bonus point'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'label', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"label"} />
                            </div>
                        </div>

                        <div className='col-12 md:col-6 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="limit_amount" className='text-black'> Limit Amount (required*) </label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="limit_amount"
                                    name="limit_amount"
                                    autoComplete='limit_amount'
                                    aria-describedby="limit_amount-help"
                                    tooltip='Bonus Point Limit Amount'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter bonus point limit amount'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'limit_amount', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"limit_amount"} />
                            </div>
                        </div>

                    <FormMainAction
                        cancel="Cancel"
                        onCancel={() => navigate(paths.bonusPoint)}
                        submit="Create"
                        onSubmit={submitBonusPointCreate}
                        loading={loading}
                    />
                </div>
            </Card>
        </div>
    </div>
    )
}
