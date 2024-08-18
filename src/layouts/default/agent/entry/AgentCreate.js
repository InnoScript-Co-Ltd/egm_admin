
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Loading } from "../../../shares/Loading";
import { Dropdown } from "primereact/dropdown";
import { formBuilder } from "../../../helpers/formBuilder";
import { FormMainAction } from "../../../shares/FormMainAction";
import { agentPayload } from "../agentPayload";
import { agentService } from "../agentService";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { ImageUpload } from "../../../shares/ImageUpload";
import moment from "moment";

export const AgentCreate = () => {

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img
                        alt={option.name}
                        src={`${endpoints.image}/${option.flag_image.image}`}
                        className={`mr-2 flag flag-${option.name.toLowerCase()}`}
                        style={{ width: '18px' }}
                    />
                    <div> {option.mobile_prefix} | {option.country_code} {option.name} </div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img
                    alt={option.name}
                    src={`${endpoints.image}/${option.flag_image.image}`}
                    className={`mr-2 flag flag-${option.name.toLowerCase()}`}
                    style={{ width: '18px' }}
                />
                <div> {option.mobile_prefix} | {option.country_code} {option.name} </div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <div className="py-2 px-3">
                {selectedCountry ? (
                    <span>
                        <b> {selectedCountry.mobile_prefix} | {selectedCountry.country_code}  {selectedCountry.name}   </b> selected.
                    </span>
                ) : (
                    'No country selected.'
                )}
            </div>
        );
    };

    const [payload, setPayload] = useState(agentPayload.create);
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [selectedRegionAndState, setSelectedRegionAndState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedTownship, setSelectedTownship] = useState(null);

    const [countries, setCountry] = useState([]);
    const [regionAndStates, setRegionAndState] = useState([]);
    const [cities, setCity] = useState([]);
    const [townships, setTwonships] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /** Loading Country List */
    const loadingCountryData = useCallback(async () => {
        setLoading(true);
        const result = await getRequest(`${endpoints.country}?status=ACTIVE`);

        if (result.status === 200) {
            setCountry(result.data);
        }

        setLoading(false);
    }, []);

    /** Loading Region Or State List Filter By Country ID */
    const loadingReginOrState = async (id) => {
        setLoading(true);
        const result = await getRequest(`${endpoints.region}/country/${id}`);
        if (result.status === 200) {
            setRegionAndState(result.data);
        }
        setLoading(false);
    }

    /** Loading City List Filter By Region Or State ID */
    const loadingCityList = async (id) => {
        setLoading(true);
        const result = await getRequest(`${endpoints.city}/region-or-state/${id}`);
        if (result.status === 200) {
            setCity(result.data);
        }
        setLoading(false);
    }

    /** Loading Townshop List Filter By City ID */
    const loadingTownshipList = async (id) => {
        setLoading(true);
        const result = await getRequest(`${endpoints.township}/city/${id}`);
        if (result.status === 200) {
            setTwonships(result.data);
        }
        setLoading(false);
    }

    /** Country Dropdown Handler */
    const countryDropdownHandler = (value) => {
        setSelectedCountry(value);

        setRegionAndState([]);
        setCity([]);
        setTwonships([]);

        const updatePayload = { ...payload };
        updatePayload.country_id = value.id;
        updatePayload.prefix = value.mobile_prefix;
        setPayload(updatePayload);
        loadingReginOrState(value.id);
    }

    /** Region Or State Dropdown Handler */
    const regionOrStateDropdownHandler = (value) => {
        setSelectedRegionAndState(value);

        setCity([]);
        setTwonships([]);

        const updatePayload = { ...payload };
        updatePayload.region_or_state_id = value.id;
        setPayload(updatePayload);
        loadingCityList(value.id);
    }

    /** City Dropdown Handler */
    const cityDropdownHandler = (value) => {
        setSelectedCity(value);

        setTwonships([]);

        const updatePayload = { ...payload };
        updatePayload.city_id = value.id;
        setPayload(updatePayload);
        loadingTownshipList(value.id);
    }

    /** Township Dropdown Handler */
    const townshipDropdownHandler = (value) => {
        setSelectedTownship(value);
        const updatePayload = {...payload};
        updatePayload.township_id = value.id;
        setPayload(updatePayload);
    }

    const submitCreateAgent = async () => {
        setLoading(true);

        const updatePayload = { ...payload };
        updatePayload.dob = moment(payload.dob).format("YY-MM-DD");

        const formData = formBuilder(updatePayload, agentPayload.create);
        const response = await agentService.store(formData, dispatch);
        if (response.data) {
            navigate(`${paths.admin}/${response.data.id}`);
        }
        setLoading(false);
    }

    useEffect(() => {
        loadingCountryData();
    }, [loadingCountryData]);

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title={"Agent Create"}
                    subTitle={"Create new agent account"}
                >

                    <Loading loading={loading} />

                    <div className="grid">
                        <div className='col-12 mb-3 flex align-items-center justify-content-center'>
                            <form className="w-full flex flex-column justify-content-center align-items-center">
                                <ImageUpload
                                    preview={payload.image ? payload.image.image : null}
                                    onSelect={(e) => payloadHandler(payload, e, 'profile', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={'profile'} />
                            </form>
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="first_name" className='input-label text-black'>{"First Name"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="first_name"
                                    name="first_name"
                                    autoComplete="First Name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter first name"
                                    value={payload.name}
                                    tooltip="Agent's first name"
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
                            <label htmlFor="last_name" className='input-label text-black'>{"Last Name"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="last_name"
                                    name="last_name"
                                    autoComplete="Last Name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter last name"
                                    value={payload.last_name}
                                    tooltip="Agent's last name"
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
                            <label htmlFor="prefix" className='input-label text-black'>{"Prefix Number"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                {countries && (
                                    <Dropdown
                                        value={selectedCountry}
                                        onChange={(e) => {
                                            countryDropdownHandler(e.value);
                                        }}
                                        options={countries}
                                        optionLabel="name"
                                        placeholder="Select a Country"
                                        valueTemplate={selectedCountryTemplate}
                                        itemTemplate={countryOptionTemplate}
                                        panelFooterTemplate={panelFooterTemplate}
                                        dropdownIcon={(opts) => {
                                            return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                                        }}
                                    />
                                )}
                            </div>
                            <ValidationMessage field="prefix" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="phone" className='input-label text-black'>{"Phone"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="phone"
                                    name="phone"
                                    autoComplete="phone"
                                    className="p-inputtext-sm"
                                    placeholder="Enter phone number"
                                    value={payload.phone}
                                    tooltip="Agent's phone number"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'phone', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="phone" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="email" className='input-label text-black'>{"Email"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="email"
                                    name="email"
                                    autoComplete="Email"
                                    className="p-inputtext-sm"
                                    placeholder="Enter email address"
                                    value={payload.email}
                                    tooltip="Agent's email address"
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
                            <label htmlFor="dob" className='input-label text-black'>{"Date Of Birth"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <Calendar
                                    name="dob"
                                    className="p-inputtext-sm md:mr-2 sm:w-full"
                                    placeholder="Select Birth of date"
                                    selectionMode={"single"}
                                    maxDate={new Date()}
                                    value={payload.dob}
                                    tooltip="Agent's dob date"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'dob', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="dob" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="nrc" className='input-label text-black'>{"NRC Number"} </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="nrc"
                                    name="nrc"
                                    autoComplete="nrc"
                                    className="p-inputtext-sm"
                                    placeholder="Enter nrc number"
                                    value={payload.nrc}
                                    tooltip="Agent's nrc number"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'nrc', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="passport" className='input-label text-black'>{"Passport Number"} </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="passport"
                                    name="passport"
                                    autoComplete="passport"
                                    className="p-inputtext-sm"
                                    placeholder="Enter passport number"
                                    value={payload.passport}
                                    tooltip="Agent's passport number"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'passport', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="nrc_front" className='input-label text-black'>{"NRC Front Photo"} </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    type="file"
                                    id="nrc_front"
                                    name="nrc_front"
                                    autoComplete="nrc_front"
                                    className="p-inputtext-sm"
                                    placeholder="Enter nrc front photo"
                                    tooltip="Agent's nrc_front photo"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], 'nrc_front', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc_front" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="nrc_back" className='input-label text-black'>{"NRC Back Photo"} </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    type="file"
                                    id="nrc_back"
                                    name="nrc_back"
                                    autoComplete="nrc_back"
                                    className="p-inputtext-sm"
                                    placeholder="Enter nrc back photo"
                                    tooltip="Agent's nrc_back photo"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], 'nrc_back', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="nrc_back" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="passport_front" className='input-label text-black'>{"Passport Front Photo"} </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    type="file"
                                    id="passport_front"
                                    name="passport_front"
                                    autoComplete="passport_front"
                                    className="p-inputtext-sm"
                                    placeholder="Enter passport front photo"
                                    tooltip="Agent's passport front photo"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], 'passport_front', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport_front" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="passport_back" className='input-label text-black'>{"Passport Back Photo"} </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    type="file"
                                    id="passport_back"
                                    name="passport_back"
                                    autoComplete="passport_back"
                                    className="p-inputtext-sm"
                                    placeholder="Enter passport back photo"
                                    tooltip="Agent's passport back photo"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.files[0], 'passport_back', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="passport_back" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="region_and_state" className='input-label text-black'>{"Region & State"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                {regionAndStates && (
                                    <Dropdown
                                        value={selectedRegionAndState}
                                        onChange={(e) => regionOrStateDropdownHandler(e.value)}
                                        options={regionAndStates}
                                        optionLabel="name"
                                        placeholder="Select a Region & State"
                                        dropdownIcon={(opts) => {
                                            return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                                        }}
                                    />
                                )}
                            </div>
                            <ValidationMessage field="region_or_state_id" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="city" className='input-label text-black'>{"City"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                {cities && (
                                    <Dropdown
                                        value={selectedCity}
                                        onChange={(e) => {cityDropdownHandler(e.value)}}
                                        options={cities}
                                        optionLabel="name"
                                        placeholder="Select a city"
                                        dropdownIcon={(opts) => {
                                            return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                                        }}
                                    />
                                )}
                            </div>
                            <ValidationMessage field="city_id" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="township" className='input-label text-black'>{"Township"} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                {townships && (
                                    <Dropdown
                                        value={selectedTownship}
                                        onChange={(e) => {townshipDropdownHandler(e.value)}}
                                        options={townships}
                                        optionLabel="name"
                                        placeholder="Select a township"
                                        dropdownIcon={(opts) => {
                                            return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> : <ChevronDownIcon {...opts.iconProps} />;
                                        }}
                                    />
                                )}
                            </div>
                            <ValidationMessage field="township_id" />
                        </div>

                        <div className="col-12 md:col-12 lg:col-12 py-3">
                            <label htmlFor="address" className='input-label text-black'>{"Address"} </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="address"
                                    name="address"
                                    autoComplete="address"
                                    className="p-inputtext-sm"
                                    placeholder="Enter agent address"
                                    value={payload.address}
                                    tooltip="Agent's address"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'address', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="address" />
                        </div>

                        <FormMainAction
                            cancel={"Cancel"}
                            onCancel={() => navigate(paths.agent)}
                            submit={"Create"}
                            onSubmit={submitCreateAgent}
                            loading={loading}
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}