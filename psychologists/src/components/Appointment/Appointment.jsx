import { createPortal } from "react-dom"
import { Field, Formik ,Form, ErrorMessage} from "formik"
import { useId } from "react";

export default function Appointment() {
  const commentId = useId();
  const emailId = useId();
  const clockId = useId();
  const phoneId = useId();
  const nameId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values)
    actions.setSubmitting(false);
  }

  return createPortal(
    <div className="z-50 fixed justify-center items-center inset-0 bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-start justify-center bg-white p-10 w-[300px] md:w-[500px]">
        <div className="text flex flex-col gap-3">
          <h2 className="text-3xl">Make an appointment with a psychologist</h2>
          <p className="text-gray-600">You are on the verge of changing your life for the better. Fill out the short form below to book your personal appointment with a professional psychologist. We guarantee confidentiality and respect for your privacy.</p>
        </div>
        <div className="flex flex-row gap-2 mt-4">
          img
          <div>
            <p className="text-gray-600">Your psychologist</p>
            <p>name</p>
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
          >
            {({ isSubmitting }) => (
              <Form className="w-full">
                <div className="flex flex-col gap-5 mt-4">
                  <div className="flex flex-col gap-5">
                    <Field
                      type="text"
                      name="name"
                      id={nameId}
                      className="formInputs"
                      placeholder="Name"
                    />
                    <ErrorMessage name="name" />
                  </div>
                  <div className="flex flex-row w-full gap-3">
                    <Field
                      placeholder="Phone"
                      name="phone"
                      id={phoneId}
                      type="tel"
                      className="formInputs"
                    />
                    <Field
                      placeholder="00:00"
                      name="clock"
                      id={clockId}
                      type="time"
                      className="formInputs"
                    />
                  </div>
                  <div>
                    <Field
                      placeholder="Email"
                      name="email"
                      id={emailId}
                      type="email"
                      className="formInputs"
                    />
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
                  <button>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>, document.body
  );
}