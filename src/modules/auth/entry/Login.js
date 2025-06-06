import { Card } from "primereact/card";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { useState } from "react";
import { payloadHandler } from "../../../helpers/handler";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authService } from "../authService";
import { paths } from "../../../constants/paths";
import { ValidationMessage } from "../../../shares/ValidationMessage";

export const Login = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    /**
     * Admin Login
     * Payload - [username, password]
     * @returns 
     */
    const submitLogin = async () => {
        setLoading(true);

        const result = await authService.login(payload, dispatch);
        setLoading(false);

        if(result.status === 200) {
            navigate(paths.dashboard);
        }
    }

    return(
    <div style={{background: "#1c1b1b" , height: "100%"}}>
        <div className="grid">
            <div className="col-12 md:col-4 lg:col-4 md:col-offset-4 my-8">
                <Card
                    title="Login"
                    subTitle="Administrator Login"
                >
                    <div className="my-5">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>

                            <InputText 
                                type="email"
                                className="p-inputtext-sm"
                                value={payload.email}
                                disabled={loading}
                                placeholder="Enter email address"
                                onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                        </div>
                        <ValidationMessage field={"email"} />
                    </div>

                    <div className="my-5">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-lock"></i>
                            </span>

                            <InputText 
                                className="p-inputtext-sm"
                                type="password"
                                placeholder="Enter password"
                                value={payload.password}
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'password', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                        </div>
                        <ValidationMessage field={"password"} />
                    </div>


                    <div className="flex flex-row align-items-center justify-content-between w-full">
                        <a href="/auth/forget-password"> Forget Password? </a>
                        <Button 
                            severity="danger"
                            label="LOGIN"
                            disabled={loading}
                            onClick={() => submitLogin() }
                            size="small"
                        />
                    </div>
                </Card>
            </div>
        </div>
    </div>
    )   
}