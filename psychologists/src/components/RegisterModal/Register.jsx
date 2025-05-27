import { Formik, Field, Form, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../../firebaseConfig';

export default function Register() {
  const nameId = useId();
  const emailId = useId();
  const passId = useId();

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters.")
      .max(15, "Name must be less than 15 characters.")
      .required("Required field"),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Required field"),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters.")
      .max(18, "Password must be less than 18 characters.")
      .required("Required field"),
  });

  const auth = getAuth(app);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { name, email, password } = values;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User registered:", userCredential.user);
        console.log("Name:", name);
        resetForm();
      })
      .catch((error) => {
        console.error("Registration error:", error.code, error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="authForm flex flex-col items-start">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="textForm gap-6 mb-4">
              <h1 className="text-4xl">Registration</h1>
              <p className="text-[#191A1580] opacity-70">
                Thank you for your interest in our platform! Please provide us with the following information.
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
                />
                <ErrorMessage name="name" component="span" className="errorMessages" />
              </div>

              <div className="fields">
                <Field
                  name="email"
                  placeholder="Email"
                  type="email"
                  id={emailId}
                  className="formInputs"
                />
                <ErrorMessage name="email" component="span" className="errorMessages" />
              </div>

              <div className="fields">
                <Field
                  name="password"
                  placeholder="Password"
                  type="password"
                  id={passId}
                  className="formInputs"
                />
                <ErrorMessage name="password" component="span" className="errorMessages" />
              </div>

              <button type="submit" className="text-white mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Sign Up"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
