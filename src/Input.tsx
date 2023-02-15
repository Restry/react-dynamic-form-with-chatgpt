import React, { memo } from "react";
import { InputProps, FieldType } from "./Type.d";

// const Input = ({ type, name, label, options, value, onChange }: InputProps) => {
//   console.log(`[Input]:${name}`);

const Input = ({ field, value, onChange, values }: InputProps) => {
  const { type, name, label, options } = field;

  const disabled = field.isDisabled ? field.isDisabled(values) : false;
  console.log(`[Input]:${field.name}`);

  const renderSubFields = () => {
    if (!field.subFields) {
      return null;
    }

    return (
      <div className="mt-4 ml-4">
        {field.subFields.map((subField) => (
          <Input
            key={subField.name}
            field={subField}
            value={value[subField.name]}
            onChange={onChange}
            values={value}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === FieldType.Text && (
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === FieldType.TextArea && (
        <textarea
          name={name}
          id={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === FieldType.Radio &&
        options?.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              disabled={disabled}
              checked={value === option.value}
              onChange={onChange}
              className="form-radio h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label htmlFor={option.value} className="ml-3">
              {option.label}
            </label>
          </div>
        ))}
      {type === FieldType.Checkbox && (
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={value}
          disabled={disabled}
          onChange={onChange}
          className="form-checkbox h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"
        />
      )}
      {type === FieldType.Select && (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {renderSubFields()}
    </div>
  );
};
export default memo(Input, (prev, next) => prev.value === next.value);
