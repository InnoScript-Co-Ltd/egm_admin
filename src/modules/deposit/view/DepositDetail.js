import { useParams } from "react-router-dom"
import { BreadCrumb } from "../../../shares/BreadCrumb"
import { useCallback, useEffect, useRef, useState } from "react";
import { depositService } from "../depositService";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from 'primereact/badge';
import numeral from "numeral";

export const DepositDetail = () => {

    const [loading, setLoading] = useState(false);

    const { deposit_transcation } = useSelector(state => state.deposit_transcation);

    const params = useParams();
    const dispatch = useDispatch();

    const depositStatus = useRef(params.type.toUpperCase());
    const transcationId = useRef(params.id);


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
                    <Badge value={depositStatus.current} severity={`${depositStatus.current === 'PENDING' ? "warning" : depositStatus.current === "REJECT" ? "danger" : "success"}`}></Badge>
                </div>


                <div className="flex flex-row justify-content-end align-items-center">
                    {depositStatus.current === "PENDING" && (
                        <div>
                            <Button size="small"> Make Payment Accept </Button>
                            <Button size="small" severity="danger" className="ml-3"> Reject </Button>
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
                {!loading && deposit_transcation && (
                    <Card
                        title={<CardTitleView />}
                    >
                        <div className="grid">
                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Agent Bank Account Information </h4>
                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Holder Name </small>
                                    <small> {deposit_transcation.agent_account_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> NRC Number </small>
                                    <small> {deposit_transcation.agent_nrc} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Email </small>
                                    <small> {deposit_transcation.agent_email} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Phone </small>
                                    <small> {deposit_transcation.agent_phone} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Number</small>
                                    <small> {deposit_transcation.agent_account_number} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Type </small>
                                    <small> {deposit_transcation.bank_type} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Branch </small>
                                    <small> {deposit_transcation.agent_bank_branch} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Branch Address </small>
                                    <small> {deposit_transcation.agent_bank_address} </small>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Merchant Bank Account Information </h4>
                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Holder Name </small>
                                    <small> {deposit_transcation.merchant_account_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Account Number</small>
                                    <small> {deposit_transcation.merchant_account_number} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Bank Type </small>
                                    <small> {deposit_transcation.bank_type} </small>
                                </div>
                            </div>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <h4 className="py-3"> Package Information </h4>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Package </small>
                                    <small> {deposit_transcation.package_name} </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> Duration </small>
                                    <small> {deposit_transcation.package_duration} Months </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2">
                                    <small> ROI Rate </small>
                                    <small> {deposit_transcation.package_roi_rate} % </small>
                                </div>

                                <div className="w-full flex flex-row align-items-center justify-content-between py-2 mb-3">
                                    <small> Deposit Amount </small>
                                    <small> <b> {numeral(deposit_transcation.package_deposit_amount).format('0,0')} Kyats </b> </small>
                                </div>

                                <Button
                                    size="small"
                                    className="w-full"
                                    severity="success"
                                    style={{ justifyContent: "center" }}
                                >
                                    View Transcation Screenshoot
                                </Button>

                            </div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    )
}