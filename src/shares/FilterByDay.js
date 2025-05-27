import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

export const FilterByDay = ({ id, onFilter, label, disabled }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log("Selected option:", selectedOption);

  const quickOptions = [
    { label: "1 Day", value: 1 },
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
  ];

  const handleChange = (e) => {
    setSelectedOption(e.value);

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (e.value - 1));

    onFilter({ startDate: start, endDate: end });
  };

  //   const clearFilter = () => {
  //     setSelectedOption(null); // Clear state when resetting
  //     onFilter({ startDate: "", endDate: "" });
  //   };

  return (
    <div>
      <span>{label}</span>
      <div className="flex">
        <div className="form-group flex mt-1">
          <Dropdown
            id={id}
            value={selectedOption} // Use the state value here
            options={quickOptions}
            onChange={handleChange}
            placeholder="Select Days"
            disabled={disabled}
            className="p-inputtext-sm w-full"
          />
        </div>
        {/* <Button
          className="form-group mt-1 ml-3"
          size="small"
          icon="pi pi-sync"
          label="Reset"
          severity="danger"
          outlined
          disabled={disabled}
          onClick={clearFilter}
        /> */}
      </div>
    </div>
  );
};
