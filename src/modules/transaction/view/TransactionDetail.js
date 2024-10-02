import { useNavigate, useParams } from "react-router-dom"
import { BreadCrumb } from "../../../shares/BreadCrumb"
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from 'primereact/badge';
import { Dialog } from 'primereact/dialog';
import { endpoints } from "../../../constants/endpoints";
import { Image } from "primereact/image";
import { transactionService } from "../transactionService";
import { paths } from "../../../constants/paths";
import numeral from "numeral";

export const TransactionDetail = () => {

    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const { transaction } = useSelector(state => state.transaction);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const depositStatus = useRef(params.type.toUpperCase());
    const transcationId = useRef(params.id);

    /** Deposit Transaction Payment Accepted */
    const paymentTranscationHandler = async () => {
        setLoading(true);
        setOpenConfirmDialog(!openConfirmDialog);
        const result = await transactionService.makePayment(dispatch, transcationId.current);

        if(result.status === 200) {
            const backward = transaction.sender_type === 'MAIN_AGENT' || transaction.sender_type === "SUB_AGENT" ? `${paths.transaction}/agent/DEPOSIT_PENDING` : `${paths.transaction}/partner/DEPOSIT_PENDING`;
            navigate(backward);
        }
        setLoading(false);
    }

    /** Depoist Transaction Reject */
    const paymentRejectHandler = async () => {
        setLoading(true);
        const result = await transactionService.makeReject(dispatch, transaction.current);

        if(result.status === 200) {
            const backward = transaction.sender_type === 'MAIN_AGENT' || transaction.sender_type === "SUB_AGENT" ? `${paths.transaction}/agent/DEPOSIT_PENDING` : `${paths.transaction}/partner/DEPOSIT_PENDING`;
            navigate(backward);
        }
        
        setLoading(false);
    }

    const initLoading = useCallback(async () => {
        setLoading(true);
        await transactionService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);


    const CardTitleView = () => {
        return (
            <div className="flex flex-row justify-content-between align-items-center">
                <div className="flex flex-column justify-content-center align-items-start">
                    <h3> Deposit Transcation Information </h3>
                    <Badge 
                        className="mt-3"
                        value={depositStatus.current} 
                        severity={`${depositStatus.current === 'DEPOSIT_PENDING' ? "warning" : depositStatus.current === "DEPOSIT_REJECT" ? "danger" : "success"}`}
                    ></Badge>
                </div>

                <div className="flex flex-row justify-content-end align-items-center">
                    {depositStatus.current === "DEPOSIT_PENDING" && (
                        <div>
                        <Button size="small" onClick={() => setOpenConfirmDialog(!openConfirmDialog)}> Make Payment Accept </Button>
                            <Button size="small" onClick={() => paymentRejectHandler()} severity="danger" className="ml-3"> Reject </Button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="grid">
            <div className=" col-12">
                <BreadCrumb />
            </div>

            <div className=" col-12">
                {!loading && transaction && (
                    <Card
                        title={<CardTitleView />}
                    >
                        <div className="grid">
                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Agent Bank Account Information </h4>
                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Holder Name </small>
                                    <small> {transaction.sender_account_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> NRC Number </small>
                                    <small> {transaction.sender_nrc} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Email </small>
                                    <small> {transaction.sender_email} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Phone </small>
                                    <small> {transaction.sender_phone} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Number</small>
                                    <small> {transaction.sender_account_number} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Type </small>
                                    <small> {transaction.bank_type} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Branch </small>
                                    <small> {transaction.sender_bank_branch} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Branch Address </small>
                                    <small> {transaction.sender_bank_address} </small>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Merchant Bank Account Information </h4>
                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Holder Name </small>
                                    <small> {transaction.merchant_account_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Number</small>
                                    <small> {transaction.merchant_account_number} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Type </small>
                                    <small> {transaction.bank_type} </small>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Package Information </h4>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Package </small>
                                    <small> {transaction.package_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Duration </small>
                                    <small> {transaction.package_duration} Months </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> ROI Rate </small>
                                    <small> {transaction.package_roi_rate} % </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2 mb-3">
                                    <small> Deposit Amount </small>
                                    <small> <b> {numeral(transaction.package_deposit_amount).format('0,0')} Kyats </b> </small>
                                </div>

                                <Button
                                    size="small"
                                    className="w-full"
                                    severity="success"
                                    style={{ justifyContent: "center" }}
                                    onClick={() => setOpenDialog(!openDialog)}
                                >
                                    View Transcation Screenshoot
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </div>

            {!loading && transaction && (
                <Dialog
                    header="Transcation Screenshoot"
                    visible={openDialog}
                    style={{ width: '50vw' }}
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

            {!loading && openConfirmDialog && (
                <Dialog
                    header="Apporve Deposit Transaction"
                    visible={openConfirmDialog}
                    style={{ width: '50vw' }}
                    onHide={() => { if (!openConfirmDialog) return; setOpenConfirmDialog(false); }}
                >
                    <p className="mb-3">
                        Are you sure to approve this deposit payment transaction?
                    </p>

                    <div className="flex flex-row justify-content-end align-items-center mt-3">
                        <Button className="ml-3" size="small" severity="success" onClick={() => paymentTranscationHandler()}> Approve </Button>
                        <Button className="ml-3" size="small" severity="danger" onClick={() => setOpenConfirmDialog(!openConfirmDialog)}> Cancel </Button>
                    </div>
                </Dialog>
            )}
        </div>
    )
}