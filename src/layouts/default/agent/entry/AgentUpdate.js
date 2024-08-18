import { useCallback, useEffect, useRef, useState } from "react"
import { BreadCrumb } from "../../../shares/BreadCrumb"
import { useNavigate, useParams } from "react-router-dom";
import { agentService } from "../agentService";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { TabView, TabPanel } from 'primereact/tabview';
import { agentPayload } from "../agentPayload";
import { ImageUpload } from "../../../shares/ImageUpload";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { InputText } from "primereact/inputtext";
import { paginateOptions, tooltipOptions } from "../../../constants/config";
import { Dropdown } from "primereact/dropdown";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { Calendar } from "primereact/calendar";
import { FormMainAction } from "../../../shares/FormMainAction";
import { ChevronDownIcon } from 'primereact/icons/chevrondown';
import { ChevronRightIcon } from 'primereact/icons/chevronright';
import { paths } from "../../../constants/paths";
import { formBuilder } from "../../../helpers/formBuilder";
import { KYCUpload } from "../../../shares/KYCUpload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Status } from "../../../shares/Status";
import { NavigateId } from "../../../shares/NavigateId";
import moment from "moment";

export const AgentUpdate = () => {

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

    const params = useParams();
    const dispatch = useDispatch();

    const { agent } = useSelector(state => state.agent);
    const [payload, setPayload] = useState(agentPayload.update);
    const [bankAccountPayload, setBankAccoountPayload] = useState(agentPayload.bankAccountCreate)
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
    const columns = useRef(agentPayload.bankAccountColumns);

    const showColumns = useRef(
        columns.current.filter((col) => col.show === true)
    );

    /** Submit Update Agent */
    const submitUpdateAgent = async () => {
        setLoading(true);

        const updatePayload = { ...payload };
        updatePayload.dob = moment(payload.dob).format("YY-MM-DD");
        const formData = formBuilder(updatePayload, agentPayload.update);
        const response = await agentService.update(dispatch, formData, params.id);
        if (response.data) {
            navigate(`${paths.agent}/${response.data.id}`);
        }
        setLoading(false);
    }

    /** Submit Create Bank Account */
    const submitBankAccount = async () => {
        setLoading(true);
        const updatePayload = { ...bankAccountPayload };
        updatePayload.agent_id = params.id;
        await agentService.storeBankAccount(updatePayload, dispatch);
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
        const updatePayload = { ...payload };
        updatePayload.township_id = value.id;
        setPayload(updatePayload);
    }

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

    /** Loading Agent Data */
    const loadingAgentData = useCallback(async () => {
        await agentService.show(dispatch, params.id);
    }, [params.id, dispatch]);

    /** Loading Location Data [RegionOrState, City, Township] */
    const loadingLocationData = useCallback(async () => {
        if (agent) {
            loadingReginOrState(agent.country_id);
            loadingCityList(agent.region_or_state_id);
            loadingTownshipList(agent.city_id);
        }
    }, [agent]);

    useEffect(() => {
        loadingCountryData();
    }, [loadingCountryData]);

    useEffect(() => {
        loadingAgentData();
    }, [loadingAgentData]);

    useEffect(() => {
        loadingLocationData()
    }, [loadingLocationData]);

    useEffect(() => {
        if (agent) {

            const updatePayload = { ...agent };
            updatePayload.profile = null;
            updatePayload.nrc_front = null;
            updatePayload.nrc_back = null;

            setPayload(updatePayload);

            const country = countries.filter(value => value.id === agent.country_id)[0];
            setSelectedCountry(country);

            const regionOrState = regionAndStates.filter(value => value.id === agent.region_or_state_id)[0];
            setSelectedRegionAndState(regionOrState);

            const city = cities.filter(value => value.id === agent.city_id)[0];
            setSelectedCity(city);

            const township = townships.filter(value => value.id === agent.township_id)[0];
            setSelectedTownship(township)
        }
    }, [agent, countries, regionAndStates, cities, townships]);

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                {agent && (
                    <Card
                        title={`${agent.first_name} ${agent.last_name}`}
                        subTitle="Agent Detail Information"
                    >
                        <TabView>
                            <TabPanel header="Basic Information">
                                <div className="grid">
                                    <div className='col-12 mb-3 flex align-items-center justify-content-center'>
                                        <form className="w-full flex flex-column justify-content-center align-items-center">
                                            <ImageUpload
                                                preview={agent.profile ? agent.profile : null}
                                                onSelect={(e) => payloadHandler(payload, e, 'profile', (updateValue) => {
                                                    setPayload(updateValue);
                                                })}
                                            />
                                            <ValidationMessage field={'profile'} />
                                        </form>
                                    </div>

                                    <div className="col-12 md:col-3 lg:col-3 py-3">
                                        <label htmlFor="first_name" className='input-label text-black'>{"First Name"} </label>
                                        <div className="p-inputgroup mt-2">
                                            <InputText
                                                id="first_name"
                                                name="first_name"
                                                autoComplete="First Name"
                                                className="p-inputtext-sm"
                                                placeholder="Enter first name"
                                                value={payload.first_name}
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
                                        <label htmlFor="last_name" className='input-label text-black'>{"Last Name"} </label>
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
                                        <label htmlFor="prefix" className='input-label text-black'>{"Prefix Number"} </label>
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
                                        <label htmlFor="region_and_state" className='input-label text-black'>{"Region & State"} </label>
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

                                    <div className="col-12 md:col-3 lg:col-3 py-3">
                                        <label htmlFor="city" className='input-label text-black'>{"City"} </label>
                                        <div className="p-inputgroup mt-2">
                                            {cities && (
                                                <Dropdown
                                                    value={selectedCity}
                                                    onChange={(e) => { cityDropdownHandler(e.value) }}
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

                                    <div className="col-12 md:col-3 lg:col-3 py-3">
                                        <label htmlFor="township" className='input-label text-black'>{"Township"} </label>
                                        <div className="p-inputgroup mt-2">
                                            {townships && (
                                                <Dropdown
                                                    value={selectedTownship}
                                                    onChange={(e) => { townshipDropdownHandler(e.value) }}
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

                                    <div className="col-12 md:col-3 lg:col-3 py-3">
                                        <label htmlFor="phone" className='input-label text-black'>{"Phone"} </label>
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
                                        <label htmlFor="email" className='input-label text-black'>{"Email"} </label>
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
                                        <label htmlFor="dob" className='input-label text-black'>{"Date Of Birth"} </label>
                                        <div className="p-inputgroup mt-2">
                                            <Calendar
                                                name="dob"
                                                className="p-inputtext-sm md:mr-2 sm:w-full"
                                                placeholder="Select Birth of date"
                                                selectionMode={"single"}
                                                maxDate={new Date()}
                                                value={payload.dob ? moment(payload.dob).toDate() : new Date()}
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

                                    <div className="col-12 md:col-9 lg:col-9 py-3">
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
                                        submit={"Update"}
                                        onSubmit={submitUpdateAgent}
                                        loading={loading}
                                    />
                                </div>
                            </TabPanel>

                            <TabPanel header="KYC Information">
                                <KYCUpload
                                    preview_nrc_front={agent.nrc_front}
                                    preview_nrc_back={agent.nrc_back}
                                    onChange={(e) => {
                                        const updatePayload = { ...payload };
                                        updatePayload.nrc_back = e.nrc_back;
                                        updatePayload.nrc_front = e.nrc_front;
                                        setPayload(updatePayload);
                                    }}
                                    loading={loading}
                                />

                                <div className="grid">

                                    <div className="col-12 md:col-12 lg:col-12 py-3">
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
                                </div>

                                <FormMainAction
                                    cancel={"Cancel"}
                                    onCancel={() => navigate(paths.agent)}
                                    submit={"Update"}
                                    onSubmit={submitUpdateAgent}
                                    loading={loading}
                                />
                            </TabPanel>

                            <TabPanel header="Bank Account Information">
                                <div className="grid">
                                    <div className="col-12 py-3">
                                        <DataTable
                                            dataKey="id"
                                            size="normal"
                                            value={agent.bank_accounts}
                                            lazy={paginateOptions.lazy}
                                            loading={loading}
                                            emptyMessage="No agent bank accounts found."
                                            globalFilterFields={agentPayload.columns}
                                        >
                                            {showColumns.current.map((col, index) => {
                                                return (
                                                    <Column
                                                        key={`admin_col_index_${index}`}
                                                        style={{ minWidth: "250px" }}
                                                        field={col.field}
                                                        header={col.header}
                                                        sortable
                                                        body={(value) => {
                                                            switch (col.field) {
                                                                case "account_name":
                                                                    return (
                                                                        <NavigateId
                                                                            url={`${paths.agent}/${params.id}/bank-account/${value["id"]}`}
                                                                            value={value[col.field]}
                                                                        />
                                                                    );
                                                                case "status":
                                                                    return <Status status={value[col.field]} />;
                                                                default:
                                                                    return value[col.field];
                                                            }
                                                        }}
                                                    />
                                                );
                                            })}
                                        </DataTable>
                                    </div>

                                    <div className="col-12 md:col-4 lg:col-4 py-3">
                                        <label htmlFor="" className='input-label text-black'>Bank Account Holder Name </label>
                                        <div className="p-inputgroup mt-2">
                                            <InputText
                                                id="account_name"
                                                name="account_name"
                                                autoComplete="Account Name"
                                                className="p-inputtext-sm"
                                                placeholder="Enter account name"
                                                value={bankAccountPayload.account_name}
                                                tooltip="Agent's Account Name"
                                                tooltipOptions={{ ...tooltipOptions }}
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(bankAccountPayload, e.target.value, 'account_name', (updateValue) => {
                                                    setBankAccoountPayload(updateValue);
                                                })}
                                            />
                                        </div>
                                        <ValidationMessage field="account_name" />
                                    </div>

                                    <div className="col-12 md:col-4 lg:col-4 py-3">
                                        <label htmlFor="account_number" className='input-label text-black'> Account Number </label>
                                        <div className="p-inputgroup mt-2">
                                            <InputText
                                                id="account_number"
                                                name="account_number"
                                                autoComplete="Account Number"
                                                className="p-inputtext-sm"
                                                placeholder="Enter Account Number"
                                                value={bankAccountPayload.account_number}
                                                tooltip="Agent's Account Number"
                                                tooltipOptions={{ ...tooltipOptions }}
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(bankAccountPayload, e.target.value, 'account_number', (updateValue) => {
                                                    setBankAccoountPayload(updateValue);
                                                })}
                                            />
                                        </div>
                                        <ValidationMessage field="account_number" />
                                    </div>

                                    <div className="col-12 md:col-4 lg:col-4 py-3">
                                        <label htmlFor="branch" className='input-label text-black'>{"Branch"} </label>
                                        <div className="p-inputgroup mt-2">
                                            <InputText
                                                id="branch"
                                                name="branch"
                                                autoComplete="Branch"
                                                className="p-inputtext-sm"
                                                placeholder="Enter Branch"
                                                value={bankAccountPayload.branch}
                                                tooltip="Agent's Branch"
                                                tooltipOptions={{ ...tooltipOptions }}
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(bankAccountPayload, e.target.value, 'branch', (updateValue) => {
                                                    setBankAccoountPayload(updateValue);
                                                })}
                                            />
                                        </div>
                                        <ValidationMessage field="branch" />
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
                                                value={bankAccountPayload.address}
                                                tooltip="Agent's address"
                                                tooltipOptions={{ ...tooltipOptions }}
                                                disabled={loading}
                                                onChange={(e) => payloadHandler(bankAccountPayload, e.target.value, 'address', (updateValue) => {
                                                    setBankAccoountPayload(updateValue);
                                                })}
                                            />
                                        </div>
                                        <ValidationMessage field="address" />
                                    </div>

                                    <FormMainAction
                                        cancel={"Cancel"}
                                        onCancel={() => navigate(paths.agent)}
                                        submit={"Update"}
                                        onSubmit={submitBankAccount}
                                        loading={loading}
                                    />
                                </div>
                            </TabPanel>

                            <TabPanel header="Sub Agent">
                            </TabPanel>

                            <TabPanel header="Transcation">
                            </TabPanel>

                            <TabPanel header="Activities">
                            </TabPanel>

                            <TabPanel header="Security">
                            </TabPanel>
                        </TabView>
                    </Card>
                )}

            </div>
        </div>
    )
}