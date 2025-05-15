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
import { transactionPayload } from "../transactionPayload";
import { transactionService } from "../transactionService";
import { partnerService } from "../../partner/partnerService";
import { Dropdown } from "primereact/dropdown";

export const TransactionCreate = () => {
  const [payload, setPayload] = useState(transactionPayload.create);
  const [loading, setLoading] = useState(false);
  const [partnerList, setPartnerList] = useState([]);

  const msgs = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadingData = useCallback(async () => {
    setLoading(true);

    const result = await partnerService.index?.(dispatch); // Use correct method to get list

    if (result?.status === 200 && Array.isArray(result.data)) {
      const formatData = result.data.map((partner) => ({
        label: partner.first_name + " " + partner.last_name,
        value: partner.id,
      }));
      setPartnerList(formatData);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const transactionCreateRequest = async () => {
    setLoading(true);
    const response = await transactionService.store(payload, dispatch);
    if (response.status === 200) {
      navigate(paths.transaction);
    }
    setLoading(false);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <Card title={"Transaction Create"}>
          <Loading loading={loading} />
          <div className="grid">
            <div className="col-12 md:col-12 lg:col-12 py-3">
              <Messages ref={msgs} />
            </div>

            <div className="col-12 md:col-4 lg:col-4 py-3">
              <label htmlFor="partner" className="input-label text-black">
                Partner <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  inputId="partner"
                  name="partner"
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
                  options={partnerList}
                  placeholder="Select a partner"
                  optionLabel="label"
                  optionValue="value"
                  disabled={loading}
                  className="p-inputtext-sm"
                />
              </div>
              <ValidationMessage field="partner_id" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="bank_name" className="input-label">
                Bank Name <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="bank_name"
                  name="bank_name"
                  className="p-inputtext-sm"
                  placeholder="Enter Your Bank Name"
                  value={payload.bank_name}
                  tooltip="Bank Name"
                  tooltipOptions={tooltipOptions}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value.toLowerCase(),
                      "bank_name",
                      (updateValue) => setPayload(updateValue)
                    )
                  }
                />
              </div>
              <ValidationMessage field="bank_name" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="bank_type" className="input-label">
                Bank Type <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="bank_type"
                  name="bank_type"
                  className="p-inputtext-sm"
                  placeholder="Enter your bank type"
                  value={payload.bank_type}
                  tooltip="Bank Type"
                  tooltipOptions={tooltipOptions}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "bank_type",
                      (updateValue) => setPayload(updateValue)
                    )
                  }
                />
              </div>
              <ValidationMessage field="bank_type" />
            </div>

            <FormMainAction
              cancel="Cancel"
              onCancel={() => navigate(paths.transaction)}
              submit="Create"
              onSubmit={transactionCreateRequest}
              loading={loading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
