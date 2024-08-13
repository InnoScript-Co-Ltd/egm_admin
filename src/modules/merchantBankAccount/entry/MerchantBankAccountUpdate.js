import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext"
import { Dropdown } from 'primereact/dropdown';
import { useCallback, useEffect, useState } from "react";
import { endpoints } from "../../../constants/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { bankTypes, tooltipOptions } from "../../../constants/config";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";
import { merchantBankAccountService } from "../merchantBankAccountService";
import { merchantBankAccountPayload } from "../merchantBankAccountPayload";
import { BreadCrumb } from "../../../shares/BreadCrumb";

export const MerchantBankAccountUpdate = () => {

    const [payload, setPayload] = useState(merchantBankAccountPayload.update);
    const [loading, setLoading] = useState(false);
    const [generalStatus, setGeneralStatus] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { merchantBankAccount } = useSelector(state => state.merchantBankAccount);

    const merchantBankAccountUpdate = async () => {
        setLoading(true);
        await merchantBankAccountService.update(dispatch, payload, params.id);
        setLoading(false);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await getRequest(`${endpoints.status}?type=general`);

        if (response.status === 200) {
            setGeneralStatus(response.data.general);
        }
        await merchantBankAccountService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if (merchantBankAccount) {
            setPayload(merchantBankAccount);
        }
    }, [merchantBankAccount]);

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title="Update Merchant Bank Account Information"
                    subTitle={"Merchant bank account is purpose for accpet payment from agent deposit amount"}
                >

                    <Loading loading={loading} />

                    <div className="grid">
                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="holder_name" className='input-label'> Holder Name </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="holder_name"
                                    name="holder_name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Holder Name"
                                    value={payload.holder_name ? payload.holder_name : ""}
                                    aria-describedby="holder-name-help"
                                    tooltip="Merchant Bank Account's Holder Name"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'holder_name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="holder_name" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="account_number" className='input-label'> Account Number </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="account_number"
                                    name="account_number"
                                    className="p-inputtext-sm"
                                    aria-describedby="account-number-help"
                                    placeholder="Enter Merchant Bank Account Number"
                                    value={payload.account_number ? payload.account_number : ""}
                                    tooltip="Merchant Bank Account Number"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'account_number', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="account_number" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="status" className='input-label text-black'> Bank Type </label>
                                <Dropdown
                                    className="p-inputtext-sm"
                                    id="bank_type"
                                    name="bank_type"
                                    options={bankTypes}
                                    placeholder="Select Merchant Bank Type"
                                    disabled={loading}
                                    value={payload.bank_type ? payload.bank_type : ""}
                                    onChange={(e) => payloadHandler(payload, e.value, 'bank_type', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"bank_type"} />
                            </div>
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="status" className='input-label text-black'> Status </label>
                                <Dropdown
                                    className="p-inputtext-sm"
                                    inputId="status"
                                    name="status"
                                    options={generalStatus}
                                    placeholder="Select Merchant Bank Account Status"
                                    disabled={loading}
                                    value={payload.status ? payload.status : ""}
                                    onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"status"} />
                            </div>
                        </div>

                        <FormMainAction
                            cancel="Cancel"
                            onCancel={() => navigate(paths.merchantBankAccount)}
                            submit="Update"
                            onSubmit={merchantBankAccountUpdate}
                            loading={loading}
                        />


                    </div>
                </Card>
            </div>
        </div>
    )
}