import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";

export const FilterByStatus = ({ id, status, onFilter, label, disabled }) => {
  const { statusFilter } = useSelector((state) => state.share);

  return (
    <div key={id} id={id}>
      <label htmlFor="status">{label}</label>
      {status && (
        <div className="form-group mt-1">
          <Dropdown
            id={id}
            key={id}
            inputId="status"
            name="status"
            className="p-inputtext-sm w-full"
            options={status ?? []}
            value={!status.includes(statusFilter) ? 'ALL' : statusFilter}
            tooltip="Filter by status"
            disabled={disabled}
            onChange={(e) => {
              onFilter(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};
