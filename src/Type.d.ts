export type Field = {
  dependent?: string[];
  type: FieldType;
  name: string;
  label: string; 
  options?: { value: string | number; label: string }[];
  step?:number;
  subFields?: Field[];

  disabled?: boolean;
  placeholder?: string;
  rules?: {
    required?: boolean;
    pattern?: RegExp;
    validator?: (value: string | number) => boolean;
    message?: string;
  }[];

  preprocess?: (value: any) => any;
  disabled?: (values: Record<string, any>) => boolean | boolean;

  formItemProps?: {
    span: number;
    show: boolean;
    css: string;
  };
};

export enum FieldType {
  Group = 'group',
  Text = 'input',
  TextArea = 'textarea',
  Email = 'email',
  Password = 'password',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Select = 'select',
  Date = 'date',
  Number = 'number'
}

export type InputProps = {
  keyPath?: string;
  field: Field;

  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>, path?: string, field?: Field) => void;
  values: any;
};

export type FormComponentProps = {
  fields: Field[];
  onValueUpdate?: (values: Record<string, any>) => void;
  onSubmit?: (data: Record<string, any>) => void;
  defaultValue: Record<string, any>;
  column?: number;
};
