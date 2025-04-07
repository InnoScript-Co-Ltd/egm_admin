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
import { transactionPayload } from '../transactionPayload';
import { transactionService } from '../transactionService';
import { Calendar } from "primereact/calendar";
import moment from "moment";


export const TransactionUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(transactionPayload.update);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { transaction } = useSelector(state => state.transaction);

    const loadingData = useCallback(async () => {
        setLoading(true);
        await transactionService.show(dispatch, params.id);
        setLoading(false);
    }, [params.id, dispatch])

    useEffect(() => {
        loadingData()
    }, [loadingData])

    useEffect(() => {
        if (transaction) {
            setPayload(transaction)
        }
    }, [transaction])

    const submittransactionUpdate = async () => {
        setLoading(true);
        await transactionService.update(dispatch, params.id, payload);
        setLoading(false);
    }

    return (
        <>

            <div className=' grid'>
                <div className=' col-12'>
                    <BreadCrumb />
                </div>

                <div className=' col-12'>
                    <Card>

                        <Loading loading={loading} />

                        <div className=' grid'>
                        <h1 className='col-12 flex justify-content-center align-items-center'>Agent Bank Account Information</h1>
                            <div className=' col-12 md:col-6 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>Bank Account Holder Name (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="name"
                                        name="name"
                                        autoComplete='name'
                                        aria-describedby="name-help"
                                        tooltip='Bank acc holder name'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter bank acc holder name'
                                        disabled={loading}
                                        value={payload?.sender_name ? payload.sender_name : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"name"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="nrc" className=' text-black'>NRC Number (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="nrc"
                                        name="nrc"
                                        autoComplete='nrc'
                                        aria-describedby="nrc-help"
                                        tooltip='NRC'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your nrc'
                                        disabled={loading}
                                        value={payload?.sender_nrc ? payload.sender_nrc : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_nrc', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"nrc"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="email" className=' text-black'>Email (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="email"
                                        name="email"
                                        autoComplete='email'
                                        aria-describedby="email-help"
                                        tooltip='Email'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your email'
                                        disabled={loading}
                                        value={payload?.sender_email ? payload.sender_email : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_email', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"email"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="phone" className=' text-black'>Phone (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="phone"
                                        name="phone"
                                        autoComplete='phone'
                                        aria-describedby="phone-help"
                                        tooltip='Phone'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your phone'
                                        disabled={loading}
                                        value={payload?.sender_phone ? payload.sender_phone : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_phone', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"phone"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="bank_acc_number" className=' text-black'>Bank Account Number (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="bank_acc_number"
                                        name="bank_acc_number"
                                        autoComplete='bank_acc_number'
                                        aria-describedby="bank_acc_number-help"
                                        tooltip='Bank_acc_number'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your bank acc number'
                                        disabled={loading}
                                        value={payload?.sender_account_number ? payload.sender_account_number : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_account_number', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"bank_acc_number"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="bank_type" className=' text-black'>Bank Type (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="bank_type"
                                        name="bank_type"
                                        autoComplete='bank_type'
                                        aria-describedby="bank_type-help"
                                        tooltip='Bank_type'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your bank type'
                                        disabled={loading}
                                        value={payload?.bank_type ? payload.bank_type : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'bank_type', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"bank_type"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="bank_branch" className=' text-black'>Bank Branch (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="bank_branch"
                                        name="bank_branch"
                                        autoComplete='bank_branch'
                                        aria-describedby="bank_branch-help"
                                        tooltip='Bank_branch'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your bank branch'
                                        disabled={loading}
                                        value={payload?.sender_bank_branch ? payload.sender_bank_branch : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_bank_branch', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"bank_branch"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="bank_address" className=' text-black'>Bank Branch Address (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="bank_address"
                                        name="bank_address"
                                        autoComplete='bank_address'
                                        aria-describedby="bank_address-help"
                                        tooltip='Bank_address'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your bank address'
                                        disabled={loading}
                                        value={payload?.sender_bank_address ? payload.sender_bank_address : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_bank_address', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"bank_address"} />
                                </div>
                            </div>

                            <h1 className='col-12 flex justify-content-center align-items-center'>Merchant Bank Account Information</h1>
                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>Bank Account Holder Name (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="name"
                                        name="name"
                                        autoComplete='name'
                                        aria-describedby="name-help"
                                        tooltip='Bank acc holder name'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter bank acc holder name'
                                        disabled={loading}
                                        value={payload?.merchant_account_name ? payload.merchant_account_name : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'merchant_account_name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"name"} />
                                </div>
                            </div>

                            <div className='col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="merchant_account_number" className='text-black'>
                                        Bank Account Number (required*)
                                    </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="merchant_account_number"
                                        name="merchant_account_number"
                                        autoComplete="merchant_account_number"
                                        aria-describedby="merchant_account_number-help"
                                        tooltip="Bank Account Number"
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder="Enter your bank account number"
                                        disabled={loading}
                                        value={payload?.merchant_account_number || ""}
                                        onChange={(e) =>
                                        payloadHandler(payload, e.target.value, 'merchant_account_number', (updateValue) => {
                                        setPayload(updateValue);
                                        })
                                        }
                                    />
                                    <ValidationMessage field="merchant_account_number" />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="bank_type" className=' text-black'>Bank Type (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="bank_type"
                                        name="bank_type"
                                        autoComplete='bank_type'
                                        aria-describedby="bank_type-help"
                                        tooltip='Bank type'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your bank type'
                                        disabled={loading}
                                        value={payload?.bank_type ? payload.bank_type : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'bank_type', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"bank_type"} />
                                </div>
                            </div>

                            <h1 className='col-12 flex justify-content-center align-items-center'>Package Information</h1>
                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_name" className=' text-black'>Package (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="package_name"
                                        name="package_name"
                                        autoComplete='package_name'
                                        aria-describedby="package_name-help"
                                        tooltip='Package name'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your package name'
                                        disabled={loading}
                                        value={payload?.package_name ? payload.package_name : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'package_name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"package_name"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_duration" className=' text-black'>Duration (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="package_duration"
                                        name="package_duration"
                                        autoComplete='package_duration'
                                        aria-describedby="package_duration-help"
                                        tooltip='Package duration'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your package duration'
                                        disabled={loading}
                                        value={payload?.package_duration ? payload.package_duration : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'package_duration', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"package_duration"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_roi_rate" className=' text-black'>ROI Rate (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="package_roi_rate"
                                        name="package_roi_rate"
                                        autoComplete='package_roi_rate'
                                        aria-describedby="package_roi_rate-help"
                                        tooltip='Package ROI rate'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your package roi rate'
                                        disabled={loading}
                                        value={payload?.package_roi_rate ? payload.package_roi_rate : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'package_roi_rate', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"package_roi_rate"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_deposit_amount" className=' text-black'>Depoist Amount (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="package_deposit_amount"
                                        name="package_deposit_amount"
                                        autoComplete='package_deposit_amount'
                                        aria-describedby="package_deposit_amount-help"
                                        tooltip='Package deposit amount'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter your deposit amount'
                                        disabled={loading}
                                        value={payload?.package_deposit_amount ? payload.package_deposit_amount : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'package_deposit_amount', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"package_deposit_amount"} />
                                </div>
                            </div>

                            <div className="col-12 md:col-3 lg:col-4 py-3">
                                <label htmlFor="dob" className='input-label text-black'>Depoist Date (required*)</label>
                                <div className="p-inputgroup mt-2">
                                    <Calendar
                                        name="date"
                                        className="p-inputtext-sm md:mr-2 sm:w-full"
                                        placeholder="Select deposit of date"
                                        selectionMode={"single"}
                                        maxDate={new Date()}
                                        value={payload.created_at ? moment(payload.created_at).toDate() : new Date()}
                                        tooltip="Deposit date"
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'created_at', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                </div>
                                    <ValidationMessage field="created_at" />
                            </div>

                            <div className="col-12 md:col-3 lg:col-4 py-3">
                                <label htmlFor="dob" className='input-label text-black'>Approve Date (required*)</label>
                                <div className="p-inputgroup mt-2">
                                    <Calendar
                                        name="date"
                                        className="p-inputtext-sm md:mr-2 sm:w-full"
                                        placeholder="Select deposit of date"
                                        selectionMode={"single"}
                                        maxDate={new Date()}
                                        value={payload.created_at ? moment(payload.created_at).toDate() : new Date()}
                                        tooltip="Deposit date"
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'created_at', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                </div>
                                    <ValidationMessage field="created_at" />
                            </div>

                            <FormMainAction
                                cancel="Cancel"
                                onCancel={() => navigate(`${paths.transaction}/DEPOSIT_PAYMENT_ACCEPTED/${payload.id}`)}
                                submit="Update"
                                onSubmit={submittransactionUpdate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
