import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import { invoicePayload } from "../invoicePayload";
import { invoiceService } from "../invoiceService";
import { paths } from "../../../constants/paths";
import numeral from "numeral";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";

export const InvoiceDetail = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const { invoice } = useSelector((state) => state.invoice);

  const params = useParams();
  const dispatch = useDispatch();

  const handleIndexClick = (rowData) => {
    setSelectedRowData(rowData);
    setIsDialogVisible(true);
  };

  const columns = useRef(invoicePayload.columns2);
  const showColumns = useRef(
    columns?.current?.filter((col) => col.show === true)
  );

  /** Depoist invoice Reject */

  const initLoading = useCallback(async () => {
    setLoading(true);
    await invoiceService.show2(dispatch, params.invoice_uuid);
    setLoading(false);
  }, [dispatch, params.invoice_uuid]);

  useEffect(() => {
    initLoading();
  }, [initLoading]);

  return (
    <div className="grid">
      <Card>
        <DataTable
          dataKey="id"
          size="normal"
          value={invoice?.invoice_items}
          loading={loading}
          emptyMessage="No invoice found."
          globalFilterFields={invoicePayload.columns}
        >
          {showColumns &&
            showColumns.current?.map((col, index) => {
              return (
                <Column
                  key={`invoice_col_index_${index}`}
                  style={{ minWidth: "250px" }}
                  field={col.field}
                  header={col.header}
                  sortable
                  body={(value, { rowIndex }) => {
                    switch (col.field) {
                      case "index":
                        return (
                          <span
                            style={{
                              color: "blue",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            onClick={() => handleIndexClick(value)}
                          >
                            {rowIndex + 1}
                          </span>
                        );
                      case "product":
                        return value[col.field];
                      case "description":
                        return value[col.field];
                      case "amount":
                        return value[col.field];
                      case "duration":
                        return value[col.field];
                      case "duration_unit":
                        return value[col.field];
                      case "start_time":
                        return value[col.field]
                          ? moment(value[col.field]).format("YYYY-MM-DD")
                          : "-";
                      case "end_time":
                        return value[col.field]
                          ? moment(value[col.field]).format("YYYY-MM-DD")
                          : "-";

                      case "category":
                        return value[col.field];
                      default:
                        return value[col.field];
                    }
                  }}
                />
              );
            })}
        </DataTable>

        <Dialog
          header="Invoice Item Detail"
          visible={isDialogVisible}
          style={{ width: "50vw" }}
          onHide={() => setIsDialogVisible(false)}
        >
          {selectedRowData && (
            <div>
              {selectedRowData.project_name && (
                <p>
                  <strong>Project Name:</strong> {selectedRowData.project_name}
                </p>
              )}
              <p>
                <strong>Product:</strong> {selectedRowData.product}
              </p>
              <p>
                <strong>Amount:</strong> {selectedRowData.amount}
              </p>
              <p>
                <strong>Description:</strong> {selectedRowData.description}
              </p>
              <p>
                <strong>Duration:</strong> {selectedRowData.duration}
              </p>
              <p>
                <strong>Duration Unit:</strong> {selectedRowData.duration_unit}
              </p>
              <p>
                <strong>Start Time:</strong>{" "}
                {selectedRowData.start_time
                  ? moment(selectedRowData.start_time).format("YYYY-MM-DD")
                  : "-"}
              </p>
              <p>
                <strong>End Time:</strong>{" "}
                {selectedRowData.end_time
                  ? moment(selectedRowData.end_time).format("YYYY-MM-DD")
                  : "-"}
              </p>
              {selectedRowData.resource_id && (
                <p>
                  <strong>Resource Id:</strong> {selectedRowData.resource_id}
                </p>
              )}
              <p>
                <strong>Category:</strong> {selectedRowData.category}
              </p>
            </div>
          )}
        </Dialog>
      </Card>
    </div>
  );
};
