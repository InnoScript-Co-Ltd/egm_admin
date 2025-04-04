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
import { repaymentPayload } from '../repaymentPayload';
import { repaymentService } from '../repaymentService';
import { Calendar } from 'primereact/calendar';
import { PartnerView } from '../views/PartnerView';
import moment from 'moment';
import { Dropdown } from 'primereact/dropdown';

export const RepaymentUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(repaymentPayload.update);
    const [partner, setPartner] = useState(null);

    const { repayment } = useSelector(state => state.repayment);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const submitRepaymentUpdate = async () => {
        setLoading(true);
        await repaymentService.update(dispatch, params.id, payload);
        await repaymentService.show(dispatch, params.id);
        setLoading(false);
    }

    const repaymentStatus = [
        "AVAILABLE_WITHDRAW", "TRANSFER_SUCCESS"
    ]; 

    /** Initialize Loading Data */
    const mount = useCallback(async () => {
        setLoading(true);
        await repaymentService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    /** Mouth Initialize */
    useEffect(() => {
        mount();
    }, [mount]);

    useEffect(() => {
        if (repayment) {
            const updatePayload = {...repayment};
            updatePayload.date = moment(updatePayload.date).toDate();
            updatePayload.created_at = moment(updatePayload.created_at).toDate();
            updatePayload.updated_at = moment(updatePayload.updated_at).toDate();
            setPayload(updatePayload);
            setPartner(repayment.partner);
        }
    }, [repayment]);

    return (
        <div className=' grid'>
            <div className=' col-12'>
                <BreadCrumb />
            </div>

            { partner && (
                <PartnerView 
                    dataSource={partner}            
                />
            )}                                 

            <div className=' col-12'>
                <Card title={"Update Repayment"}>

                    <Loading loading={loading} />
                    <div className=' grid'>
                        <div className=' col-12 md:col-2 lg:col-2 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className='input-label'> Count Days </label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='count day'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter Count Days'
                                    value={payload.count_days ? payload.count_days : ""}
                                    disabled={loading}
                                    type='number'
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'count_days', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"count_days"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-2 lg:col-2 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className='input-label'> Total Days </label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='total day'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter Total Days'
                                    value={payload.total_days ? payload.total_days : ""}
                                    type='number'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'total_days', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"total_days"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-2 lg:col-2 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className='input-label'> Amount </label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='Amount'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter Amount'
                                    value={payload.amount ? payload.amount : ""}
                                    disabled={loading}
                                    type='number'
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'amount', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"amount"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-2 lg:col-2 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className='input-label'> One Day Amount </label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='One Day Amount'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter Amount'
                                    value={payload.oneday_amount ? payload.oneday_amount : ""}
                                    disabled={loading}
                                    type='number'
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'oneday_amount', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"oneday_amount"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-2 lg:col-2 py-3'>
                            <div className="flex flex-column gap-2">
                                <label className='input-label'> Total Amount </label>
                                <InputText
                                    className="p-inputtext-sm"
                                    tooltip='Total Amount'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter Total Amount'
                                    value={payload.total_amount ? payload.total_amount : ""}
                                    disabled={loading}
                                    type='number'
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'total_amount', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"total_amount"} />
                            </div>
                        </div>

                        <div className="col-12 md:col-2 lg:col-2 py-3">
                            <label htmlFor="date" className='input-label'> Repayment Date </label>
                            <div className="p-inputgroup mt-2">
                                <Calendar
                                    className="p-inputtext-sm"
                                    placeholder="Enter Repayment Date"
                                    value={payload.date ? payload.date : new Date()}
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

                        <div className="col-12 md:col-2 lg:col-2 py-3">
                            <label htmlFor="created_at" className='input-label'> Created At </label>
                            <div className="p-inputgroup mt-2">
                                <Calendar
                                    className="p-inputtext-sm"
                                    placeholder="Enter Created Date"
                                    value={payload.created_at ? payload.created_at : new Date()}
                                    tooltip="Created Date"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'created_at', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    dateFormat="dd/mm/yy"
                                />
                            </div>
                            <ValidationMessage field="created_at" />
                        </div>

                        <div className="col-12 md:col-2 lg:col-2 py-3">
                            <label htmlFor="updated_at" className='input-label'> Updated At </label>
                            <div className="p-inputgroup mt-2">
                                <Calendar
                                    className="p-inputtext-sm"
                                    placeholder="Enter Created Date"
                                    value={payload.updated_at ? payload.updated_at : new Date()}
                                    tooltip="Updated Date"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'updated_at', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    dateFormat="dd/mm/yy"
                                />
                            </div>
                            <ValidationMessage field="updated_at" />
                        </div>

                        <div className="col-12 md:col-2 lg:col-2 py-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="status" className='input-label text-black'> Status </label>
                                <Dropdown
                                    className="p-inputtext-sm"
                                    id="status"
                                    name="status"
                                    options={repaymentStatus}
                                    placeholder="Select Status"
                                    disabled={loading}
                                    value={payload.status ?? ""}
                                    onChange={(e) => payloadHandler(payload, e.value, 'status', (updatePayload) => {
                                        setPayload(updatePayload);
                                    })}
                                />
                                <ValidationMessage field={"status"} />
                            </div>
                        </div>

                        <FormMainAction
                            cancel={"Cancel"}
                            onCancel={() => navigate(`/${paths.repayment}`)}
                            submit={"Update"}
                            onSubmit={submitRepaymentUpdate}
                            loading={loading}
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}
