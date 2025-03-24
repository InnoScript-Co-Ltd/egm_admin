import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
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
import { Dropdown } from 'primereact/dropdown';
import { generalStatus } from '../../../helpers/StatusHandler';
import { bonusPointPayload } from '../bonusPointPayload';
import { bonusPointService } from '../bonusPointService';

export const BonusPointUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(bonusPointPayload.update);
    const [status, setStatus] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    /** Loading region Data **/
    const loadingBonusPointData = useCallback(async () => {
        setLoading(true);
        const result = await bonusPointService.show(dispatch, params.id);
        if (result.status === 200) {
            setPayload(result.data);
        }
        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingBonusPointData()
    }, [loadingBonusPointData])

    useEffect(() => {
        generalStatus().then((data) => {
            setStatus(data)
        });
    }, [])

    const submitBonusPointUpdate = async () => {
        setLoading(true);
        await bonusPointService.update(dispatch, params.id, payload);
        setLoading(false);
    }

    return (
        <div className='grid'>
            <div className='col-12'>
                <BreadCrumb />
            </div>

            <div className='col-12'>
                <Card
                    title="Update Bonus Point"
                >
                    <Loading loading={loading} />

                    <div className='grid'>
                        <div className='col-12 md:col-6 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="label"> Label </label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="label"
                                    name="label"
                                    autoComplete='label'
                                    aria-describedby="label-help"
                                    tooltip='Bonus point label'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter bonus point label'
                                    disabled={loading}
                                    value={payload?.label ? payload.label : ""}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'label', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"label"} />
                            </div>
                        </div>

                        <div className='col-12 md:col-6 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="limit_amount"> Limit Amount </label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="limit_amount"
                                    name="limit_amount"
                                    autoComplete='limit_amount'
                                    aria-describedby="limit_amount-help"
                                    tooltip='Bonus point limit amount'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter bonus point limit amount'
                                    disabled={loading}
                                    value={payload?.limit_amount ? payload.limit_amount : ""}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'limit_amount', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"limit_amount"} />
                            </div>
                        </div>

                        <div className='col-12 md:col-4 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="status" className='text-black'> Status </label>
                                <Dropdown
                                    options={status}
                                    placeholder="Select a general status"
                                    disabled={loading}
                                    value={payload.status}
                                    className="p-inputtext-sm"
                                    onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />

                                <ValidationMessage field={"status"} />
                            </div>
                        </div>

                        <FormMainAction
                            cancel="Cancel"
                            onCancel={() => navigate(`/${paths.bonusPoint}`)}
                            submit="Update"
                            onSubmit={submitBonusPointUpdate}
                            loading={loading}
                        />

                    </div>

                </Card>
            </div>
        </div>
    )
}
