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
import { Calendar } from 'primereact/calendar';


export const DepositUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(depositPayload.update);
    const [status, setStatus] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params,"new")
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
        const response = await depositService.update(dispatch, params.id, payload);
        console.log(response,"update")
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
                        title="Edit Deposit"

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>
                            
                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="date" className='input-label'> Date </label>
                                    <div className="p-inputgroup mt-2">
                                    <Calendar
                                        className="p-inputtext-sm"
                                        placeholder="Enter Date"
                                        value={payload.date ? new Date(new Date(payload.date).setDate(new Date(payload.date).getDate() - 1)) : null}
                                        tooltip="Repayment Date"
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'date', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        dateFormat="dd/mm/yy"
                                    />

                                    </div>
                                    <ValidationMessage field="date" />
                            </div>  

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>Amount (required*)</label>
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
                                    <label htmlFor="name" className=' text-black'>Total Amount (required*)</label>
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
                                    <label htmlFor="name" className=' text-black'>Oneday Amount (required*)</label>
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

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="date" className=' text-black'>Count Day (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="count_days"
                                        name="count_days"
                                        autoComplete='counts_day'
                                        aria-describedby="count_days-help"
                                        tooltip='CountDay'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your count days'
                                        disabled={loading}
                                        value={payload?.count_days ? payload.count_days : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'count_days', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"count_days"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="date" className=' text-black'>Total Day (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="total_days"
                                        name="total_days"
                                        autoComplete='total_days'
                                        aria-describedby="total_days-help"
                                        tooltip='TotalDay'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your total days'
                                        disabled={loading}
                                        value={payload?.total_days ? payload.total_days : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'total_days', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"total_days"} />
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
                                cancel="Cancel"
                                onCancel={() => navigate(`${paths.deposit}/agent`)}
                                submit="Submit"
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
