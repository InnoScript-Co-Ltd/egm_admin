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
    const statusTypes = ["DEPOSIT_PENDING", "DEPOSIT_PAYMENT_ACCEPTED", "REJECT", "WITHDRAW_PENDING", "WITHDRAW_REQUEST_ACCEPTED", "WITHDRAW_REJECT"];

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
