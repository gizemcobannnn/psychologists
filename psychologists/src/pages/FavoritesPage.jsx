import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setFavorites } from "../redux/data/dataSlice";

export default function FavoritesPage() {
  const favoritePsychologists= useSelector(state=>state.psychologists.favorites || []);
  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(setFavorites)
  },[favoritePsychologists])
  return (
    <div className="flex flex-col gap-5">
      {favoritePsychologists.length>0 ? (<ul>{favoritePsychologists.map((favorite,index)=>(
        <li key={index}>
          {favorite}
        </li>
      ))}</ul>):(
        <div className="flex m-auto mt-30">
          <p>You do not have favorite psychologist, to find please visit Psychologists Page !</p>
        </div>
      )}
      
        
    </div>
  )
}
