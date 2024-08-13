
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
import { partnerPayload } from "../partnerPayload";
import { partnerService } from "../partnerService";

export const PartnerCreate = () => {

    const [payload, setPayload] = useState(partnerPayload.create);
    const [loading, setLoading] = useState(false);

    const msgs = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Create Partner Account
     */
    const partnerCreate = async () => {
        setLoading(true);
        const response = await partnerService.store(payload, dispatch);
        if (response.status === 200) {
            navigate(paths.partner);
        }
        setLoading(false);
    }

    const generatePassword = async () => {
        await msgs.current.clear();
        const result = await partnerService.generatePassword(dispatch);

        if (result.status === 200) {
            const updatePayload = { ...payload };
            updatePayload.password = result.data;
            setPayload(updatePayload);
            msgs.current.show({
                id: '1',
                sticky: true,
                severity: 'info',
                summary: 'Info',
                detail: `Partner password is genetated . ${result.data} Please copy to other place.`,
                closable: true
            }
            );
        }
    }

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title={"Create Partner Account"}
                    subTitle={"Partner account is need to upgrade FULL_KYC"}
                >

                    <Loading loading={loading} />

                    <div className="grid">
                        <div className="col-12 md:col-12 lg:col-12 py-3">
                            <Messages ref={msgs} />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="name" className='input-label text-black'>{"Username"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="username"
                                    name="username"
                                    className="p-inputtext-sm"
                                    placeholder="Enter partner username"
                                    value={payload.username}
                                    aria-describedby="username-help"
                                    tooltip="Partner username"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'username', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="username" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="email" className='input-label text-black'>{"First Name"} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="first_name"
                                    name="first_name"
                                    className="p-inputtext-sm"
                                    aria-describedby="first-name-help"
                                    placeholder="Enter first name"
                                    value={payload.first_name}
                                    tooltip="Partner's first name"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'first_name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="first_name" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="role" className='input-label text-black'>{"Last Name"} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="last_name"
                                    name="last_name"
                                    className="p-inputtext-sm"
                                    aria-describedby="last_name-help"
                                    placeholder="Enter last_name"
                                    value={payload.last_name}
                                    tooltip="Partner's last_name"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'last_name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="last_name" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="role" className='input-label text-black'> Password <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="p-inputtext-sm"
                                    aria-describedby="last_name-help"
                                    placeholder="Enter password"
                                    value={payload.password}
                                    tooltip="Partner's password"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'password', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <span className="p-inputgroup-addon generate-password-addon" onClick={generatePassword}>
                                    <small>  Genetate </small>
                                </span>
                            </div>
                            <ValidationMessage field="password" />
                        </div>

                        <FormMainAction
                            cancel="Cancel"
                            onCancel={() => navigate(paths.partner)}
                            submit="Create"
                            onSubmit={partnerCreate}
                            loading={loading}
                        />

                    </div>
                </Card>
            </div>
        </div>
    )
}