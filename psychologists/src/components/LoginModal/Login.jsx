import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import app from '../../firebaseConfig';
import { BiX } from "react-icons/bi";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {createPortal} from "react-dom";
import { useDispatch } from "react-redux";
import { setUserName , setIsLoggedIn} from "../../redux/data/dataSlice";
import { toast } from 'react-toastify';
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";

export default function Login({closeModal}) {
  const emailId = useId();
  const passwordId = useId();
  const dispatch = useDispatch();
  const loginValidate = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters.")
      .max(18, "Password must be less than 18 characters.")
      .required("Required"),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values,{ setSubmitting,resetForm}) => {
    const {email,password}=values;
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    dispatch(setUserName(user.email));
    dispatch(setIsLoggedIn(true));
    toast("Successful login");
    resetForm();
    closeModal();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    dispatch(setIsLoggedIn(false));
    toast(errorCode,errorMessage);
      }).finally(()=>{
    setSubmitting(false);
  })
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="authForm flex flex-col items-start bg-white rounded-2xl">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidate}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="textForm flex flex-col gap-6 mb-4">
                <div className="flex flex-row justify-between w-full">
                  <h1 className="text-4xl">Log In</h1>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-primary text-xl flex"
                  >
                    <BiX className="text-3xl" />
                  </button>
                </div>

                <p className="text-[#191A1580] opacity-70">
                  Welcome back! Please enter your credentials to access your
                  account and continue your search for a psychologist.
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
                <div className="fields relative">
                  <Field
                    name="password"
                    placeholder="Password"
                    id={passwordId}
                    type={showPassword ? "text" : "password"}
                    className="formInputs"
                  ></Field>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-5 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <BiShow className="text-black" /> : <BiHide className="text-black" />}
                  </button>

                  <ErrorMessage
                    name="password"
                    component="span"
                    className="errorMessages"
                  ></ErrorMessage>
                </div>
                <button
                  type="submit"
                  className="text-white bg-primary mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging..." : "Log in"}
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
