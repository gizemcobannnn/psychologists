import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import app from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {createPortal} from "react-dom";
import { useDispatch } from "react-redux";
import { setUserName , setIsLoggedIn} from "../../redux/data/dataSlice";
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
  const handleLogin = (values,{ setSubmitting,resetForm}) => {
    const {email,password}=values;
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user)
    dispatch(setUserName(user.email));
    dispatch(setIsLoggedIn(true));
    resetForm();
    closeModal();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    dispatch(setIsLoggedIn(true));
    console.log(errorCode,errorMessage)
  }).finally(()=>{
    setSubmitting(false);
  })
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
     <div className="authForm flex flex-col items-start bg-white rounded-2xl">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema ={loginValidate}
        onSubmit={handleLogin}
      >
        {({isSubmitting})=>(
        <Form>
          <div className="textForm flex flex-col gap-6 mb-4">
            <div className="flex flex-row justify-between w-full">
               <h1 className="text-4xl">Log In</h1>
               <button onClick={closeModal} className="flex">X</button>
            </div>
           
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
              <button type="submit" className="text-white mt-4" disabled={isSubmitting}>
                {isSubmitting ? "Logging..." : "Log in"}
              </button>
          </div>
        </Form>
        )}
      </Formik>
    </div>
    </div>,document.body
  );
}
