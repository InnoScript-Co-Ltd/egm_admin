import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext"
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
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
import { AgentKYCUpdate } from "./AgentKYCUpdate";

export const AgentUpdate = () => {

    const [payload, setPayload] = useState(agentPayload.update);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const agentStatus = useRef([]);
    const kycStatus = useRef([]);

    const icon = (<i className="pi pi-search"></i>)

    const { agent } = useSelector(state => state.agent);

    const agentAccountUpdate = async () => {
        setLoading(true);
        await agentServices.update(dispatch, payload, params.id);
        setLoading(false);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const resultAgentStatus = await getRequest(`${endpoints.status}?type=agent`);

        if (resultAgentStatus.status === 200) {
            agentStatus.current = resultAgentStatus.data.agent;
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
            const updatePayload = { ...agent };
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
                    title="Update Agent Account Information"
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
                                    tooltip="Agent Frist Name"
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
                                    tooltip="Agent Last Name"
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
                            <label htmlFor="username" className='input-label'> Username </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="username"
                                    name="username"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Username"
                                    value={payload.username ? payload.username : ""}
                                    aria-describedby="username-help"
                                    tooltip="Agent Username"
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
                            <label htmlFor="email" className='input-label'> Email </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="email"
                                    name="email"
                                    className="p-inputtext-sm"
                                    placeholder="Enter email address"
                                    value={payload.email ? payload.email : ""}
                                    aria-describedby="email-help"
                                    tooltip="Agent email address"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="email" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="address" className='input-label'> Address </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="address"
                                    name="address"
                                    className="p-inputtext-sm"
                                    aria-describedby="address-help"
                                    placeholder="Enter address"
                                    value={payload.address ? payload.address : ""}
                                    tooltip="Agent address"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'address', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="address" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label className='input-label'> Agent Type </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    className="p-inputtext-sm"
                                    value={payload.agent_type ?? ""}
                                    tooltip={payload.agent_type ?? ""}
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={true}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label className='input-label'> Referral Type </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    className="p-inputtext-sm"
                                    value={payload.referral_type ?? ""}
                                    tooltip={payload.referral_type ?? ""}
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={true}
                                    readOnly={true}
                                />
                            </div>
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label className='input-label'> Commission Rate </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    className="p-inputtext-sm"
                                    value={payload.commission ?? ""}
                                    tooltip={payload.commission ?? ""}
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={true}
                                    readOnly={true}
                                />
                            </div>
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

            <AgentKYCUpdate />
        </div>
    )
}