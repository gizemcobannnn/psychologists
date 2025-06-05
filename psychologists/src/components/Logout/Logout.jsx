import { createPortal } from "react-dom"
import { getAuth, signOut } from "firebase/auth";
import app from '../../firebaseConfig'
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import {setIsLoggedOut} from "../../redux/data/dataSlice"
import {toast} from 'react-toastify';
export default function Logout({closeModal}) {
  const dispatch = useDispatch();
  const handleLogout = async (values, actions) => {
    const auth = getAuth(app);
    
    try {
      await signOut(auth);
      closeModal(); // Close the modal after logout
      dispatch(setIsLoggedOut(true));
      toast("Logged out...")
    } catch (error) {
      dispatch(setIsLoggedOut(false));
      toast(error.message);
    } finally {
      actions.setSubmitting(false);
      dispatch(setIsLoggedOut(true));

    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col gap-5 bg-white p-15 rounded-2xl">
        <Formik onSubmit={handleLogout} initialValues={{}}>
          {({ isSubmitting }) => (
            <Form>
              <div>
                <p className="text-center mb-2 font-semibold">Are you sure ?</p>
              </div>
              <div className="flex flex-row gap-5">
                <button type="submit" className="text-primary text-xl">
                  {isSubmitting ? "Logging out" : "Log out"}
                </button>
                <button type="button" className="authbtn text-primary text-xl flex" onClick={closeModal}>
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
