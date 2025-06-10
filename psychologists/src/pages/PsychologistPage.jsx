import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { fetchPsychologists } from "../redux/data/dataOps";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "../components/Appointment/Appointment";
import Filter from "../components/Filter/Filter";
import Psychologists from "../components/Psychologists/Psychologists";
import { toast } from "react-toastify";
export default function PsychologistPage() {

  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);


  const psychologists = useSelector(
    (state) => state.psychologists.psychologists
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchDataPsychologists = async () => {
      try {
        await dispatch(fetchPsychologists()).unwrap();
      } catch (e) {
        toast("Error fetching psychologists data:", e);
      }
    };
    fetchDataPsychologists();
  }, [dispatch]);

  useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === "Escape") setIsAppointmentOpen(false);
  };

  if (isAppointmentOpen) {
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
  }

  return () => {
    document.removeEventListener("keydown", handleEscape);
    document.body.style.overflow = "unset";
  };
}, [isAppointmentOpen]);


  return (
    <>
    <div className="flex flex-col gap-5 w-full pl-10 pr-10 md:pl-30 lg:p-20 md:pr-30  ">
      <Filter></Filter>
      <Psychologists psychologists={psychologists}></Psychologists>
    </div>
      {isAppointmentOpen && (
        <Appointment
          closeModal={() => setIsAppointmentOpen(false)}
          psychologist={selectedPsychologist}
        ></Appointment>
      )}
      </>
  );
}
