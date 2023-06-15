import React, { useState, useEffect } from "react";
import axios from "axios"; 

const Select = ({ options, url, mapper, value, onChange, disabled }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState(options);

  useEffect(() => {
    if (!options && url) {
      setIsLoading(true);
      axios.get(url).then((response) => {
        if (response.status === 200) {
          const newOptions = mapper? response.data.map(mapper): response.data;
          setSelectOptions(newOptions);
        }
        setIsLoading(false);
      });
    }
  }, [options, url, mapper]);

  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleChange}
        className="block w-full appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
      >
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          selectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        )}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <span
          className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
        >up</span>
      </div>
    </div>
  );
};

export default Select;
