import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import { depositPayload } from '../depositPayload';
import { depositService } from '../depositService';

export const DepositUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(depositPayload.update);
    const [status, setStatus] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { translate } = useSelector(state => state.setting);
    const { deposit } = useSelector(state => state.deposit);

    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await depositService.showUpdate(dispatch, params.id);
        console.log(response,"data")
        setLoading(false);
    }, [params.id, dispatch])

    useEffect(() => {
        loadingData()
    }, [loadingData])

    useEffect(() => {
        generalStatus().then((data) => {
            setStatus(data)
        }).catch((error) => console.log(error))

    }, [])

    useEffect(() => {
        if (deposit) {
            setPayload(deposit)
        }
    }, [deposit])

    const submitdepositUpdate = async () => {
        setLoading(true);
        await depositService.update(dispatch, params.id, payload);
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
                        title={translate.deposit_update}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>
                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>{translate.amount} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="amount"
                                        name="amount"
                                        autoComplete='amount'
                                        aria-describedby="amount-help"
                                        tooltip='Amount'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your amount'
                                        disabled={loading}
                                        value={payload?.amount ? payload.amount : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"amount"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>{translate.total_amount} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="total_amount"
                                        name="total_amount"
                                        autoComplete='total_amount'
                                        aria-describedby="total_amount-help"
                                        tooltip='TotalAmount'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your total amount'
                                        disabled={loading}
                                        value={payload?.total_amount ? payload.total_amount : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'total_amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"total_amount"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>{translate.oneday_amount} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="oneday_amount"
                                        name="oneday_amount"
                                        autoComplete='oneday_amount'
                                        aria-describedby="oneday_amount-help"
                                        tooltip='OnedayAmount'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your oneday amount'
                                        disabled={loading}
                                        value={payload?.oneday_amount ? payload.oneday_amount : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'oneday_amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"oneday_amount"} />
                                </div>
                            </div>

                            {/* <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="phone" className='text-black'>Status</label>
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
                            </div> */}

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.deposit)}
                                submit={translate.submit}
                                onSubmit={submitdepositUpdate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
