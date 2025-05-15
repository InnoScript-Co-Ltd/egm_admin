import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
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
import { partnerPayload } from "../partnerPayload";
import { partnerService } from "../partnerService";
import { Button } from "primereact/button";
import { Password } from "primereact/password"; // Optional: Better UI

export const PartnerCreate = () => {
  const [payload, setPayload] = useState(partnerPayload.create);
  const [loading, setLoading] = useState(false);

  const msgs = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const generatePassword = () => {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  /**
   * Create Partner Account
   */
  const partnerCreateRequest = async () => {
    setLoading(true);
    const response = await partnerService.store(payload, dispatch);
    if (response.status === 200) {
      navigate(paths.partner);
    }
    setLoading(false);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <Card
          title={"Create Partner Account"}
          subTitle={"Partner account is need to upgrade FULL_KYC"}
        >
          <Loading loading={loading} />

          <div className="grid">
            <div className="col-12 md:col-12 lg:col-12 py-3">
              <Messages ref={msgs} />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="name" className="input-label">
                {"Username"} <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="username"
                  name="username"
                  className="p-inputtext-sm"
                  placeholder="Enter partner username"
                  value={payload.username}
                  aria-describedby="username-help"
                  tooltip="Partner username"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value.toLocaleLowerCase(),
                      "username",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="username" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="email" className="input-label">
                {"First Name"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="first_name"
                  name="first_name"
                  className="p-inputtext-sm"
                  aria-describedby="first-name-help"
                  placeholder="Enter first name"
                  value={payload.first_name}
                  tooltip="Partner's first name"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "first_name",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="first_name" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="role" className="input-label">
                {"Last Name"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="last_name"
                  name="last_name"
                  className="p-inputtext-sm"
                  aria-describedby="last_name-help"
                  placeholder="Enter last_name"
                  value={payload.last_name}
                  tooltip="Partner's last name"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "last_name",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="last_name" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="role" className="input-label">
                {" "}
                Email <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  type="email"
                  id="email"
                  name="email"
                  className="p-inputtext-sm"
                  aria-describedby="email-help"
                  placeholder="Enter Email Address"
                  value={payload.email}
                  tooltip="Partner's email address"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "email",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="email" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="role" className="input-label">
                {" "}
                Phone <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  type="text"
                  id="phone"
                  name="phone"
                  className="p-inputtext-sm"
                  aria-describedby="phone-help"
                  placeholder="Enter Phone Number"
                  value={payload.phone}
                  tooltip="Partner's phone number must be start 9xxxxxxxx"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "phone",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="phone" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="roi" className="input-label">
                {" "}
                Roi <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  type="number"
                  id="roi"
                  name="roi"
                  className="p-inputtext-sm"
                  aria-describedby="roi-help"
                  placeholder="Enter Roi Rate"
                  value={payload.roi}
                  tooltip="Partner's roi rate"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "roi",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="roi" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="password" className="input-label">
                Password <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <Password
                  id="password"
                  name="password"
                  className="p-inputtext-sm"
                  value={payload.password}
                  placeholder="Enter or generate password"
                  feedback={false}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "password",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
                <Button
                  type="button"
                  icon="pi pi-refresh"
                  className="p-button-sm p-button-outlined"
                  tooltip="Generate Password"
                  tooltipOptions={{ ...tooltipOptions }}
                  onClick={() =>
                    payloadHandler(
                      payload,
                      generatePassword(),
                      "password",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="password" />
            </div>

            <FormMainAction
              cancel="Cancel"
              onCancel={() => navigate(paths.partner)}
              submit="Create"
              onSubmit={partnerCreateRequest}
              loading={loading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
