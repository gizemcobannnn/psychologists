import { createPortal } from "react-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useId, useState } from "react";
import { BiX } from "react-icons/bi";
import * as Yup from "yup";
import { toast } from "react-toastify";
export default function Appointment({ closeModal, psychologist }) {
  const commentId = useId();
  const emailId = useId();
  const clockId = useId();
  const phoneId = useId();
  const nameId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = (values, actions) => {
    setIsSubmitted(true);
    actions.setSubmitting(false);
    actions.resetForm();
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
    closeModal();
    toast.success("Your appointment has been created successfully!");
  };

  const validateForm = Yup.object().shape({
    name: Yup.string()
      .min(5, "Name must be at least 5 characters")
      .max(20, "Name must be at most 20 characters")
      .required("Name is required"),
    phone: Yup.string().min(9).max(12),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    clock: Yup.string()
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)")
      .required("Clock is required"),
    comment: Yup.string()
      .min(0)
      .max(256, "Comment can be at most 256 characters")
      .notRequired(),
  });

  return createPortal(
    <div className="fixed z-50 flex justify-center items-center inset-0 bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-start justify-center bg-white p-10 w-[300px] md:w-[500px]">
        <div className="text flex flex-col gap-3">
          <div className="flex flex-row justify-between ">
            <h2 className="text-3xl">
              Make an appointment with a psychologist
            </h2>
            <button className="exit" onClick={closeModal}>
              <BiX className="text-3xl" />
            </button>
          </div>
          <p className="text-gray-600">
            You are on the verge of changing your life for the better. Fill out
            the short form below to book your personal appointment with a
            professional psychologist. We guarantee confidentiality and respect
            for your privacy.
          </p>
        </div>
        <div className="flex flex-row gap-2 mt-4">
          <img
            src={psychologist.avatar_url}
            alt={psychologist.avatar_url}
            className="w-20 h-20 rounded-sm"
          />
          <div>
            <p className="text-gray-600 text-[14px]">Your psychologist</p>
            <p>{psychologist.name}</p>
          </div>
        </div>
        <div className="flex w-full">
          <Formik
            initialValues={{
              name: "",
              phone: "",
              clock: "",
              email: "",
              comment: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validateForm}
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                <div className="flex flex-col gap-5 mt-4">
                  <div className="flex flex-col gap-2">
                    <Field
                      type="text"
                      name="name"
                      id={nameId}
                      className="formInputs"
                      placeholder="Name"
                    />
                    <ErrorMessage className="errorMessages" component="span" name="name" />
                  </div>
                  <div className="flex flex-row w-full gap-3">
                    <div className="flex flex-col gap-2">
                      <Field
                        placeholder="Phone"
                        name="phone"
                        id={phoneId}
                        type="tel"
                        className="formInputs"
                      />
                      <ErrorMessage name="phone" component="span" className="errorMessages" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Field
                        placeholder="00:00"
                        name="clock"
                        id={clockId}
                        type="time"
                        className="formInputs"
                      />
                      <ErrorMessage name="clock" component="span" className="errorMessages" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Field
                      placeholder="Email"
                      name="email"
                      id={emailId}
                      type="email"
                      className="formInputs"
                    />
                    <ErrorMessage name="email" component="span" className="errorMessages" />
                  </div>
                  <div>
                    <Field
                      placeholder="Comment"
                      name="comment"
                      id={commentId}
                      type="text"
                      className="formInputs"
                    />
                  </div>
                  <button className="bg-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Send"}
                  </button>
                  {isSubmitted && (
                    <p className="text-primary ml-2 text-sm">
                      Your appointment has been created successfully!
                    </p>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>,
    document.body
  );
}
