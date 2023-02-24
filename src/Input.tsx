import React, { memo, useMemo, useCallback } from "react";
import { InputProps, FieldType } from "./Type.d";
import { isEqual } from "lodash";

const unWrapValue = (show, value, defaultValue) => {
  if (typeof show === "function") {
    return show(value);
  }
  return defaultValue || value;
};

const Input = ({ keyPath, field, value, onChange, values, ...rest }: InputProps) => {
  const { type, name, label, options } = field;

  const disabled = field?.disabled ? field?.disabled(values) : false;
  !field.subFields && console.log(`[Input]:${name}`);

  const onValueChange = useCallback(
    (e: any, path = "", innerField = null) => {
      onChange(e, path || name, innerField || field);
    },
    [field, name, onChange]
  );

  const renderSubFields = useMemo(() => {
    if (!field.subFields) {
      return null;
    }
    const subFieldsValue = value || [];
    const addSubField = () => {
      const newSubField = Object.fromEntries(field.subFields.map(subField => [subField.name, '']));

      const newSubFieldsValue = [...subFieldsValue, newSubField];
      onValueChange({ target: { value: newSubFieldsValue } });
    }

    const removeSubField = (subfieldIndex) => {
      const newSubfields = subFieldsValue.filter((_, index) => index !== subfieldIndex);
      onValueChange({ target: { value: newSubfields } });
    };

    return (
      <div>
        {subFieldsValue.map((subFieldValue: any, i: number) => (
          <div key={`${name}-subField-${i}`} className="mt-4 ml-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">

            {field.subFields.map((subField) => (
              <div className="bg-gray-100 p-2" key={`${name}-${subField.name}-${i}`}> <Input
                keyPath={`${name}-${subField.name}-${i}`}
                field={subField}
                value={subFieldValue[subField.name]}
                onChange={(e) =>
                  onValueChange(e, `${name}[${i}]${subField.name}`, subField)
                }
                values={subFieldValue}
              />

              </div>
            ))}
            <button onClick={() => removeSubField(i)} type="button" className="px-2 py-1 rounded-lg flex items-center">
              Remove
            </button>
          </div>
        ))}

        <div className="border border-dashed border-gray-300 bg-gray-200 hover:bg-gray-300 py-1 mt-2 flex items-center justify-center">
          <button onClick={addSubField} type="button" className=" px-2 py-1 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Add
          </button>
        </div>


      </div>
    );
  }, [field.subFields, name, onValueChange, value]);


  return (
    <div className={`mb-2 col-span-${field.formItemProps?.span || 1} 
    ${unWrapValue(field.formItemProps?.show, field, true) ? "block" : "hidden"} 
    ${field.formItemProps?.css}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === FieldType.Text && (
        <input
          type="text"
          name={name}
          data-testid={keyPath || name}
          value={value}
          disabled={disabled}
          onChange={onValueChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === FieldType.Number && (
        <input
          type="number"
          name={name}
          data-testid={keyPath || name}
          value={value}
          disabled={disabled}
          onChange={onValueChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === FieldType.Email && (
        <input
          type="email"
          name={name}
          data-testid={keyPath || name}
          value={value}
          disabled={disabled}
          onChange={onValueChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === FieldType.TextArea && (
        <textarea
          name={name}
          data-testid={keyPath || name}
          value={value}
          disabled={disabled}
          onChange={onValueChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === FieldType.Radio && <div id={name}>
        {options?.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={option.value}
              data-testid={keyPath || option.value}
              name={name}
              value={option.value}
              disabled={disabled}
              checked={value === option.value}
              onChange={onValueChange}
              className="form-radio h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label htmlFor={option.value} className="ml-3">
              {option.label}
            </label>
          </div>
        ))}</div>}
      {type === FieldType.Checkbox && (
        <input
          type="checkbox"
          data-testid={keyPath || name}
          name={name}
          checked={value}
          disabled={disabled}
          onChange={onValueChange}
          className="form-checkbox h-6 w-6 text-indigo-600 transition duration-150 ease-in-out"
        />
      )}
      {type === FieldType.Select && (
        <select
          name={name}
          data-testid={keyPath || name}
          value={value}
          onChange={onValueChange}
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
      {renderSubFields}
    </div>
  );
};
export default memo(Input, (prev, next) => {
  console.log(`isEqual(prev.field?.formItemProps?.css, next.field?.formItemProps?.css)`,
  prev.field.step,
  prev.field?.formItemProps,
  next.field.step,
  next.field?.formItemProps,
  isEqual(prev.field?.formItemProps?.css, next.field?.formItemProps?.css))
  return prev.value === next.value &&
    isEqual(prev.field?.formItemProps?.css, next.field?.formItemProps?.css) &&
    !next.values.__tracker.includes(next.field?.name);
});
