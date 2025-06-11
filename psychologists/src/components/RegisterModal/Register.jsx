import { Formik, Field, Form, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { BiX } from "react-icons/bi";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebaseConfig";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { setIsRegister, setUserName, setIsLoggedIn } from "../../redux/data/dataSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

export default function Register({ closeModal }) {
  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const dispatch = useDispatch();
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
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(app);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { name,email, password } = values;

    createUserWithEmailAndPassword(auth, email, password)
      // eslint-disable-next-line no-unused-vars
      .then((userCredential) => {
        // Kayıt başarılı oldu
        dispatch(setIsRegister(true));
        toast.success("Registration successful! Logging you in...");
        
        // Kayıt olduktan sonra otomatik giriş yap
        return signInWithEmailAndPassword(auth, email, password);
      })
      // eslint-disable-next-line no-unused-vars
      .then((userCredential) => {
        // Giriş başarılı oldu
        
        dispatch(setUserName(name));
        dispatch(setIsLoggedIn(true));
        toast.success("Successfully logged in!");
        resetForm();
        closeModal();
      })
      .catch((error) => {
        let message = "Registration failed. Please try again.";

        switch (error.code) {
          case "auth/email-already-in-use":
            message = "This email is already registered.";
            break;
          case "auth/invalid-email":
            message = "Invalid email address.";
            break;
          case "auth/weak-password":
            message = "Password is too weak.";
            break;
          case "auth/too-many-requests":
            message = "Too many failed attempts. Please try again later.";
            break;
          case "auth/network-request-failed":
            message = "Network error. Please check your connection.";
            break;
          default:
            message = "An unexpected error occurred. Please try again.";
        }

        toast.error(message);
        dispatch(setIsRegister(false));
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="authForm flex flex-col items-start bg-white rounded-2xl">
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="textForm mb-4 flex flex-row ">
                <div className="flex flex-row gap-6 justify-between w-full">
                  <h1 className="text-4xl">Registration</h1>
                  <button
                    className="flex text-primary text-xl"
                    onClick={closeModal}
                  >
                    <BiX className="text-3xl" />
                  </button>
                </div>
                <p className="text-[#191A1580] opacity-70">
                  Thank you for your interest in our platform! Please provide us
                  with the following information.
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
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="errorMessages"
                  />
                </div>

                <div className="fields">
                  <Field
                    name="email"
                    placeholder="Email"
                    type="email"
                    id={emailId}
                    className="formInputs"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className="errorMessages"
                  />
                </div>

                <div className="fields relative">
                  <Field
                    name="password"
                    placeholder="Password"
                    id={passId}
                    type={showPassword ? "text" : "password"}
                    className="formInputs"
                  ></Field>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-5 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <BiHide className="text-black" />
                    ) : (
                      <BiShow className="text-black" />
                    )}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="span"
                    className="errorMessages"
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-primary mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.body
  );
}
