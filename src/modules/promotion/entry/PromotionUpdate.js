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
import { promotionPayload } from "../promotionPayload";
import { promotionService } from "../promotionService";
import { InputTextarea } from "primereact/inputtextarea";


export const PromotionUpdate = () => {

    const [payload, setPayload] = useState(promotionPayload.update);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null); 

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const partnerStatus = useRef();

    const icon = (<i className="pi pi-search"></i>)

    const { promotion } = useSelector(state => state.promotion);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            payloadHandler(payload, file, "image", (updatedPayload) => {
                setPayload(updatedPayload);
            });
        }
    };

    const promotionUpdate = async () => {
        setLoading(true);
        const response = await promotionService.update(dispatch, payload, params.id);
        console.log(response)
        setLoading(false);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const resultPartner = await getRequest(`${endpoints.status}?type=promotion`);

        if (resultPartner.status === 200) {
            partnerStatus.current = resultPartner.data.partner;
        }

        await promotionService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if (promotion) {
            const updatePayload = {...promotion};
            setPayload(updatePayload);
        }
    }, [promotion]);

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card
                    title="Update Promotion Information"
                >
                    <Loading loading={loading} />

                    <div className="grid">

                    <div className="col-12 md:col-12 lg:col-12 py-3 text-center">
                                <img
                                    src={preview || `https://api.evanglobalmanagement.com/storage/images/${payload.image}`}
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                        border: "2px solid #ccc",
                                    }}
                                />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="title" className='input-label'> Bank Name </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="title"
                                    name="title"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Your Title"
                                    value={payload.title ? payload.title : ""}
                                    aria-describedby="title-help"
                                    tooltip="title"
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
                            <label htmlFor="logo" className="input-label">
                                {"Image"}
                            </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    type="file"
                                    id="logo"
                                    name="logo"
                                    className="p-inputtext-sm"
                                    accept="image/*"
                                    disabled={loading}
                                    onChange={handleImageChange}
                                />
                            </div>

                            <ValidationMessage field="logo" />
                        </div>

                        <div className="col-12 md:col-6 lg:col-6 py-3">
                            <label htmlFor="description" className='input-label'> Description </label>
                            <div className="p-inputgroup mt-2">
                                <InputTextarea
                                    id="description"
                                    name="description"
                                    className="p-inputtext-sm"
                                    placeholder="Enter Your Description"
                                    value={payload.description ? payload.description : ""}
                                    aria-describedby="description-help"
                                    tooltip="Description"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'description', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="description" />
                        </div>

                        <FormMainAction
                            cancel="Cancel"
                            onCancel={() => navigate(paths.promotion)}
                            submit="Update"
                            onSubmit={promotionUpdate}
                            loading={loading}
                        />

                    </div>
                </Card>
            </div>
        </div>
    )
}