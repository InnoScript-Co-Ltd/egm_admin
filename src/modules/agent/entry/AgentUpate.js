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
import { Image } from "primereact/image";
import { agentPayload } from "../agentPayload";
import { agentServices } from "../agentServices";
import moment from "moment";

export const AgentUpdate = () => {

    const [payload, setPayload] = useState(agentPayload.update);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const partnerStatus = useRef();
    const kycStatus = useRef();

    const icon = (<i className="pi pi-search"></i>)

    const { agent } = useSelector(state => state.agent);

    const agentAccountUpdate = async () => {
        setLoading(true);
        await agentServices.update(dispatch, payload, params.id);
        setLoading(false);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const resultPartner = await getRequest(`${endpoints.status}?type=partner`);

        if (resultPartner.status === 200) {
            partnerStatus.current = resultPartner.data.partner;
        }

        const resultKyc = await getRequest(`${endpoints.status}?type=kyc`);

        if (resultKyc.status === 200) {
            kycStatus.current = resultKyc.data.kyc;
        }

        await agentServices.show(dispatch, params.type, params.id);
        setLoading(false);
    }, [dispatch, params]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if (agent) {
            const updatePayload = {...agent};
            updatePayload.dob = moment(agent.dob).toDate();
            setPayload(updatePayload);
        }
    }, [agent]);

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title="Update Partner Account Information"
                >
                    <Loading loading={loading} />

                    <div className="grid">
                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="first_name" className='input-label'> First Name </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="first_name"
                                    name="first_name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter First Name"
                                    value={payload.first_name ? payload.first_name : ""}
                                    aria-describedby="first_name-help"
                                    tooltip="Partner Frist Name"
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
                            <label htmlFor="last_name" className='input-label'> Last Name </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="last_name"
                                    name="last_name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Last Name"
                                    value={payload.last_name ? payload.last_name : ""}
                                    aria-describedby="last_name-help"
                                    tooltip="Partner Last Name"
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
                            <label htmlFor="username" className='input-label'> username </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="username"
                                    name="username"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Username"
                                    value={payload.username ? payload.username : ""}
                                    aria-describedby="username-help"
                                    tooltip="Partner Username"
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
                            <label htmlFor="dob" className='input-label'> dob </label>
                            <div className="p-inputgroup mt-2">
                                <Calendar
                                    className="p-inputtext-sm"
                                    placeholder="Enter DOB"
                                    value={payload.dob ? payload.dob : new Date()}
                                    tooltip="Partner Birthday"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'dob', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    dateFormat="dd/mm/yy"
                                />
                            </div>
                            <ValidationMessage field="dob" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="username" className='input-label'> Phone </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="phone"
                                    name="phone"
                                    className="p-inputtext-sm"
                                    placeholder="Enter phone number"
                                    value={payload.phone ? payload.phone : ""}
                                    aria-describedby="phone-help"
                                    tooltip="Partner phone"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'phone', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="phone" />
                        </div>


                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="email" className='input-label'> email </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="email"
                                    name="email"
                                    className="p-inputtext-sm"
                                    placeholder="Enter email address"
                                    value={payload.email ? payload.email : ""}
                                    aria-describedby="email-help"
                                    tooltip="Partner email address"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="email" />
                        </div>


                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="dob" className='input-label'> nrc </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="nrc"
                                    name="nrc"
                                    className="p-inputtext-sm"
                                    aria-describedby="nrc-help"
                                    placeholder="Enter nrc number"
                                    value={payload.nrc ? payload.nrc : ""}
                                    tooltip="Partner Birthday"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'nrc', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc" />
                        </div>

                        <div className="col-12 md:col-12 lg:col-12 py-3">
                            <label htmlFor="address" className='input-label'> address </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="address"
                                    name="address"
                                    className="p-inputtext-sm"
                                    aria-describedby="address-help"
                                    placeholder="Enteraddress"
                                    value={payload.address ? payload.address : ""}
                                    tooltip="Partner address"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'address', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="address" />
                        </div>

                        <div className="col-12 md:col-6 lg:col-6 py-3">
                            <label className='text-black'> NRC Front Preview </label>
                            <Image 
                                className="my-3"
                                src={payload.nrc_front ? `${endpoints.image}/${payload.nrc_front}` : "https://primefaces.org/cdn/primereact/images/galleria/galleria12.jpg"}
                                preview={true}
                                indicatorIcon={icon}
                                width="100%"
                            />
                        </div>

                        <div className="col-12 md:col-6 lg:col-6 py-3">
                            <label className='text-black'> NRC Back Preview </label>
                            <Image 
                                className="my-3"
                                src={payload.nrc_back ? `${endpoints.image}/${payload.nrc_back}` : "https://primefaces.org/cdn/primereact/images/galleria/galleria12.jpg"}
                                preview={true}
                                indicatorIcon={icon}
                                width="100%"
                            />
                        </div>

                        <FormMainAction
                            cancel="Cancel"
                            onCancel={() => navigate(`${paths.agent}/${params.type}`)}
                            submit="Update"
                            onSubmit={agentAccountUpdate}
                            loading={loading}
                        />

                    </div>
                </Card>
            </div>
        </div>
    )
}