import { createPortal } from "react-dom";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { useId, useState } from "react";
import { BiX } from "react-icons/bi";
import * as Yup from "yup";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Appointment({ closeModal, psychologist }) {
  const commentId = useId();
  const emailId = useId();
  const clockId = useId();
  const phoneId = useId();
  const nameId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const TimePickerField = ({ field, form, ...props }) => {
    const [selectedTime, setSelectedTime] = useState(
      field.value ? new Date(`1970-01-01T${field.value}:00`) : null
    );

    const handleTimeChange = (time) => {
      setSelectedTime(time);
      if (time) {
        const timeString = time.toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        form.setFieldValue(field.name, timeString);
      } else {
        form.setFieldValue(field.name, "");
      }
    };

    return (
      <DatePicker 
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Meeting time"
        dateFormat="HH:mm"
        placeholderText="00:00"
        className="formInputs"
        minTime={new Date().setHours(9, 0, 0, 0)}
        maxTime={new Date().setHours(18, 0, 0, 0)}
      />

    );
  };

  const handleSubmit = (values, actions) => {
    console.log("Form values:", values);
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
    phone: Yup.string()
      .min(9, "Phone must be at least 9 characters")
      .max(12, "Phone must be at most 12 characters")
      .required("Phone is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    clock: Yup.string()
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)")
      .required("Time is required"),
    comment: Yup.string()
      .max(256, "Comment can be at most 256 characters")
      .notRequired(),
  });

  return createPortal(
    <div className="fixed z-50 flex justify-center items-center inset-0 bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-start justify-center bg-white p-10 w-[300px] md:w-[500px] rounded-lg">
        <div className="text flex flex-col gap-3">
          <div className="flex flex-row justify-between items-start">
            <h2 className="text-3xl">
              Make an appointment with a psychologist
            </h2>
            <button 
              type="button"
              className="exit ml-4"
              onClick={closeModal}
            >
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
            alt={psychologist.name}
            className="w-20 h-20 rounded-sm object-cover"
          />
          <div>
            <p className="text-gray-600 text-[14px]">Your psychologist</p>
            <p className="font-semibold">{psychologist.name}</p>
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
                    <ErrorMessage 
                      className="errorMessages" 
                      component="span" 
                      name="name" 
                    />
                  </div>
                  
                  <div className="flex flex-row w-full gap-3">
                    <div className="flex flex-col gap-2 flex-1">
                      <Field
                        placeholder="Phone"
                        name="phone"
                        id={phoneId}
                        type="tel"
                        className="formInputs"
                      />
                      <ErrorMessage 
                        name="phone" 
                        component="span" 
                        className="errorMessages" 
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2 flex-1">
                      <Field
                        name="clock"
                        id={clockId}
                        component={TimePickerField}
                        className="bg-white"
                      />
                      <ErrorMessage 
                        name="clock" 
                        component="span" 
                        className="errorMessages" 
                      />
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
                    <ErrorMessage 
                      name="email" 
                      component="span" 
                      className="errorMessages" 
                    />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Field
                      placeholder="Comment (Optional)"
                      name="comment"
                      id={commentId}
                      as="textarea"
                      rows="3"
                      className="formInputs resize-none"
                    />
                    <ErrorMessage 
                      name="comment" 
                      component="span" 
                      className="errorMessages" 
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-primary text-white py-2 px-4 rounded disabled:opacity-50" 
                    disabled={isSubmitting}
                  >
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