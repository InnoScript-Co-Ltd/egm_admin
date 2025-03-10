
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Messages } from 'primereact/messages';
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";
import { bankAccountTypePayload } from "../bankAccountTypePayload";
import { bankAccountTypeService } from "../bankAccountTypeService";

export const BankAccountTypeCreate = () => {

    const [payload, setPayload] = useState(bankAccountTypePayload.create);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null); 
    const msgs = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const bankAccountTypeCreateRequest = async () => {
            setLoading(true);
            const response = await bankAccountTypeService.store(payload, dispatch);
            console.log(response,"data")
            if (response.status === 200) {
                navigate(paths.bankAccountType);
            }
            setLoading(false);
        }

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title={"Create Bank Account Type"}
                >

                    <Loading loading={loading} />

                    <div className="grid">

                        <div className="col-12 md:col-12 lg:col-12 py-3">
                            <Messages ref={msgs} />
                        </div>

                        <div className="col-12 md:col-12 lg:col-12 py-3">
    <label htmlFor="logo" className="input-label">
        {"Bank Logo"} <span>(required*)</span>
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

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const updatedPayload = {
                    ...payload,
                    logo: file, // Store actual file
                };
                setPayload(updatedPayload);
            };
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
                            <label htmlFor="name" className='input-label'>{"Bank Name"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="bank_name"
                                    name="bank_name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Your Bank Name"
                                    value={payload.bank_name}
                                    aria-describedby="bankname-help"
                                    tooltip="Bank Name"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value.toLocaleLowerCase(), 'bank_name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="bank_name" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="email" className='input-label'>{"Bank Type"} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="bank_type"
                                    name="bank_type"
                                    className="p-inputtext-sm"
                                    aria-describedby="bank-type-help"
                                    placeholder="Enter your bank type"
                                    value={payload.bank_type}
                                    tooltip="Bank Type"
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
                            submit="Create"
                            onSubmit={bankAccountTypeCreateRequest}
                            loading={loading}
                        />

                    </div>
                </Card>
            </div>
        </div>
    )
}