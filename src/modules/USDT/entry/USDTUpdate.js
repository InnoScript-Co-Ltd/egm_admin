import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { tooltipOptions } from "../../../constants/config";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { usdtPayload } from "../usdtPayload";
import { usdtService } from "../usdtService";
import { partnerService } from "../../partner/partnerService";
import { Dropdown } from "primereact/dropdown";
import { statusOptions } from "../../../constants/config";

export const USDTUpdate = () => {
  const [payload, setPayload] = useState(usdtPayload.update);
  const [loading, setLoading] = useState(false);
  const [partner, setPartner] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { usdt } = useSelector((state) => state.usdt);

  const filteredStatusOptions = statusOptions.filter((item) =>
    ["ACTIVE", "DISABLE", "PENDING", "DELETED"].includes(item.status)
  );
  // Function to handle USDT update
  const usdtUpdate = async () => {
    setLoading(true);
    const response = await usdtService.update(dispatch, payload, params.id);
    console.log(response);
    setLoading(false);
  };

  // Function to load the USDT data for editing
  const loadingData = useCallback(async () => {
    setLoading(true);
    const result = await usdtService.show(dispatch, params.id);
    if (result?.status === 200 && result.data) {
      setPayload((prevPayload) => ({
        ...prevPayload,
        ...result.data,
        partner_id: result.data.partner_id || null,
      }));
    }
    setLoading(false);
  }, [dispatch, params.id]);

  // Load partner data
  const loadPartnerData = useCallback(async () => {
    setLoading(true);
    const result = await partnerService.index(dispatch);
    if (result.status === 200) {
      const formatted = result.data?.map((partner) => ({
        label: `${partner?.first_name || ""} ${
          partner?.last_name || ""
        }`.trim(),
        value: partner?.id,
      }));
      setPartner(formatted);
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadPartnerData();
  }, [loadPartnerData]);

  // Update payload with partner data when both partner and payload are loaded
  useEffect(() => {
    if (usdt && partner.length > 0) {
      const matchedPartner = partner.find((p) => p.value === usdt.partner_id);
      console.log(matchedPartner, "new");
      setPayload((prev) => ({
        ...prev,
        partner_id: matchedPartner ? matchedPartner.value : null,
      }));
    }
  }, [usdt, partner]);

  // Load USDT data when the component mounts
  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <Card title="Update Bank Account Type Information">
          <Loading loading={loading} />

          <div className="grid">
            <div className="col-12 md:col-3 py-3">
              <label htmlFor="partner_id" className="input-label">
                Partner
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  id="partner_id"
                  name="partner_id"
                  className="p-inputtext-sm w-full"
                  value={payload.partner_id}
                  options={partner}
                  onChange={(e) =>
                    payloadHandler(
                      { ...payload },
                      e.value,
                      "partner_id",
                      setPayload
                    )
                  }
                  placeholder="Select a Partner"
                  tooltip="Select the associated partner"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                />
              </div>
              <ValidationMessage field="partner_id" />
            </div>

            <div className="col-12 md:col-3 py-3">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="email"
                  name="email"
                  className="p-inputtext-sm"
                  placeholder="Enter Your Email"
                  value={payload.email || ""}
                  tooltip="Email"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      { ...payload },
                      e.target.value,
                      "email",
                      setPayload
                    )
                  }
                />
              </div>
              <ValidationMessage field="email" />
            </div>

            <div className="col-12 md:col-3 py-3">
              <label htmlFor="phone" className="input-label">
                Phone
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="phone"
                  name="phone"
                  className="p-inputtext-sm"
                  placeholder="Enter Your Phone"
                  value={payload.phone || ""}
                  tooltip="Phone"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      { ...payload },
                      e.target.value,
                      "phone",
                      setPayload
                    )
                  }
                />
              </div>
              <ValidationMessage field="phone" />
            </div>

            <div className="col-12 md:col-3 py-3">
              <label htmlFor="name" className="input-label">
                Name
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="name"
                  name="name"
                  className="p-inputtext-sm"
                  placeholder="Enter Your Name"
                  value={payload.name || ""}
                  tooltip="Name"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      { ...payload },
                      e.target.value,
                      "name",
                      setPayload
                    )
                  }
                />
              </div>
              <ValidationMessage field="name" />
            </div>

            <div className="col-12 md:col-3 py-3">
              <label htmlFor="address" className="input-label">
                Address
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="address"
                  name="address"
                  className="p-inputtext-sm"
                  placeholder="Enter Your Address"
                  value={payload.address || ""}
                  tooltip="Address"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      { ...payload },
                      e.target.value,
                      "address",
                      setPayload
                    )
                  }
                />
              </div>
              <ValidationMessage field="address" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="address_type" className="input-label">
                Address Type
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  id="address_type"
                  name="address_type"
                  className="p-inputtext-sm w-full"
                  placeholder="Select address type"
                  value={payload.address_type || ""}
                  options={[
                    { label: "MERCHANT", value: "MERCHANT" },
                    { label: "PARTNER", value: "PARTNER" },
                  ]}
                  tooltip="Address Type"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      { ...payload },
                      e.value,
                      "address_type",
                      setPayload
                    )
                  }
                />
              </div>
              <ValidationMessage field="address_type" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="status" className="input-label">
                {"Status"}
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
              submit="Update"
              onSubmit={usdtUpdate}
              loading={loading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
