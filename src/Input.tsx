import React, { memo, useMemo, useCallback } from "react";
import { InputProps, FieldType } from "./Type.d";
import { isEqual } from "lodash";
import Select from './fields/Select'

/**
 * 解包值的方法
 * @param {any} show - 显示的方法
 * @param {any} value - 显示的值
 * @param {any} defaultValue - 默认值
 * @returns 解包后的值
 */
const unWrapValue = (show, value, defaultValue) => {
  if (typeof show === "function") {
    return show(value);
  }
  return defaultValue || value;
};

/**
 * 输入框组件
 * @component
 * @param {object} props - 组件 props
 * @param {string} props.keyPath - 键路径
 * @param {object} props.field - 字段属性
 * @param {any} props.value - 值
 * @param {function} props.onChange - 值更改处理程序
 * @param {object} props.values - 值列表
 * @returns {JSX.Element} React 组件
 */
const Input = ({ keyPath, field, value, onChange, values, ...rest }: InputProps) => {
  const { type, name, label, options } = field;

  /**
   * 字段是否禁用
   * @type {boolean}
   */
  const disabled = field?.disabled ? field?.disabled(values) : false;
  !field.subFields && console.log(`[Input]:${name}`);

  /**
   * 处理值更改的方法
   * @type {Function}
   */
  const onValueChange = useCallback(
    (e: any, path = "", innerField = null) => {
      onChange(e, path || name, innerField || field);
    },
    [field, name, onChange]
  );

  /**
   * 渲染子字段
   * @type {JSX.Element|null}
   */
  const renderSubFields = useMemo(() => {
    if (!field.subFields) {
      return null;
    }
    const subFieldsValue = value || [];
    /**
     * 添加子字段的方法
     * @type {Function}
     */
    const addSubField = () => {
      const newSubField = Object.fromEntries(field.subFields.map(subField => [subField.name, '']));

      const newSubFieldsValue = [...subFieldsValue, newSubField];
      onValueChange({ target: { value: newSubFieldsValue } });
    }

    /**
     * 删除子字段的方法
     * @param {number} subfieldIndex - 要删除的子字段索引
     */
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
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-gray-700">
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
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === FieldType.TextArea && (
        <textarea
          name={name}
          data-testid={keyPath || name}
          value={value}
          disabled={disabled}
          onChange={onValueChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      )}
      {type === FieldType.Radio && <div className="flex mt-2" id={name}>
        {options?.map((option) => (
          <div key={option.value} className="flex items-center mr-2">
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
            <label htmlFor={option.value} className="ml-1">
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
        <Select 
          data-testid={keyPath || name}
          value={value}
          onChange={onValueChange}
          disabled={disabled}
          {...field}
        >
        </Select>
      )}
      {renderSubFields}
    </div>
  );
};
export default memo(Input, (prev, next) => {
  // console.log(`isEqual(prev.field?.formItemProps?.css, next.field?.formItemProps?.css)`,
  // prev.field.step,
  // prev.field?.formItemProps,
  // next.field.step,
  // next.field?.formItemProps,
  // isEqual(prev.field?.formItemProps?.css, next.field?.formItemProps?.css))
  return prev.value === next.value &&
    isEqual(prev.field?.formItemProps?.css, next.field?.formItemProps?.css) &&
    !next.values.__tracker.includes(next.field?.name);
});
