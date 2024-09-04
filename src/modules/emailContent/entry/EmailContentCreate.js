
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Messages } from 'primereact/messages';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";
import { emailContentPayload } from "../emailContentPayload";
import { emailContentServices } from "../emailContentServices";
import { Dropdown } from "primereact/dropdown";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { TextEditor } from "../../../shares/TextEditor";

export const EmailContentCreate = () => {

    const [payload, setPayload] = useState(emailContentPayload.create);
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const msgs = useRef(null);
    const contentType = useRef([]);
    const countries = useRef([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Create Email Content
     */
    const emailContentRequest = async () => {
        setLoading(true);

        const updatePayload = {...payload};
        updatePayload.country_code = selectedCountry.country_code;
        
        const response = await emailContentServices.store(updatePayload, dispatch);
        if (response.status === 200) {
            navigate(paths.emailContent);
        }
        setLoading(false);
    }

    /** Initialize Data Loading */
    const mount = useCallback( async () => {
        setLoading(true);
        const emailContentTypeResult = await getRequest(`${endpoints.status}?type=emailContent`);

        if (emailContentTypeResult.status === 200) {
            contentType.current = emailContentTypeResult.data.emailContent;
        }

        const countryResult = await getRequest(`${endpoints.country}?filter=status&value=ACTIVE`);
        if (countryResult.status === 200) {
            countries.current = countryResult.data.map((value) => {
                return {
                    name: value.name,
                    code: value.id,
                    country_code: value.county_code
                }
            });
        }
        setLoading(false);
    },[]);

    useEffect(() => {
        mount();
    },[mount]);
    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title={"Create Email Content"}
                    subTitle={"This email content is purpose for command email content"}
                >

                    <Loading loading={loading} />

                    <div className="grid">
                        <div className="col-12 md:col-12 lg:col-12 py-3">
                            <Messages ref={msgs} />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="name" className='input-label'>{"Title"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="title"
                                    name="title"
                                    className="p-inputtext-sm"
                                    placeholder="Enter email content title"
                                    value={payload.title}
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
                            <label htmlFor="email" className='input-label'>{"Template"} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="template"
                                    name="template"
                                    className="p-inputtext-sm"
                                    aria-describedby="template-help"
                                    placeholder="Enter email content template"
                                    value={payload.template}
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
                                <label htmlFor="email_content_type" className='input-label text-black'> Email Content Type  <span>(required*)</span> </label>
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
                                <label htmlFor="country" className='input-label text-black'> Country  <span>(required*)</span></label>
                                <Dropdown
                                    className="p-inputtext-sm"
                                    id="country"
                                    name="country"
                                    options={countries.current}
                                    placeholder="Select country"
                                    disabled={loading}
                                    value={selectedCountry}
                                    optionLabel="name"
                                    onChange={(e) => payloadHandler(payload, e.value.code, 'country_id', (updatePayload) => {
                                        setSelectedCountry(e.value);
                                        setPayload(updatePayload);
                                    })}
                                />
                                <ValidationMessage field={"country_id"} />
                            </div>
                        </div>

                        <div className="col-12 md:col-12 lg:col-12 py-3">
                            <label htmlFor="role" className='input-label'>{"Email Content"} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <TextEditor 
                                    onChange={(e) => {
                                        payloadHandler(payload, e, 'content', (updatePayload) => {
                                            setPayload(updatePayload);
                                        });
                                    }}
                                />
                            </div>
                            <ValidationMessage field="content" />
                        </div>

                        <FormMainAction
                            cancel="Cancel"
                            onCancel={() => navigate(paths.partner)}
                            submit="Create"
                            onSubmit={emailContentRequest}
                            loading={loading}
                        />

                    </div>
                </Card>
            </div>
        </div>
    )
}