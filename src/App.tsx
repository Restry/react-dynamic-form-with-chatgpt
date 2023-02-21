import "./styles.css";

import DynamicForm from "./DynamicForm";
import { Field, FieldType } from "./Type.d";

const fields = [
  {
    type: "input",
    name: "name",
    label: "Name",
    preprocess: (value) => `[86]${value}`,
  },
  {
    type: FieldType.Group,
    name: "workExperience",
    label: "Work Experience",
    subFields: [
      {
        name: "companyName",
        label: "Company Name",
        type: FieldType.Text,
      },
      {
        name: "address",
        label: "Address",
        type: FieldType.TextArea,
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        type: FieldType.Text,
      },
    ],
  },
  {
    type: "textarea",
    name: "description",
    label: "Description",
  },
  {
    type: "radio",
    name: "gender",
    label: "Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    type: "checkbox",
    name: "agreement",
    dependent: ["select"],
    label: "Agree to terms and conditions",
  },
  {
    key: -1,
    type: "select",
    name: "select",
    label: "Agree",
    isDisabled: (values) => values.agreement,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
] as Field[];

export default function App() {
  return (
    <div style={{ background: "#fff", margin: "1em" }}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <DynamicForm
            fields={fields}
            defaultValue={{ name: "ninc", workExperience: {} }}
          />
        </div>
      </div>
    </div>
  );
}
