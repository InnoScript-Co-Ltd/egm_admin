
import { InputText } from "primereact/inputtext";
import { useEffect, useRef, useState } from "react";
import { tooltipOptions } from "../constants/config";
import { ValidationMessage } from "./ValidationMessage";
import { endpoints } from "../constants/endpoints";

export const KYCUpload = ({ preview_nrc_front, preview_nrc_back, loading, onChange}) => {

    const payload = useRef({
        nrc_back: "",
        nrc_front: ""
    })

    const [previewNRCFront, setPreviewNRCFront] = useState(null);
    const [previewNRCBack, setPreviewNRCBack] = useState(null);

    const uploadImagePayload = (file, type) => {
        const objectUrl = URL.createObjectURL(file);

        if(type === 'nrc_front') {
            setPreviewNRCFront(objectUrl);
            payload.current.nrc_front = file;
        }

        if(type === 'nrc_back') {
            setPreviewNRCBack(objectUrl);
            payload.current.nrc_back = file;
        }

        onChange(payload.current);
    }

    useEffect(() => {
        if(preview_nrc_back) {
            setPreviewNRCBack(`${endpoints.image}/${preview_nrc_back}`);
        }

        if(preview_nrc_front) {
            setPreviewNRCFront(`${endpoints.image}/${preview_nrc_front}`);
        }

    }, [preview_nrc_back, preview_nrc_front]);


    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                { previewNRCFront && (
                    <img className="w-full" src={previewNRCFront} alt="" title="" />
                )}
                
            </div>

            <div className="col-12 md:col-6">
                { previewNRCBack && (
                    <img className="w-full" src={previewNRCBack} alt="" title="" />
                )}
            </div>

            <div className="col-12 md:col-6 lg:col-6 py-3">
                <label htmlFor="first_name" className='input-label text-black'> NRC Front Photo </label>
                <div className="p-inputgroup mt-2">
                    <InputText
                        id="nrc_front"
                        name="nrc_front"
                        type="file"
                        autoComplete="NRC Front Photo"
                        className="p-inputtext-sm"
                        placeholder="upload nrc front photo"
                        tooltip="Agent's nrc front photo"
                        tooltipOptions={{ ...tooltipOptions }}
                        disabled={loading}
                        onChange={(e) => {
                            uploadImagePayload(e.target.files[0], "nrc_front")
                        }}
                    />
                </div>
                <ValidationMessage field="nrc_front" />
            </div>

            <div className="col-12 md:col-6 lg:col-6 py-3">
                <label htmlFor="nrc_back" className='input-label text-black'> NRC Back Photo </label>
                <div className="p-inputgroup mt-2">
                    <InputText
                        id="nrc_back"
                        name="nrc_back"
                        type="file"
                        autoComplete="NRC Back Photo"
                        className="p-inputtext-sm"
                        placeholder="upload nrc back photo"
                        tooltip="Agent's nrc back photo"
                        tooltipOptions={{ ...tooltipOptions }}
                        disabled={loading}
                        onChange={(e) => {
                            uploadImagePayload(e.target.files[0], "nrc_back")
                        }}
                    />
                </div>
                <ValidationMessage field="nrc_back" />
            </div>
        </div>
    )
}