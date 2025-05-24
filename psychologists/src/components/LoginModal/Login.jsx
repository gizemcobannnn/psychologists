import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useId } from 'react';
export default function Login() {
    
  const emailId = useId();
  const passwordId = useId();

  return (
    <div className="authForm">
      <Formik>
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
      </Formik>
    </div>
  );
}
