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
import { depositService } from "../depositService";
import { paths } from "../../../constants/paths";
import numeral from "numeral";
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column";

export const DepositDetail = () => {

const [repaymentData, setRepaymentData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const { deposit } = useSelector(state => state.deposit);

    const params = useParams();
    console.log(params,"p")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const depositStatus = useRef(params.type.toUpperCase());
    const depositId = useRef(params.id);

    /** Deposit deposit Payment Accepted */
    const paymentTranscationHandler = async () => {
        setLoading(true);
        setOpenConfirmDialog(!openConfirmDialog);
        const result = await depositService.makePayment(dispatch, depositId.current);

        if(result.status === 200) {
            const backward = deposit.sender_type === 'MAIN_AGENT' || deposit.sender_type === "SUB_AGENT" ? `${paths.deposit}/agent/DEPOSIT_PENDING` : `${paths.deposit}/partner/DEPOSIT_PENDING`;
            navigate(backward);
        }
        setLoading(false);
    }

    const fetchRepaymentData = useCallback(async () => {
        setLoading(true);
        const result = await depositService.getRepayment(dispatch, params.id);
        if (result.status === 200) {
            setRepaymentData(result.data);
        }
        setLoading(false);
    }, [dispatch, params.id]);
    useEffect(() => {
        fetchRepaymentData();
    }, [fetchRepaymentData]);

    /** Depoist deposit Reject */
    const paymentRejectHandler = async () => {
        setLoading(true);
        const result = await depositService.makeReject(dispatch, deposit.current);

        if(result.status === 200) {
            const backward = deposit.sender_type === 'MAIN_AGENT' || deposit.sender_type === "SUB_AGENT" ? `${paths.deposit}/agent/DEPOSIT_PENDING` : `${paths.deposit}/partner/DEPOSIT_PENDING`;
            navigate(backward);
        }
        
        setLoading(false);
    }

    const initLoading = useCallback(async () => {
        setLoading(true);
        await depositService.show(dispatch, params.id);
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
                {!loading && deposit && (
                    <Card
                        title={<CardTitleView />}
                    >
                        <div className="grid">
                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Agent Bank Account Information </h4>
                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Holder Name </small>
                                    <small> {deposit.sender_account_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> NRC Number </small>
                                    <small> {deposit.sender_nrc} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Email </small>
                                    <small> {deposit.sender_email} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Phone </small>
                                    <small> {deposit.sender_phone} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Number</small>
                                    <small> {deposit.sender_account_number} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Type </small>
                                    <small> {deposit.bank_type} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Branch </small>
                                    <small> {deposit.sender_bank_branch} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Branch Address </small>
                                    <small> {deposit.sender_bank_address} </small>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Merchant Bank Account Information </h4>
                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Holder Name </small>
                                    <small> {deposit.merchant_account_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Number</small>
                                    <small> {deposit.merchant_account_number} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Type </small>
                                    <small> {deposit.bank_type} </small>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Package Information </h4>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Package </small>
                                    <small> {deposit.package_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Duration </small>
                                    <small> {deposit.package_duration} Months </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> ROI Rate </small>
                                    <small> {deposit.roi_amount} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2 mb-3">
                                    <small> Deposit Amount </small>
                                    <small> <b> {numeral(deposit.deposit_amount).format('0,0')} Kyats </b> </small>
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

            {!loading && deposit && (
                <Dialog
                    header="Transcation Screenshoot"
                    visible={openDialog}
                    style={{ width: '50vw' }}
                    onHide={() => { if (!openDialog) return; setOpenDialog(false); }}
                >
                    <p className="m-0">
                        <Image
                            width="100%"
                            src={`${endpoints.image}/${deposit.deposit_screenshoot}`}
                        />
                    </p>
                </Dialog>
            )}

            {!loading && openConfirmDialog && (
                <Dialog
                    header="Apporve Deposit deposit"
                    visible={openConfirmDialog}
                    style={{ width: '50vw' }}
                    onHide={() => { if (!openConfirmDialog) return; setOpenConfirmDialog(false); }}
                >
                    <p className="mb-3">
                        Are you sure to approve this deposit payment deposit?
                    </p>

                    <div className="flex flex-row justify-content-end align-items-center mt-3">
                        <Button className="ml-3" size="small" severity="success" onClick={() => paymentTranscationHandler()}> Approve </Button>
                        <Button className="ml-3" size="small" severity="danger" onClick={() => setOpenConfirmDialog(!openConfirmDialog)}> Cancel </Button>
                    </div>
                </Dialog>
            )}
            <div className="col-12">
    <h4 className="py-3">Repayment History</h4>
    <DataTable value={repaymentData} rows={6}>
        <Column 
            header="No" 
            sortable
            body={(rowData, { rowIndex }) => rowIndex + 1} 
        />
        <Column 
                header="Date" 
                sortable
                body={(rowData) => (
                    <span 
                        style={{ cursor: "pointer", textDecoration: "underline" }} 
                        onClick={() => navigate(`${paths.repayment}/${rowData.id}`)}
                    >
                        {rowData.date.split("T")[0]}
                    </span>
                )}
            />
        <Column 
            field="amount" 
            header="Amount" 
            sortable
            body={(rowData) => numeral(rowData.amount).format("0,0")}
        />
        <Column 
            field="oneday_amount" 
            header="Oneday Amount" 
            sortable
            body={(rowData) => numeral(rowData.oneday_amount).format("0,0")}
        />
        <Column 
            field="total_amount" 
            header="Total Amount" 
            sortable
            body={(rowData) => numeral(rowData.total_amount).format("0,0")}
        />
        <Column field="count_days" header="Count Day" sortable></Column>
        <Column field="total_days" header="Total Day" sortable></Column>
        <Column field="status" header="Status" sortable></Column>
    </DataTable>
</div>
        </div>
    )
}