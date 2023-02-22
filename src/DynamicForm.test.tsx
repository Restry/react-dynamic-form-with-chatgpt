import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormComponent from "./DynamicForm";
import { Field, FieldType } from "./Type.d";
const setup = { appConfig: jest.fn() };
Object.defineProperty(window, "setup", setup);


describe("FormComponent", () => {
  const fields: Field[] = [
    { name: "firstName", label: "First Name", type: FieldType.Text, },
    { name: "lastName", label: "Last Name", type: FieldType.Text, }, 
    { name: "rememberMe", label: "Remember Me", type: FieldType.Checkbox, },

    {
      type: FieldType.Text,
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
          name: "phoneNumber",
          label: "Phone Number",
          type: FieldType.Text,
        },
        {
          name: "address",
          label: "Address",
          type: FieldType.TextArea,
        },
      ],
    },
    {
      type: FieldType.TextArea,
      name: "description",
      label: "Description",
    },
    {
      type: FieldType.Checkbox,
      name: "agreement",
      dependent: ["age", "gender"],
      label: "Agree to terms and conditions",
    },
    {
      type: FieldType.Radio,
      name: "gender",
      label: "Gender",
      isDisabled: (values) => values.agreement,
      options: [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
    },
    {
      type: FieldType.Select,
      name: "age",
      label: "Age",
      isDisabled: (values) => values.agreement,
      options: [
        { value: "10", label: "10" },
        { value: "12", label: "12" },
      ],
    },
  ];

  const onSubmit = jest.fn();

  it("should render all fields", () => {
    render(
      <FormComponent fields={fields} onSubmit={onSubmit} defaultValue={{}} />
    );

    fields.forEach((field) => {
      const label = screen.getByText(field.label);
      expect(label).toBeInTheDocument();
    });
  });

  it("updates the form value correctly when the user types into a field", () => {
    render(
      <FormComponent
        fields={fields}
        onSubmit={() => { }}
        defaultValue={{ firstName: "", lastName: "", email: "", password: "" }}
      />
    );

    const firstNameInput = screen.getByTestId("firstName");
    const lastNameInput = screen.getByTestId("lastName");

    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    const removeButton = screen.getByText("Remove");
    fireEvent.click(removeButton);

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput).toHaveValue("John");

    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput).toHaveValue("Doe");
  });
 
  it("submits the form correctly when the submit button is clicked", () => {
    const onSubmit = jest.fn();

    render(
      <FormComponent
        fields={fields}
        onSubmit={onSubmit}
        defaultValue={{ firstName: "", lastName: "", workExperience: [] }}
      />
    );

    const firstNameInput = screen.getByTestId("firstName");
    const lastNameInput = screen.getByTestId("lastName");
    const submitButton = screen.getByText("Save");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    const genderMale = screen.getByText("Male");
    fireEvent.click(genderMale);


    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    const firstCompanyName = screen.getByTestId("workExperience-companyName-0");
    fireEvent.change(firstCompanyName, { target: { value: "MS" } });

    const allCompanyInput = screen.getAllByText('Company Name')
    expect(allCompanyInput).toHaveLength(2);


    fireEvent.click(screen.getByTestId('agreement'))

    const genderInput = screen.getByTestId("male");
    expect(genderInput).toBeDisabled()

    fireEvent.click(screen.getByTestId('agreement'))
    expect(genderInput).not.toBeDisabled()

    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      "age": "",
      "agreement": '',
      "description": "",
      "firstName": "John",
      "gender": "male",
      "lastName": "Doe",
      "name": "[86][86]undefined",
      "rememberMe": "",
      "workExperience": [{
        "address": "",
        "companyName": "MS",
        "phoneNumber": "",
      },{
        "address": "",
        "companyName": "",
        "phoneNumber": "",
      }],
    });
  });
});
