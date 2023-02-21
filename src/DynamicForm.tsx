import React, { useCallback, useMemo } from "react";
import { useImmer } from "use-immer";
import Input from "./Input";
import { FormComponentProps, Field } from "./Type";
import { set } from "lodash";

const FormComponent = ({
  fields,
  onSubmit,
  defaultValue,
}: FormComponentProps) => {
  const preprocessFieldValue = useCallback((field: Field, value: any) => {
    return field?.preprocess ? field.preprocess(value) : value;
  }, []);

  const [formValue, updateFormValue] = useImmer<any>(() => {
    const initValues: any = {};
    fields.forEach((field) => {
      initValues[field.name] = preprocessFieldValue(
        field,
        defaultValue[field.name]
      );
    });
    return initValues;
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>,
      path = "",
      field
    ) => {
      const { name, value, type, checked } = e.target;
      let updateValuePath = path ? path : name;

      if (field.dependent) {
        field.dependent?.forEach((name: string) => {
          const dependField = fields.find((b) => b.name === name);
          console.log("dependField", dependField);
          dependField && (dependField.key = Date.now());
        });
      }

      updateFormValue((draft) => {
        set(draft, updateValuePath, type === "checkbox" ? checked : value);
      });
    },
    [updateFormValue, fields, Date.now]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement | any>) => {
      e.preventDefault();
      const processedFormValue = {};
      fields.forEach((field) => {
        const { name } = field;
        const value = formValue[name];
        processedFormValue[name] = preprocessFieldValue(field, value);
      });
      onSubmit && onSubmit(processedFormValue);
      return processedFormValue;
    },
    [fields, formValue, onSubmit, preprocessFieldValue]
  );

  const formItems = useMemo(() => {
    return fields.map((field) => (
      <Input
        key={field.name}
        field={field}
        values={formValue}
        value={formValue[field.name]}
        onChange={handleChange}
      />
    ));
  }, [fields, formValue, handleChange]);

  return (
    <div style={{ margin: "2em" }}>
      <form>{formItems}</form>
      <div style={{ width: "100%", wordBreak: "break-all" }}>
        {JSON.stringify(formValue)}
      </div>
      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
