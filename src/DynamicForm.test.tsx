import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormComponent from "./DynamicForm";
import { Field } from "./Type";
const setup = { appConfig: jest.fn() };
Object.defineProperty(window, "setup", setup);

const fields = [
  {
    name: "firstName",
    label: "First Name",
    type: "input",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "input",
  },
  {
    type: "select",
    name: "color",
    label: "Favorite Color",
    options: [
      { label: "Red", value: "red" },
      { label: "Green", value: "green" },
      { label: "Blue", value: "blue" },
    ],
  },
  {
    type: "radio",
    name: "gender",
    label: "Gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    type: "checkbox",
    name: "agreeToTerms",
    label: "Agree to Terms",
  },
] as Field[];

describe("DynamicForm", () => {
  it("renders all form fields correctly", () => {
    render(
      <FormComponent
        fields={fields}
        onSubmit={() => {}}
        defaultValue={{ firstName: "", lastName: "", color: "", gender: "" }}
      />
    );

    fields.forEach((field) => {
      const input = screen.getByLabelText(field.label);
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", field.name);
      expect(input).toHaveValue("");
    });
  });

  it("updates the form value correctly when the user types into a field", () => {
    const { getByLabelText } = render(
      <FormComponent
        fields={fields}
        onSubmit={() => {}}
        defaultValue={{ firstName: "", lastName: "", email: "", password: "" }}
      />
    );

    const firstNameInput = getByLabelText("First Name");
    const lastNameInput = getByLabelText("Last Name");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    expect(firstNameInput).toHaveValue("John");

    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput).toHaveValue("Doe");
  });

  const Button = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
  );

  test("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it("submits the form correctly when the submit button is clicked", () => {
    const onSubmit = jest.fn();

    const { getByText, getByLabelText } = render(
      <FormComponent
        fields={fields}
        onSubmit={onSubmit}
        defaultValue={{ firstName: "", lastName: "", email: "", password: "" }}
      />
    );

    const firstNameInput = getByLabelText("First Name");
    const lastNameInput = getByLabelText("Last Name");
    const submitButton = getByText("Save");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    // fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      // email: "john.doe@example.com",
      // password: "password123"
    });
  });
});
