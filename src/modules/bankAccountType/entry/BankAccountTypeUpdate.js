import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext"
import { Calendar } from 'primereact/calendar';
import { useCallback, useEffect, useRef, useState } from "react";
import { endpoints } from "../../../constants/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { tooltipOptions } from "../../../constants/config";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { bankAccountTypePayload } from "../bankAccountTypePayload";
import { bankAccountTypeService } from "../bankAccountTypeService";
import { Image } from "primereact/image";

export const BankAccountTypeUpdate = () => {

    const [payload, setPayload] = useState(bankAccountTypePayload.update);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null); 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const partnerStatus = useRef();

    const icon = (<i className="pi pi-search"></i>)

    const { bankAccountType } = useSelector(state => state.bankAccountType);

    const bankAccountTypeUpdate = async () => {
        setLoading(true);
        await bankAccountTypeService.update(dispatch, payload, params.id);
        setLoading(false);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const resultPartner = await getRequest(`${endpoints.status}?type=bankAccountType`);

        if (resultPartner.status === 200) {
            partnerStatus.current = resultPartner.data.partner;
        }

        await bankAccountTypeService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if (bankAccountType) {
            const updatePayload = {...bankAccountType};
            setPayload(updatePayload);
        }
    }, [bankAccountType]);

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title="Update Bank Account Type Information"
                >
                    <Loading loading={loading} />

                    <div className="grid">
                    <div className="col-12 md:col-12 lg:col-12 py-3">
    <label htmlFor="logo" className="input-label">
        Bank Logo <span>(required*)</span>
    </label>
    <div className="p-inputgroup mt-2">
        <input
            type="file"
            id="logo"
            name="logo"
            className="p-inputtext-sm"
            accept="image/*"
            disabled={loading}
            onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                // Update preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);

                // Update payload
                setPayload((prevPayload) => ({
                    ...prevPayload,
                    logo: file,
                }));
            }}
        />
    </div>

    {preview && (
        <div className="mt-2 text-center">
            <img
                src={preview}
                alt="Bank Logo Preview"
                style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ccc",
                }}
            />
        </div>
    )}

    <ValidationMessage field="logo" />
</div>


                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="bank_name" className='input-label'> Bank Name </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="bank_name"
                                    name="bank_name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Your Bank Name"
                                    value={payload.bank_name ? payload.bank_name : ""}
                                    aria-describedby="bank_name-help"
                                    tooltip="BankAccountType Bank Name"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'bank_name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="bank_name" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="bank_type" className='input-label'> Bank Type </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="bank_type"
                                    name="bank_type"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Your Bank Type"
                                    value={payload.bank_type ? payload.bank_type : ""}
                                    aria-describedby="bank_type-help"
                                    tooltip="BankAccountType Bank Type"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'bank_type', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="bank_type" />
                        </div>

                        <FormMainAction
                            cancel="Cancel"
                            onCancel={() => navigate(paths.bankAccountType)}
                            submit="Update"
                            onSubmit={bankAccountTypeUpdate}
                            loading={loading}
                        />

                    </div>
                </Card>
            </div>
        </div>
    )
}