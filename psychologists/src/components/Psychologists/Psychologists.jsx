/* eslint-disable no-unused-vars */
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { setFavorites } from "../../redux/data/dataSlice";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import Appointment from "../Appointment/Appointment";
import Fallback from "../Fallback/Fallback";
export default function Psychologists({psychologists}) {
  const [visibleItems, setVisibleItems] = useState(5);
  const [expandedItems, setExpandedItems] = useState([]);
  const favoritePsychologists = useSelector(
    (state) => state.psychologists.favorites || []
  );
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(
  JSON.parse(localStorage.getItem("selectedFilter"))
);


  const loading = useSelector((state) => state.psychologists.loading);
  const dispatch = useDispatch();

    const loadMore = () => {
      setVisibleItems((prev) => prev + 5);
    };
    const handleFavorite = (name) => {
      dispatch(setFavorites(name));
    };
    useEffect(() => {
      const interval = setInterval(() => {
        setSelectedFilter(JSON.parse(localStorage.getItem("selectedFilter")));
      }, 500); // 500ms de bir kontrol et

      return () => clearInterval(interval);
    }, []);
  
    const toggleExpand = (index) => {
      setExpandedItems((prevExpanded) =>
        prevExpanded.includes(index)
          ? prevExpanded.filter((item) => item !== index)
          : [...prevExpanded, index]
      );
    };
const filteredPsychologists = useMemo(() => {
  let result = [...psychologists];

  if (selectedFilter === "A to Z") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedFilter === "Z to A") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  } else if (selectedFilter === "Less than $10") {
    result = result.filter((x) => x.price_per_hour < 10);
  } else if (selectedFilter === "Greater than $10") {
    result = result.filter((x) => x.price_per_hour > 10);
  } else if (selectedFilter === "Popular") {
    result = result.filter((a) => a.rating > 4.5);
  } else if (selectedFilter === "Not Popular") {
    result = result.filter((a) => a.rating < 4.5);
  }

  return result;
}, [psychologists, selectedFilter]);
    
  return (
    <>
    <div id="psyc karts" className="flex flex-col w-full bg-[#FBFBFB]">
      {loading && <Fallback />}
        <ul className="w-full flex flex-col">
          {filteredPsychologists.length>0 ? (filteredPsychologists.slice(0, visibleItems).map((item, index) => (
            <li
              key={index}
              className="flex flex-row gap-8 p-5 border-b border-slate-300"
            >
              <div className="flex flex-col min-w-[150px] md:w-[400px] border border-slate-400 rounded-lg p-3 h-min">
                <img
                  src={item.avatar_url}
                  alt="avatar"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-col pr-5">
                <div className="flex flex-row justify-between gap-20">
                  <div className="flex flex-col items-start">
                    <p className="text-slate-500 text-sm">Psychologist</p>
                    <p className="text-black text-2xl font-semibold">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 md:flex-row  md:gap-2">
                  <div className="flex flex-row gap-3  min-w-[120px]">
                      <FaStar className="text-xl" style={{color:"#facc15" }} />
                    <p className="text-black font-semibold">
                      Rating: {item.rating}{" "}
                    </p>
                  </div>
                  <div className="flex flex-row min-w-[150px]">
                    <p className="text-black font-semibold">
                      Price / 1 hour:{" "}
                      <span className="text-green-500">
                        {item.price_per_hour}$
                      </span>
                    </p>
                     </div>
                    {favoritePsychologists.includes(item.name) ? (
                      <MdFavorite
                        className="text-2xl text-primary self-center md:self-baseline"
                        onClick={() => {
                          handleFavorite(item.name);
                        }}
                      ></MdFavorite>
                    ) : (
                      <MdFavoriteBorder
                        className="text-2xl text-primary"
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
                  className="morebutton p-0 mt-2"
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
                              <div className="bg-slate-200 rounded-4xl p-4 border-none w-9 h-9 flex justify-center items-center">
                                <p className="text-primary">
                                  {it.reviewer.charAt(0)}
                                </p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <p className="text-black font-medium">
                                  {it.reviewer}
                                </p>
                                <div className="flex flex-row gap-2">
                                  <FaStar className="text-xl" style={{color:"#facc15" }} />
                                  <p>{it.rating}</p>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600">{it.comment}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="mt-5 w-60 bg-primary"
                      onClick={() => {setIsAppointmentOpen(true); setSelectedPsychologist(item)}}
                    >
                      Make an appointment
                    </button>
                  </>
                )}
              </div>
            </li>
          ))):
            (<p className="text-2xl text-center">No Result</p>
            )
            }
        </ul>
        {filteredPsychologists.length > visibleItems && (
        <button className="w-30 text-white bg-primary flex items-center self-center mt-3 mb-3" onClick={loadMore}>
          Load More
        </button>
        )}
      </div>
      {isAppointmentOpen && <Appointment closeModal={()=>setIsAppointmentOpen(false)} psychologist={selectedPsychologist}/>}
</>
  )
}
