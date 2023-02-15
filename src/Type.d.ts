export type Field = {
  type: FieldType;
  name: string;
  label: string;
  options?: { value: string; label: string }[];
  isDisabled?: (values: Record<string, any>) => boolean;
  subFields?: Field[];
  preprocess?: (value: any) => any;
};

export enum FieldType {
  Group = "group",
  Text = "input",
  TextArea = "textarea",
  Email = "email",
  Password = "password",
  Checkbox = "checkbox",
  Radio = "radio",
  Select = "select",
  Date = "date",
  Number = "number",
}

export type InputProps = {
  field: Field;
  value: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => void;
  values: any;
};

export type FormComponentProps = {
  fields: Field[];
  onSubmit?: (data: Record<string, any>) => void;
  defaultValue: Record<string, any>;
};
