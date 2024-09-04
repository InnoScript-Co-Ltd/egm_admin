import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext"
import { Dropdown } from 'primereact/dropdown';
import { Messages } from 'primereact/messages';
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
import { emailContentPayload } from "../emailContentPayload";
import { emailContentServices } from "../emailContentServices";
import { TextEditor } from "../../../shares/TextEditor";

export const EmailContentUpdate = () => {

    const [payload, setPayload] = useState(emailContentPayload.update);
    const [loading, setLoading] = useState(false);
    const [selectCountry, setSelectedCountry] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const msgs = useRef(null);
    const contentType = useRef([]);
    const countries = useRef([]);
    const generalStatus = useRef([]);

    const { emailContent } = useSelector(state => state.emailContent);

    const emailContentUpdateRequest = async () => {
        setLoading(true);
        const updatePayload = {...payload};
        updatePayload.country_id = selectCountry.code;
        updatePayload.country_code = selectCountry.country_code;

        await emailContentServices.update(dispatch, updatePayload, params.id);
        setLoading(false);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const generalStatusResult = await getRequest(`${endpoints.status}?type=general`);

        if (generalStatusResult.status === 200) {
            generalStatus.current = generalStatusResult.data.general;
        }

        const contentTypeResult = await getRequest(`${endpoints.status}?type=emailContent`);

        if (contentTypeResult.status === 200) {
            contentType.current = contentTypeResult.data.emailContent;
        }

        const countryResult = await getRequest(`${endpoints.country}?filter=status&value=ACTIVE`);

        if (countryResult.status === 200) {
            countries.current = countryResult.data.map((value) => {
                return {
                    name: value.name, country_code: value.country_code, code: value.id
                }
            });
        }

        await emailContentServices.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if (emailContent) {
            const countryFilter = countries.current.filter(e => e.code === emailContent.country_id)[0];
            setSelectedCountry(countryFilter);
            setPayload(emailContent);
        }
    }, [emailContent]);

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            {emailContent && (
                <div className="col-12">
                    <Card
                        title={"Update Email Content"}
                        subTitle={"This email content is purpose for command email content"}
                    >

                        <Loading loading={loading} />

                        <div className="grid">
                            <div className="col-12 md:col-12 lg:col-12 py-3">
                                <Messages ref={msgs} />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <label htmlFor="name" className='input-label'>{"Title"} </label>
                                <div className="p-inputgroup mt-2">
                                    <InputText
                                        id="title"
                                        name="title"
                                        className="p-inputtext-sm"
                                        placeholder="Enter email content title"
                                        value={payload.title ?? ""}
                                        aria-describedby="title-help"
                                        tooltip="Email content title"
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'title', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="title" />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <label htmlFor="email" className='input-label'>{"Template"} </label>
                                <div className="p-inputgroup mt-2">
                                    <InputText
                                        id="template"
                                        name="template"
                                        className="p-inputtext-sm"
                                        aria-describedby="template-help"
                                        placeholder="Enter email content template"
                                        value={payload.template ?? payload.template}
                                        tooltip="Email content template name"
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'template', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                </div>
                                <ValidationMessage field="template" />
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="email_content_type" className='input-label text-black'> Email Content Type </label>
                                    <Dropdown
                                        className="p-inputtext-sm"
                                        id="email_content_type"
                                        name="email_content_type"
                                        options={contentType.current}
                                        placeholder="Select email content type"
                                        disabled={loading}
                                        value={payload.content_type ? payload.content_type : ""}
                                        onChange={(e) => payloadHandler(payload, e.value, 'content_type', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"content_type"} />
                                </div>
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="country" className='input-label text-black'> Country </label>
                                    <Dropdown
                                        className="p-inputtext-sm"
                                        id="country"
                                        name="country"
                                        options={countries.current}
                                        placeholder="Select country"
                                        disabled={loading}
                                        value={selectCountry}
                                        optionLabel="name"
                                        onChange={(e) => payloadHandler(payload, e.value.code, 'country_id', (updatePayload) => {
                                            setSelectedCountry(e.value);
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field={"country_id"} />
                                </div>
                            </div>

                            <div className="col-12 md:col-3 lg:col-3 py-3">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="status" className='input-label text-black'> Status </label>
                                    <Dropdown
                                        className="p-inputtext-sm"
                                        id="status"
                                        name="status"
                                        options={generalStatus.current}
                                        placeholder="Select Status"
                                        disabled={loading}
                                        value={payload.status ?? ""}
                                        onChange={(e) => payloadHandler(payload, e.value, 'status', (updatePayload) => {
                                            setPayload(updatePayload);
                                        })}
                                    />
                                    <ValidationMessage field={"status"} />
                                </div>
                            </div>

                            <div className="col-12 md:col-12 lg:col-12 py-3">
                                <label htmlFor="role" className='input-label'>{"Email Content"} </label>
                                <div className="p-inputgroup mt-2">
                                    <TextEditor
                                        value={payload ?? ""}
                                        onChange={(e) => {
                                            // payloadHandler(payload, e, 'content', (updatePayload) => {
                                            //     console.log(payload);
                                            //     setPayload(updatePayload);
                                            // });
                                        }}
                                    />
                                </div>
                                <ValidationMessage field="content" />
                            </div>

                            <FormMainAction
                                cancel="Cancel"
                                onCancel={() => navigate(paths.emailContent)}
                                submit="Update"
                                onSubmit={emailContentUpdateRequest}
                                loading={loading}
                            />

                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}