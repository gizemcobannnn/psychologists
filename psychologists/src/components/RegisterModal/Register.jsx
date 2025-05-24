import { ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from 'yup';

export default function Register() {
  
  const nameId = useId();
  const emailId = useId();
  const passId = useId();
  const registerSchema = Yup.object().shape({
    name: Yup.string().min(3,"Name must be at least 3 characters.").max().required("Required field"),
    email: Yup.string().email("Invalid email address.").required("Required field"),
    password: Yup.string().min(9,"Password must be at least 9 characters.").max(18,"Password must be less than 18 characters.").required("Required field"),
  });

  const handleSubmit = () =>{

  }

  return (
    <div className="authForm">
        <Formik
            initialValues={{name:'',email:'',password:''}}
            validation={registerSchema}
            onSubmit={handleSubmit}>
            <div>
                <Field
                    name="name"
                    placeholder="Name*"
                    type="text"
                    id={nameId}></Field>
                <ErrorMessage
                    name="name"
                    component="span"
                    className="errorMessages">
                </ErrorMessage>
            </div>
            <div>
                <Field
                    name="email"
                    id={emailId}
                    placeholder="Email*"
                    type="email"></Field>
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
                    ></Field>
                <ErrorMessage
                    name="password"
                    component="span"
                    className="errorMessages">
                </ErrorMessage>
            </div>
        </Formik>
    </div>
  )
}
