// import React from "react";
// import { render, fireEvent, screen } from "@testing-library/react";
// import FormComponent from "./DynamicForm";
// import { Field, FieldType } from "./Type.d";
// const setup = { appConfig: jest.fn() };
// Object.defineProperty(window, "setup", setup);


// describe("FormComponent", () => {
//   const fields: Field[] = [
//     { name: "firstName", label: "First Name", type: FieldType.Text, },
//     { name: "lastName", label: "Last Name", type: FieldType.Text, },
//     // { name: "email", label: "Email", type: FieldType.Email, },
//     // { name: "password", label: "Password", type: FieldType.Password, },
//     { name: "rememberMe", label: "Remember Me", type: FieldType.Checkbox, }, 
//     {
//       name: "gender", label: "Gender", type: FieldType.Radio, options: [{ value: "male", label: "Male", }, { value: "female", label: "Female", },],
//     },
//     // {
//     //   name: "country",
//     //   label: "Country",
//     //   type: FieldType.Select,
//     //   options: [
//     //     {
//     //       value: "usa",
//     //       label: "USA",
//     //     },
//     //     {
//     //       value: "uk",
//     //       label: "UK",
//     //     },
//     //     {
//     //       value: "canada",
//     //       label: "Canada",
//     //     },
//     //   ],
//     // },
//   ];

//   const onSubmit = jest.fn();

//   it("should render all fields", () => {
//     const { getByLabelText } = render(
//       <FormComponent fields={fields} onSubmit={onSubmit} defaultValue={{}} />
//     );

//     fields.forEach((field) => {
//       const label = screen.getByLabelText(field.label);
//       expect(label).toBeInTheDocument();
//     });
//   });

//   it("should update form value when a field is changed", () => {
//     const { getByLabelText } = render(
//       <FormComponent fields={fields} onSubmit={onSubmit} defaultValue={{}} />
//     );

//     const firstName = screen.getByLabelText("First Name");
//     fireEvent.change(firstName, { target: { value: "John" } });

//     const lastName = screen.getByLabelText("Last Name");
//     fireEvent.change(lastName, { target: { value: "Doe" } });

//     // const email = screen.getByLabelText("Email");
//     // fireEvent.change(email, { target: { value: "john.doe@example.com" } });

//     // const password = screen.getByLabelText("Password");
//     // fireEvent.change(password, { target: { value: "password123" } });

//     const rememberMe = screen.getByLabelText("Remember Me");
//     fireEvent.click(rememberMe);

//     const genderMale = screen.getByLabelText("Male");
//     fireEvent.click(genderMale);

//     // const country = screen.getByLabelText("Country");
//     // fireEvent.change(country, { target: { value: "usa" } });

//     expect(onSubmit).toHaveBeenCalledTimes(0);

//     expect(firstName).toHaveValue("John");
//     expect(lastName).toHaveValue("Doe");
//     // expect(email).toHaveValue("john.doe@example.com");
//     // expect(password).toHaveValue("password123");
//     expect(rememberMe).toBeChecked();
//     expect(genderMale).toBeChecked();
//     // expect(country).toHaveValue("usa");
//   });

//   // it("renders all form fields correctly", () => {
//   //   render(
//   //     <FormComponent
//   //       fields={fields}
//   //       onSubmit={() => { }}
//   //       defaultValue={{ firstName: "", lastName: "", color: "", gender: "" }}
//   //     />
//   //   );

//   //   fields.forEach((field) => {
//   //     const input = screen.getByLabelText(field.label);
//   //     expect(input).toBeInTheDocument();
//   //     expect(input).toHaveAttribute("name", field.name);
//   //     expect(input).toHaveValue("");
//   //   });
//   // });

//   it("updates the form value correctly when the user types into a field", () => {
//     const { getByLabelText } = render(
//       <FormComponent
//         fields={fields}
//         onSubmit={() => { }}
//         defaultValue={{ firstName: "", lastName: "", email: "", password: "" }}
//       />
//     );

//     const firstNameInput = screen.getByLabelText("First Name");
//     const lastNameInput = screen.getByLabelText("Last Name");

//     fireEvent.change(firstNameInput, { target: { value: "John" } });
//     expect(firstNameInput).toHaveValue("John");

//     fireEvent.change(lastNameInput, { target: { value: "Doe" } });
//     expect(lastNameInput).toHaveValue("Doe");
//   });

//   const Button = ({ onClick, children }) => (
//     <button onClick={onClick}>{children}</button>
//   );

//   test("calls onClick prop when clicked", () => {
//     const handleClick = jest.fn();
//     render(<Button onClick={handleClick}>Click Me</Button>);
//     fireEvent.click(screen.getByText(/click me/i));
//     expect(handleClick).toHaveBeenCalledTimes(1);
//   });
//   it("submits the form correctly when the submit button is clicked", () => {
//     const onSubmit = jest.fn();

//     const { getByText, getByLabelText } = render(
//       <FormComponent
//         fields={fields}
//         onSubmit={onSubmit}
//         defaultValue={{ firstName: "", lastName: "", email: "", password: "" }}
//       />
//     );

//     const firstNameInput = getByLabelText("First Name");
//     const lastNameInput = getByLabelText("Last Name");
//     const submitButton = getByText("Save");

//     fireEvent.change(firstNameInput, { target: { value: "John" } });
//     fireEvent.change(lastNameInput, { target: { value: "Doe" } });
//     // fireEvent.click(submitButton);
//     fireEvent.click(submitButton);

//     expect(onSubmit).toHaveBeenCalledTimes(1);
//     expect(onSubmit).toHaveBeenCalledWith({
//       firstName: "John",
//       lastName: "Doe",
//       // email: "john.doe@example.com",
//       // password: "password123"
//     });
//   });
// });
