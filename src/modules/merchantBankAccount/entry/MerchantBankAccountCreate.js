import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { bankTypes, tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Loading } from "../../../shares/Loading";
import { Dropdown } from "primereact/dropdown";
import { FormMainAction } from "../../../shares/FormMainAction";
import { merchantBankAccountPayload } from "../merchantBankAccountPayload";
import { merchantBankAccountService } from "../merchantBankAccountService";

export const MerchantBankAccountCreate = () => {
  const [payload, setPayload] = useState(merchantBankAccountPayload.create);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chooseBankTypeHandler = (e) => {
    const selectBankType = bankTypes.filter((value) => value.value === e)[0];
    const updatePayload = { ...payload };

    updatePayload.bank_type_label = selectBankType.value;
    updatePayload.bank_type = selectBankType.label;

    setPayload(updatePayload);
  };

  const bankOptionTemplate = (option) => {
    if (!option) return null;

    return (
      <div className="flex align-items-center">
        {option.icon && (
          <img
            src={option.icon}
            alt={option.name || option.label}
            className="mr-2"
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
        )}
        <span>{option.name || option.label}</span>
      </div>
    );
  };

  const selectedBankTemplate = (option, props) => {
    if (!option) return <span>{props.placeholder}</span>;
    return (
      <div className="flex align-items-center">
        {option.icon && (
          <img
            src={option.icon}
            alt={option.name || option.label}
            className="mr-2"
            style={{ width: "20px", height: "20px", objectFit: "contain" }}
          />
        )}
        <span>{option.name || option.label}</span>
      </div>
    );
  };

  /**
   * Create Merchant Bank Account
   */
  const merchantBankAccountStore = async () => {
    setLoading(true);
    const response = await merchantBankAccountService.store(payload, dispatch);
    if (response.status === 200) {
      navigate(paths.merchantBankAccount);
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
          title={"Create Merchant Bank Account"}
          subTitle={
            "Merchant bank account is purpose for accpet payment from agent deposit amount"
          }
        >
          <Loading loading={loading} />

          <div className="grid">
            <div className="col-12 md:col-4 lg:col-4 py-3">
              <label htmlFor="name" className="input-label text-black">
                {"Bank Account Holder Name"} <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="holder_name"
                  name="holder_name"
                  className="p-inputtext-sm"
                  placeholder="Enter bank account holder name"
                  value={payload.holder_name}
                  aria-describedby="holder-name-help"
                  tooltip="Bank Account Holder Name"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "holder_name",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="holder_name" />
            </div>

            <div className="col-12 md:col-4 lg:col-4 py-3">
              <label htmlFor="email" className="input-label text-black">
                {"Bank Account Number"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="account_number"
                  name="account_number"
                  className="p-inputtext-sm"
                  aria-describedby="account-number-help"
                  placeholder="Enter Bank Account Number"
                  value={payload.account_number}
                  tooltip="Bank Account Number"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "account_number",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="account_number" />
            </div>

            <div className="col-12 md:col-4 lg:col-4 py-3">
              <label htmlFor="role" className="input-label text-black">
                {"Bank Type"} <span>(required*)</span>{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  id="bank_type_label"
                  name="bank_type_label"
                  value={payload.bank_type_label}
                  onChange={(e) => chooseBankTypeHandler(e.value)}
                  itemTemplate={bankOptionTemplate}
                  valueTemplate={selectedBankTemplate}
                  options={bankTypes}
                  placeholder="Select Bank Type"
                  disabled={loading}
                  className="p-inputtext-sm"
                />
              </div>
              <ValidationMessage field="bank_type_label" />
            </div>

            <FormMainAction
              cancel="Cancel"
              onCancel={() => navigate(paths.admin)}
              submit="Create"
              onSubmit={merchantBankAccountStore}
              loading={loading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
