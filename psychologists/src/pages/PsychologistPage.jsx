import { useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { fetchPsychologists } from "../redux/data/dataOps";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "../redux/data/dataSlice";
import Appointment from "../components/Appointment/Appointment";
import Filter from "../components/Filter/Filter";

export default function PsychologistPage() {
  const [visibleItems, setVisibleItems] = useState(5);
  const [expandedItems, setExpandedItems] = useState([]);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  const favoritePsychologists = useSelector(
    (state) => state.psychologists.favorites
  );
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
  const loadMore = () => {
    setVisibleItems((prev) => prev + 5);
  };
  const handleFavorite = (name) => {
    dispatch(setFavorites(name));
  };

  const toggleExpand = (index) => {
    setExpandedItems((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((item) => item !== index)
        : [...prevExpanded, index]
    );
  };

  return (
    <>
    <div className="flex flex-col gap-5 w-screen">
      <Filter/>
      <div id="psyc karts" className="flex flex-col bg-[#FBFBFB]">
        <ul>
          {psychologists.slice(0, visibleItems).map((item, index) => (
            <li
              key={index}
              className="flex flex-row gap-8 p-5 border-b border-slate-300"
            >
              <div className="flex flex-col w-[400px] border border-slate-400 rounded-lg p-3 h-min">
                <img
                  src={item.avatar_url}
                  alt="avatar"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between gap-20">
                  <div className="flex flex-col items-start">
                    <p className="text-slate-500 text-sm">Psychologist</p>
                    <p className="text-black text-2xl font-semibold">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <p className="text-black font-semibold">
                      Rating: {item.rating}{" "}
                    </p>
                    <p className="text-black font-semibold">
                      Price / 1 hour:{" "}
                      <span className="text-green-500">
                        {item.price_per_hour}$
                      </span>
                    </p>
                    {favoritePsychologists.includes(item.name) ? (
                      <MdFavorite
                        className="text-2xl text-amber-300"
                        onClick={() => {
                          handleFavorite(item.name);
                        }}
                      ></MdFavorite>
                    ) : (
                      <MdFavoriteBorder
                        className="text-2xl text-gray-800"
                        onClick={() => {
                          handleFavorite(item.name);
                        }}
                      ></MdFavoriteBorder>
                    )}
                  </div>
                </div>
                <div className="flex flex-row flex-wrap gap-2 mt-5 mb-5">
                  {item.experience && (
                    <div className="bg-[#F3F3F3] text-gray-600 font-semibold rounded-xl p-2">
                      Experience:{" "}
                      <span className="text-black">{item.experience}</span>
                    </div>
                  )}
                  {item.license && (
                    <div className="bg-[#F3F3F3] text-gray-600 font-semibold rounded-xl p-2">
                      License:{" "}
                      <span className="text-black">{item.license}</span>
                    </div>
                  )}
                  {item.specialization && (
                    <div className="bg-[#F3F3F3] text-gray-600 font-semibold rounded-xl p-2">
                      Specialization:{" "}
                      <span className="text-black">{item.specialization}</span>
                    </div>
                  )}
                  {item.initial_consultation && (
                    <div className="bg-[#F3F3F3] text-gray-600 font-semibold rounded-xl p-2">
                      Initial Consultation:{" "}
                      <span className="text-black">
                        {item.initial_consultation}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-justify">{item.about}</p>
                <button
                  className="morebutton p-0"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedItems.includes(index) ? "Hide" : "Read more"}
                </button>
                {expandedItems.includes(index) && item.reviews && (
                  <>
                    <ul className="flex flex-col">
                      {item.reviews.map((it, index) => (
                        <li key={index}>
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-row gap-5 mt-3">
                              <div className="bg-green-200 rounded-xl border-none w-9 h-9 flex justify-center items-center">
                                <p className="text-green-600">
                                  {it.reviewer.charAt(0)}
                                </p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <p className="text-black font-medium">
                                  {it.reviewer}
                                </p>
                                <p>{it.rating}</p>
                              </div>
                            </div>
                            <p className="text-gray-600">{it.comment}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="mt-5 w-60"
                      onClick={() => {setIsAppointmentOpen(true); setSelectedPsychologist(item)}}
                    >
                      Make an appointment
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <button className="w-30 text-white self-center mt-3" onClick={loadMore}>
          Load More
        </button>
      </div>
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
