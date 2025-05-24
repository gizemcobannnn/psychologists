import { Formik, Field, Form, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

export default function Register() {
  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters.")
      .max()
      .required("Required field"),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Required field"),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters.")
      .max(18, "Password must be less than 18 characters.")
      .required("Required field"),
  });

  const handleSubmit = () => {};

  return (
    <div className="authForm flex flex-col items-start">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema = {registerSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="textForm gap-6 mb-4">
            <h1 className="text-4xl">Registration</h1>
            <p className="text-[#191A1580] opacity-70">
              Thank you for your interest in our platform! In order to register,
              we need some information. Please provide us with the following
              information.
            </p>
          </div>
          <div className="form">
                   <div className="fields">
            <Field
              name="name"
              placeholder="Name"
              type="text"
              id={nameId}
              className="formInputs"
            ></Field>
            <ErrorMessage
              name="name"
              component="span"
              className="errorMessages"
            ></ErrorMessage>
            </div>
            <div>
              <Field
                name="email"
                id={emailId}
                placeholder="Email"
                type="email"
                className="formInputs"
              ></Field>
              <ErrorMessage
                name="email"
                component="span"
                className="errorMessages"
              ></ErrorMessage>
            </div>
            <div>
              <Field
                name="password"
                id={passId}
                placeholder="Password"
                type="password"
                className="formInputs"
              ></Field>
              <ErrorMessage
                name="password"
                component="span"
                className="errorMessages"
              ></ErrorMessage>
            </div>
            <button className="text-white">
                Sign Up
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
