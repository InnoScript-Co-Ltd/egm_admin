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
import { transactionPayload } from '../transactionPayload';
import { transactionService } from '../transactionService';
import { Calendar } from 'primereact/calendar';
import { endpoints } from '../../../constants/endpoints';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import moment from 'moment';

export const TransactionUpdate = () => {

    const { transaction } = useSelector(state => state.transaction);

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(transactionPayload.update);
    const [openDialog, setOpenDialog] = useState(false);

    const transactionTypes = ["DEPOSIT", "WITHDRAW"];
    const senderTypes = ["MAIN_AGENT", "SUB_AGENT", "PARTNER"];
    const statusTypes = ["DEPOSIT_PENDING", "DEPOSIT_PAYMENT_ACCEPTED", "REJECT", "WITHDRAW_PENDING", "WITHDRAW_REQUEST_ACCEPTED", "WITHDRAW_REJECT"]

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const submitTransactionUpdate = async () => {
        setLoading(true);
        await transactionService.update(dispatch, params.id, payload);
        setLoading(false);
    }

    const initLoading = useCallback(async () => {
        setLoading(true);
        await transactionService.show(dispatch, params.id);
        setLoading(false);
    },[params.id]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    useEffect(() => {
        if(transaction) {
            let updateTransaction = {...transaction };
            updateTransaction.created_at = updateTransaction.created_at ? moment(transaction.created_at).toDate() : "";
            updateTransaction.updated_at = updateTransaction.updated_at ? moment(transaction.updated_at).toDate() : "";
            updateTransaction.expired_at = updateTransaction.expired_at ? moment(transaction.expired_at).toDate() : "";
            setPayload(updateTransaction);
        }
    }, [transaction]);
  
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

            <div className='grid'>
                <div className='col-12'>
                    <BreadCrumb />
                </div>

                <div className='col-12'>
                    <Card
                        title="Transaction Edit"
                    >
                        <Loading loading={loading} />

                        <div className=' grid'>
                            <div className='col-12 md:col-12 lg:col-12 py-3'>
                                <div className='flex flex-row align-items-center justify-content-end'>
                                    <Button onClick={() => setOpenDialog(!openDialog)}> View Transaction Screenshoots </Button>
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_name" className='text-black'> Sender Name </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_name"
                                        name="sender_name"
                                        autoComplete='Sender Name'
                                        aria-describedby="sender-name-help"
                                        tooltip='Sender Name'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender Name'
                                        disabled={true}
                                        value={payload.sender_name}
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
                                    <ValidationMessage field={"sender_name"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_email" className='text-black'> Sender Email </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_email"
                                        name="sender_email"
                                        autoComplete='Sender Email'
                                        aria-describedby="sender-email-help"
                                        tooltip='Sender Email'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender Email'
                                        disabled={true}
                                        value={payload.sender_email}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_email', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"sender_email"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_phone" className='text-black'> Sender Phone </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_phone"
                                        name="sender_phone"
                                        autoComplete='Sender Phone'
                                        aria-describedby="sender-phone-help"
                                        tooltip='Sender Phone'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender Phone'
                                        disabled={true}
                                        value={payload.sender_email}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_phone', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"sender_phone"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_nrc" className='text-black'> Sender NRC </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_nrc"
                                        name="sender_nrc"
                                        autoComplete='Sender NRC'
                                        aria-describedby="sender-nrc-help"
                                        tooltip='Sender NRC'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender NRC'
                                        disabled={true}
                                        value={payload.sender_nrc}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_nrc', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"sender_nrc"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_address" className='text-black'> Sender Address </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_address"
                                        name="sender_address"
                                        autoComplete='Sender Address'
                                        aria-describedby="sender-address-help"
                                        tooltip='Sender Address'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender Address'
                                        disabled={true}
                                        value={payload.sender_address}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_address', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"sender_address"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_account_name" className='text-black'> Sender Account Name </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_account_name"
                                        name="sender_account_name"
                                        autoComplete='Sender Account Name'
                                        aria-describedby="sender-account-name-help"
                                        tooltip='Sender Account Name'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender Account Name'
                                        disabled={true}
                                        value={payload.sender_account_name}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_account_name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"sender_account_name"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_account_number" className='text-black'> Sender Account Number </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_account_number"
                                        name="sender_account_name"
                                        autoComplete='Sender Account Number'
                                        aria-describedby="sender-account-number-help"
                                        tooltip='Sender Account Number'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender Account Number'
                                        disabled={true}
                                        value={payload.sender_account_number}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sender_account_number', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"sender_account_number"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_bank_branch" className='text-black'> Sender Bank Branch </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_bank_branch"
                                        name="sender_bank_branch"
                                        autoComplete='Sender Bank Branch'
                                        aria-describedby="sender_bank_branch-help"
                                        tooltip='Sender Bank Branch'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender Bank Branch'
                                        disabled={true}
                                       value={payload.sender_bank_branch}
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
                                    <ValidationMessage field={"sender_bank_branch"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="sender_bank_address" className='text-black'> Sender Bank Address </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="sender_bank_address"
                                        name="sender_bank_address"
                                        autoComplete='Sender Bank Address'
                                        aria-describedby="sender_bank_address-help"
                                        tooltip='Sender Bank Address'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Sender Bank Address'
                                        disabled={true}
                                        value={payload.sender_bank_address}
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
                                    <ValidationMessage field={"sender_bank_address"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="merchant_account_name" className='text-black'> Merchant Account Name </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="merchant_account_name"
                                        name="merchant_account_name"
                                        autoComplete='Merchant Account Name'
                                        aria-describedby="merchant_account_name-help"
                                        tooltip='Merchant Account Name'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Merchant Account Name'
                                        disabled={true}
                                        value={payload.merchant_account_name}
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
                                    <ValidationMessage field={"merchant_account_name"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="merchant_account_number" className='text-black'> Merchant Account Number </label>
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
                                        autoComplete='Merchant Account Number'
                                        aria-describedby="merchant_account_number-help"
                                        tooltip='Merchant Account Number'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Merchant Account Number'
                                        disabled={true}
                                        value={payload.merchant_account_number}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'merchant_account_number', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"merchant_account_number"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="bank_type" className='text-black'> Bank Type </label>
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
                                        autoComplete='Bank Type'
                                        aria-describedby="bank_type-help"
                                        tooltip='Bank Type'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Bank Type'
                                        disabled={true}
                                        value={payload.bank_type}
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
                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_name" className='text-black'> Package Name </label>
                            <h1 className='col-12 flex justify-content-center align-items-center'>Package Information</h1>
                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_name" className=' text-black'>Package (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="package_name"
                                        name="package_name"
                                        autoComplete='Package Name'
                                        aria-describedby="package_name-help"
                                        tooltip='Package Name'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Package Name'
                                        disabled={true}
                                        value={payload.package_name}
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

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_roi_rate" className='text-black'> ROI Rate </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="package_roi_rate"
                                        name="package_roi_rate"
                                        autoComplete='ROI Rate'
                                        aria-describedby="package_roi_rate-help"
                                        tooltip='ROI Rate'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter ROI Rate'
                                        disabled={loading}
                                        value={payload.package_roi_rate}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'package_roi_rate', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"package_roi_rate"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_duration" className='text-black'> Package Duration </label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="package_duration"
                                        name="package_duration"
                                        autoComplete='Duration'
                                        aria-describedby="package_duration-help"
                                        tooltip='Duration'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Duration'
                                        disabled={loading}
                                        value={payload.package_duration}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'package_duration', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"package_duration"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="package_deposit_amount" className='text-black'> Deposit Amount </label>
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
                                        autoComplete='Deposit Amount'
                                        aria-describedby="package_deposit_amount-help"
                                        tooltip='Deposit Amount'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter Deposit Amount'
                                        disabled={loading}
                                        value={payload.package_deposit_amount}
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

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <label htmlFor="transaction_type" className='input-label'> Transaction Type </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='transaction_type'
                                        autoComplete='transaction_type'
                                        name='Transaction Type'
                                        value={payload.transaction_type}
                                        options={transactionTypes}
                                        placeholder="Select Transaction Type"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                        onChange={(e) => payloadHandler(payload, e.value, 'transaction_type', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="transaction_type" />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <label htmlFor="sender_type" className='input-label'> Sender Type </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='sender_type'
                                        autoComplete='sender_type'
                                        name='Sender Type'
                                        value={payload.sender_type}
                                        options={senderTypes}
                                        placeholder="Select Sender Type"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                        onChange={(e) => payloadHandler(payload, e.value, 'sender_type', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="sender_type" />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <label htmlFor="Deposit Date" className='input-label'> Deposit Date </label>
                                <div className="p-inputgroup mt-2">
                                    <Calendar
                                        className="p-inputtext-sm"
                                        placeholder="Enter Deposit Date"
                                        value={payload.created_at ? payload.created_at : new Date()}
                                        tooltip="Deposit Date"
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
                                        dateFormat="dd/mm/yy"
                                    />
                                </div>
                                <ValidationMessage field="created_at" />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <label htmlFor="Approved Date" className='input-label'> Approved Date </label>
                                <div className="p-inputgroup mt-2">
                                    <Calendar
                                        className="p-inputtext-sm"
                                        placeholder="Enter Approved Date"
                                        value={payload.created_at ? payload.updated_at : new Date()}
                                        tooltip="Approved Date"
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

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <label htmlFor="Expired Date" className='input-label'> Expired Date </label>
                                <div className="p-inputgroup mt-2">
                                    <Calendar
                                        className="p-inputtext-sm"
                                        placeholder="Enter Expired Date"
                                        value={payload.expired_at ? payload.expired_at : new Date()}
                                        tooltip="Expired Date"
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'expired_at', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        dateFormat="dd/mm/yy"
                                    />
                                </div>
                                <ValidationMessage field="expired_at" />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <label htmlFor="status" className='input-label'> Status </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='status'
                                        autoComplete='status'
                                        name='Status'
                                        value={payload.status}
                                        options={statusTypes}
                                        placeholder="Select Status"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                        onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="status" />
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="transaction_screenshoot" className='text-black'> Transaction Screenshoot </label>
                                    <InputText
                                        type="file"
                                        className="p-inputtext-sm text-black"
                                        id="transaction_screenshoot"
                                        name="transaction_screenshoot"
                                        autoComplete='Transaction Screenshoot'
                                        aria-describedby="transaction_screenshoot-help"
                                        tooltip='Transaction Screenshoot'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Transaction Screenshoot'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'transaction_screenshoot', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"transaction_screenshoot"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={"Cancel"}
                                onCancel={() => navigate(paths.transaction)}
                                submit={"Update"}
                                onSubmit={submitTransactionUpdate}
                                loading={loading}
                            />
                        </div>
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

            {!loading && transaction && (
                <Dialog
                    header="Transcation Screenshoot"
                    visible={openDialog}
                    style={{ width: '50vw'}}
                    onHide={() => { if (!openDialog) return; setOpenDialog(false); }}
                >
                    <p className="m-0">
                        <Image
                            width="100%"
                            src={`${endpoints.image}/${transaction.transaction_screenshoot}`}
                        />
                    </p>
                </Dialog>
            )}
        </>
    )
}
