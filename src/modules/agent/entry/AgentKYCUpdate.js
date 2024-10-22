import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext"
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from "primereact/button";
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
import { Image } from "primereact/image";
import { agentPayload } from "../agentPayload";
import { agentServices } from "../agentServices";
import moment from "moment";

export const AgentKYCUpdate = () => {

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

    useEffect(() => {
        if (agent) {
            const updatePayload = { ...agent };
            updatePayload.dob = moment(agent.dob).toDate();
            setPayload(updatePayload);
        }
    }, [agent]);

    const Header = () => {
        return (
            <div className="w-full flex flex-row align-item-start justify-content-between p-4">
                <div className="p-card-title"> KYC Information </div>
                <div className="">
                    <Button
                        className="mr-3"
                        label="REJECT"
                        loading={loading}
                    />

                    <Button
                        size="small"
                        label="FULL_KYC"
                        severity="success"
                        style={{ justifyContent: "center", backgroundColor: "#ec2929", background: "#ec2929" }}
                    />
                </div>
            </div>
        )
    }
    return (
        <div className="grid">
            <div className="col-12">
                <Card
                    header={Header}
                >
                    <div className="grid">
                        <div className="col-12 md:col-2 lg:col-2 py-3">
                            <label className='input-label'> NRC Front Preview </label>
                            <div className="p-inputgroup mt-2">
                                <Image
                                    className="my-3"
                                    src={payload.nrc_front ? `${endpoints.image}/${payload.nrc_front}` : "https://primefaces.org/cdn/primereact/images/galleria/galleria12.jpg"}
                                    preview={true}
                                    indicatorIcon={icon}
                                    width="100%"
                                    height="250px"
                                />
                            </div>
                        </div>

                        <div className="col-12 md:col-2 lg:col-2 py-3">
                            <label className='input-label'> NRC Back Preview </label>
                            <div className="p-inputgroup mt-2">
                                <Image
                                    className="my-3"
                                    src={payload.nrc_back ? `${endpoints.image}/${payload.nrc_back}` : "https://primefaces.org/cdn/primereact/images/galleria/galleria12.jpg"}
                                    preview={true}
                                    indicatorIcon={icon}
                                    width="100%"
                                    height="250px"
                                />
                            </div>
                        </div>

                        <div className="col-12 md:col-8 lg:col-8 py-3">
                            <div className="grid">
                                <div className="col-12 md:col-4 lg:col-4 py-3">
                                    <label htmlFor="dob" className='input-label'> DOB </label>
                                    <div className="p-inputgroup mt-2">
                                        <Calendar
                                            className="p-inputtext-sm"
                                            placeholder="Enter DOB"
                                            value={payload.dob ? payload.dob : new Date()}
                                            tooltip="Agent Birthday"
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
                                            tooltip="Agent phone"
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
                                    <label htmlFor="dob" className='input-label'> NRC </label>
                                    <div className="p-inputgroup mt-2">
                                        <InputText
                                            id="nrc"
                                            name="nrc"
                                            className="p-inputtext-sm"
                                            aria-describedby="nrc-help"
                                            placeholder="Enter nrc number"
                                            value={payload.nrc ? payload.nrc : ""}
                                            tooltip="Agent NRC"
                                            tooltipOptions={{ ...tooltipOptions }}
                                            disabled={loading}
                                            onChange={(e) => payloadHandler(payload, e.target.value, 'nrc', (updateValue) => {
                                                setPayload(updateValue);
                                            })}
                                        />
                                    </div>
                                    <ValidationMessage field="nrc" />
                                </div>

                                <FormMainAction
                                    cancel="Cancel"
                                    onCancel={() => navigate(`${paths.agent}/${params.type}`)}
                                    submit="Update"
                                    onSubmit={agentAccountUpdate}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}