import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";

export default function Login() {
  const emailId = useId();
  const passwordId = useId();

  const loginValidate = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters.")
      .max(18, "Password must be less than 18 characters.")
      .required("Required"),
  });
  const handleLogin = () => {};

  return (
    <div className="authForm flex flex-col items-start">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema ={loginValidate}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="textForm gap-6 mb-4">
            <h1 className="text-4xl">Log In</h1>
            <p className="text-[#191A1580] opacity-70">
              Welcome back! Please enter your credentials to access your account
              and continue your search for a psychologist.
            </p>
          </div>
          <div className="form">
            <div className="fields">
            <Field
              name="email"
              placeholder="Email"
              id={emailId}
              type="email"
              className="formInputs"
            ></Field>
            <ErrorMessage
              name="email"
              component="span"
              className="errorMessages"
            ></ErrorMessage>
          </div>
          <div className="fields">
            <Field
              name="password"
              placeholder="Password"
              id={passwordId}
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
                Log In
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
