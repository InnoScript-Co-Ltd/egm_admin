import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { useRef, useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";
import { usdtPayload } from "../usdtPayload";
import { usdtService } from "../usdtService";
import { partnerService } from "../../partner/partnerService";
import { Dropdown } from "primereact/dropdown";
import { statusOptions } from "../../../constants/config";

export const USDTCreate = () => {
  const [payload, setPayload] = useState(usdtPayload.create);
  const [loading, setLoading] = useState(false);
  const [partner, setPartner] = useState([]);
  const msgs = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadingPartnerData = useCallback(async () => {
    setLoading(true);

    const result = await partnerService.index(dispatch);
    if (result.status === 200) {
      const formatData = result.data?.map((partner) => {
        return {
          label: `${partner?.first_name || ""} ${
            partner?.last_name || ""
          }`.trim(),
          value: partner?.id,
        };
      });
      setPartner(formatData);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingPartnerData();
  }, [loadingPartnerData]);

  const filteredStatusOptions = statusOptions.filter((item) =>
    ["ACTIVE", "DISABLE", "PENDING", "DELETED"].includes(item.status)
  );

  const usdtCreateRequest = async () => {
    setLoading(true);
    const response = await usdtService.store(payload, dispatch);
    if (response.status === 200) {
      navigate(paths.usdt);
    }
    setLoading(false);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <Card title={"Create USDT Account"}>
          <Loading loading={loading} />

          <div className="grid">
            <div className="col-12 md:col-12 lg:col-12 py-3">
              <Messages ref={msgs} />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="region_or_state_id" className="input-label">
                {"Partner Name"} <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  inputId="partner_id"
                  autoComplete="partner_id"
                  name="partner_id"
                  filter
                  value={payload.partner_id}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.value,
                      "partner_id",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  options={partner}
                  placeholder="Select a partner"
                  disabled={loading}
                  className="p-inputtext-sm"
                />
              </div>
              <ValidationMessage field="partner_id" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="email" className="input-label">
                {"Email"} <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="email"
                  name="email"
                  className="p-inputtext-sm"
                  placeholder="Enter Your Email Address"
                  value={payload.email}
                  aria-describedby="email-help"
                  tooltip="Email Address"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value.toLocaleLowerCase(),
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
              <label htmlFor="phone" className="input-label">
                {"Phone"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="phone"
                  name="phone"
                  className="p-inputtext-sm"
                  aria-describedby="phone-help"
                  placeholder="Enter your phone number"
                  value={payload.phone}
                  tooltip="Phone"
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
              <label htmlFor="name" className="input-label">
                {"Name"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="name"
                  name="name"
                  className="p-inputtext-sm"
                  aria-describedby="name-help"
                  placeholder="Enter your name"
                  value={payload.name}
                  tooltip="Name"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "name",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="name" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="address" className="input-label">
                {"Address"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="address"
                  name="address"
                  className="p-inputtext-sm"
                  aria-describedby="address-help"
                  placeholder="Enter your address"
                  value={payload.address}
                  tooltip="Address"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "address",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="address" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="address_type" className="input-label">
                {"Address Type"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  id="address_type"
                  name="address_type"
                  className="p-inputtext-sm"
                  aria-describedby="address-type-help"
                  placeholder="Select address type"
                  value={payload.address_type}
                  options={[
                    { label: "MERCHANT", value: "MERCHANT" },
                    { label: "PARTNER", value: "PARTNER" },
                  ]}
                  tooltip="Address Type"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.value,
                      "address_type",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="address_type" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="status" className="input-label">
                {"Status"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  id="status"
                  name="status"
                  className="p-inputtext-sm"
                  aria-describedby="status-help"
                  placeholder="Select status"
                  value={payload.status}
                  options={filteredStatusOptions.map((item) => ({
                    label: item.status.replace(/_/g, " "),
                    value: item.status,
                  }))}
                  tooltip="Status"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.value,
                      "status",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="status" />
            </div>

            <FormMainAction
              cancel="Cancel"
              onCancel={() => navigate(paths.usdt)}
              submit="Create"
              onSubmit={usdtCreateRequest}
              loading={loading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
