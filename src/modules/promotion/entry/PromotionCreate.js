import defaultImage from "../../../assets/images/defaultImage.png";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Messages } from "primereact/messages";
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
import { promotionPayload } from "../promotionPayload";
import { promotionService } from "../promotionService";

export const PromotionCreate = () => {
    const [payload, setPayload] = useState(promotionPayload.create);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(defaultImage); // Initialize with default image
    const msgs = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);

            payloadHandler(payload, file, "image", (updatedPayload) => {
                setPayload(updatedPayload);
            });
        } else {
            setPreview(defaultImage);
        }
    };

    const promotionCreateRequest = async () => {
        setLoading(true);
        const response = await promotionService.store(payload, dispatch);
        if (response.status === 200) {
            navigate(paths.promotion);
        }
        setLoading(false);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card title={"Create Promotion"}>
                    <Loading loading={loading} />

                    <div className="grid">
                        <div className="col-12 md:col-12 lg:col-12 py-3">
                            <Messages ref={msgs} />
                        </div>

                        <div className="col-12 md:col-12 lg:col-12 py-3 text-center">
                                <img
                                    src={preview}
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
                            <label htmlFor="name" className="input-label">
                                {"Title"} <span>(required*)</span>
                            </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="title"
                                    name="title"
                                    className="p-inputtext-sm"
                                    placeholder="Enter your title"
                                    value={payload.title}
                                    aria-describedby="title-help"
                                    tooltip="Title"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value.toLocaleLowerCase(),
                                            "title",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                />
                            </div>
                            <ValidationMessage field="title" />
                        </div>

                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <label htmlFor="image" className="input-label">
                                {"Image"} <span>(required*)</span>
                            </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    type="file"
                                    id="image"
                                    name="image"
                                    className="p-inputtext-sm"
                                    accept="image/*"
                                    disabled={loading}
                                    onChange={handleImageChange}
                                />
                            </div>

                            <ValidationMessage field="image" />
                        </div>

                        <div className="col-12 md:col-6 lg:col-6 py-3">
    <label htmlFor="description" className="input-label">
        Description <span>(required*)</span>
    </label>
    <div className="p-inputgroup mt-2">
        <InputTextarea
            id="description"
            name="description"
            className="p-inputtext-sm"
            aria-describedby="description-help"
            placeholder="Enter description"
            value={payload.description}
            disabled={loading}
            onChange={(e) =>
                payloadHandler(
                    payload,
                    e.target.value,
                    "description",
                    (updateValue) => {
                        setPayload(updateValue);
                    }
                )
            }
            autoResize
        />
    </div>
    <ValidationMessage field="description" />
</div>

                        <FormMainAction
                            cancel="Cancel"
                            onCancel={() => navigate(paths.promotion)}
                            submit="Create"
                            onSubmit={promotionCreateRequest}
                            loading={loading}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
};
