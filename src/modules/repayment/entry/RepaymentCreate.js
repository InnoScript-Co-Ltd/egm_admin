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
import { repaymentPayload } from "../repaymentPayload";
import { repaymentService } from "../repaymentService";
import { partnerService } from "../../partner/partnerService";
import { transactionService } from "../../transaction/transactionService";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

export const RepaymentCreate = () => {
  const [payload, setPayload] = useState(repaymentPayload.create);
  const [loading, setLoading] = useState(false);
  const [partnerList, setPartnerList] = useState([]);
  const [transactionList, setTransactionList] = useState([]);

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

  const transactionData = useCallback(async () => {
    setLoading(true);

    const result = await transactionService.index?.(dispatch); // Use correct method to get list

    if (result?.status === 200 && Array.isArray(result.data)) {
      const formatData = result.data.map((item) => ({
        label: item.id,
        value: item.id,
      }));
      setTransactionList(formatData);
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    transactionData();
  }, [transactionData]);

  const repaymentCreateRequest = async () => {
    setLoading(true);
    const response = await repaymentService.store(payload, dispatch);
    if (response.status === 200) {
      navigate(paths.repayment);
    }
    setLoading(false);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <Card title={"Repayment Create"}>
          <Loading loading={loading} />
          <div className="grid">
            <div className="col-12 md:col-12 lg:col-12 py-3">
              <Messages ref={msgs} />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label
                htmlFor="transaction_id"
                className="input-label text-black"
              >
                Transaction Id <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  inputId="transaction_id"
                  name="transaction_id"
                  value={payload.transaction_id}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.value,
                      "transaction_id",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  options={transactionList}
                  placeholder="Select a transaction"
                  optionLabel="label"
                  optionValue="value"
                  disabled={loading}
                  className="p-inputtext-sm"
                />
              </div>
              <ValidationMessage field="transaction_id" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
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
              <label htmlFor="count_day" className="input-label">
                Count Day <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="count_day"
                  name="count_day"
                  className="p-inputtext-sm"
                  placeholder="Enter Your Count Day"
                  value={payload.count_days}
                  tooltip="Count Day"
                  tooltipOptions={tooltipOptions}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value.toLowerCase(),
                      "count_days",
                      (updateValue) => setPayload(updateValue)
                    )
                  }
                />
              </div>
              <ValidationMessage field="count_days" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="totdal_days" className="input-label">
                Total Days <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="total_days"
                  name="total_days"
                  className="p-inputtext-sm"
                  placeholder="Enter your total days"
                  value={payload.total_days}
                  tooltip="Total Days"
                  tooltipOptions={tooltipOptions}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "total_days",
                      (updateValue) => setPayload(updateValue)
                    )
                  }
                />
              </div>
              <ValidationMessage field="total_days" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="amount" className="input-label">
                Amount <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="amount"
                  name="amount"
                  className="p-inputtext-sm"
                  placeholder="Enter your amount"
                  value={payload.amount}
                  tooltip="Amount"
                  tooltipOptions={tooltipOptions}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "amount",
                      (updateValue) => setPayload(updateValue)
                    )
                  }
                />
              </div>
              <ValidationMessage field="amount" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="oneday_amount" className="input-label">
                Oneday Amount <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="oneday_amount"
                  name="oneday_amount"
                  className="p-inputtext-sm"
                  placeholder="Enter your oneday amount"
                  value={payload.oneday_amount}
                  tooltip="Oneday Amount"
                  tooltipOptions={tooltipOptions}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "oneday_amount",
                      (updateValue) => setPayload(updateValue)
                    )
                  }
                />
              </div>
              <ValidationMessage field="oneday_amount" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="total_amount" className="input-label">
                Total Amount <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="total_amount"
                  name="total_amount"
                  className="p-inputtext-sm"
                  placeholder="Enter your total amount"
                  value={payload.oneday_amount}
                  tooltip="Total Amount"
                  tooltipOptions={tooltipOptions}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "total_amount",
                      (updateValue) => setPayload(updateValue)
                    )
                  }
                />
              </div>
              <ValidationMessage field="total_amount" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="date" className="input-label text-black">
                {"Repayment Date"} <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <Calendar
                  name="date"
                  className="p-inputtext-sm md:mr-2 sm:w-full"
                  placeholder="Select Repayment of date"
                  selectionMode={"single"}
                  maxDate={new Date()}
                  value={payload.date}
                  tooltip="Repayment date"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "date",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="date" />
            </div>

            <div className="col-12 md:col-3 lg:col-3 py-3">
              <label htmlFor="created_at" className="input-label text-black">
                {"Created At"} <span>(required*)</span>
              </label>
              <div className="p-inputgroup mt-2">
                <Calendar
                  name="created_at"
                  className="p-inputtext-sm md:mr-2 sm:w-full"
                  placeholder="Select Created of date"
                  selectionMode={"single"}
                  maxDate={new Date()}
                  value={payload.created_at}
                  tooltip="Created date"
                  tooltipOptions={{ ...tooltipOptions }}
                  disabled={loading}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "created_at",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
              </div>
              <ValidationMessage field="created_at" />
            </div>

            <FormMainAction
              cancel="Cancel"
              onCancel={() => navigate(paths.repayment)}
              submit="Create"
              onSubmit={repaymentCreateRequest}
              loading={loading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
