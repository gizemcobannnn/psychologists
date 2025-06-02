import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { fetchPsychologists } from "../redux/data/dataOps";
import { useDispatch, useSelector } from "react-redux";
import Appointment from "../components/Appointment/Appointment";
import Filter from "../components/Filter/Filter";
import Psychologists from "../components/Psychologists/Psychologists";
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
        const psychologistsData = await dispatch(fetchPsychologists()).unwrap();
        console.log("Psychologists Data:", psychologistsData);
      } catch (e) {
        console.error("Error fetching psychologists data:", e);
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

  console.log("Psychologists:", psychologists);


  return (
    <>
    <div className="flex flex-col gap-5 w-full">
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
