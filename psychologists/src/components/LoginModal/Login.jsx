import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';

export default function Login() {

  const emailId = useId();
  const passwordId = useId();
  
  const loginValidate = Yup.object().shape({
    email: Yup.string().email().required("Required"),
    password: Yup.string().min(9,"Password must be at least 9 characters.").max(18,"Password must be less than 18 characters.").required("Required"),
  });
  const handleLogin = () =>{

  }
  
  return (
    <div className="authForm">
      <Formik
        initialValues={{email:"",password:""}}
        validate={loginValidate}
        onSubmit={handleLogin}
        >
            <Form>
                        <div className="fields">
          <Field
            name="email"
            placeholder="Email*"
            id={emailId}
            type="email"
            className="formField"
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
            placeholder="Password*"
            id={passwordId}
            type="password"
            className="formField"
          ></Field>
          <ErrorMessage
            name="password"
            component="span"
            className="errorMessages"
          ></ErrorMessage>
        </div>
            </Form>
      </Formik>
    </div>
  );
}
