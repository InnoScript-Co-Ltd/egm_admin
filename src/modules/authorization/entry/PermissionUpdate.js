import { useCallback, useEffect, useState } from "react"
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { useNavigate, useParams } from "react-router-dom";
import { permissionService } from "../permissionService";
import { useDispatch, useSelector } from "react-redux";
import { permissionPayload } from "../permissionPayload";
import { Card } from "primereact/card";
import { tooltipOptions } from '../../../constants/config';
import { Loading } from "../../../shares/Loading";
import { InputText } from "primereact/inputtext";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { FormMainAction } from "../../../shares/FormMainAction";
import { paths } from "../../../constants/paths";

export const PermissionUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(permissionPayload.update);

    const { permission } = useSelector((state) => state.permission);

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /** Loading permission list data */
    const loadingPermissionData = useCallback(async () => {
        setLoading(true);
        await permissionService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    /** Submit Permission Update Handler */
    const submitUpdatePermission = async () => {
        setLoading(true);
        const result = await permissionService.update(dispatch, params.id, payload);
        if(result.status === 200) {
            navigate(paths.permission);
        }  
        setLoading(false);  
    }

    useEffect(() => {
        loadingPermissionData();
    }, [loadingPermissionData]);

    useEffect(() => {
        if (permission) {
            setPayload(permission);
        }
    }, [permission])

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <Loading loading={loading} />

            {permission && (
                <div className="col-12 mt-3">
                    <Card
                        title="Update Permission"
                        subTitle={permission.name}
                    >

                        <div className=' grid'>
                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="name" className='input-label'> Permission Name </label>
                                <div className="p-inputgroup mt-2">
                                    <InputText
                                        id="name"
                                        className="p-inputtext-sm"
                                        placeholder="Enter permission name"
                                        value={payload?.name ? payload?.name : ''}
                                        aria-describedby="name-help"
                                        tooltip="Permission name"
                                        tooltipOptions={{ ...tooltipOptions }}
                                        disabled={true}
                                        autoComplete='Permission name'
                                    />
                                </div>
                            </div>

                            <div className="col-12 md:col-8 lg:col-8 py-3">
                                <label htmlFor="description" className='input-label'> Description </label>
                                <div className="p-inputgroup mt-2">
                                    <InputText
                                        id="description"
                                        className="p-inputtext-sm"
                                        placeholder="Enter permisison descripiton"
                                        value={payload?.description ? payload?.description : ''}
                                        aria-describedby="description-help"
                                        tooltip="Permission description"
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
                                cancel={"Cancel"}
                                onCancel={() => navigate(paths.permission)}
                                submit={"Update"}
                                onSubmit={submitUpdatePermission}
                                loading={loading}
                            />

                        </div>
                    </Card>
                </div>
            )}
        </div>
    )
}