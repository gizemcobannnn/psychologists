import { createPortal } from "react-dom"
import { getAuth, signOut } from "firebase/auth";
import app from '../../firebaseConfig'
import { Form, Formik } from "formik";
export default function Logout({closeModal}) {

  const handleLogout = async (values, actions) => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      console.log("Logout successful");
      closeModal(); // Close the modal after logout
    } catch (error) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col gap-5 bg-white p-15">
        <Formik onSubmit={handleLogout} initialValues={{}}>
          {({ isSubmitting }) => (
            <Form>
              <div>
                <p className="text-center mb-2 font-semibold">Are you sure ?</p>
              </div>
              <div className="flex flex-row gap-5">
                <button type="submit">
                  {isSubmitting ? "Logging out" : "Log out"}
                </button>
                <button type="button" className="authbtn" onClick={closeModal}>
                  Cancel
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
