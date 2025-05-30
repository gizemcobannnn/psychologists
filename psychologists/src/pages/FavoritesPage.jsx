import { useSelector } from "react-redux";
import Psychologists from "../components/Psychologists/Psychologists";
import Filter from "../components/Filter/Filter";
export default function FavoritesPage() {
  const favoritePsychologists = useSelector(
    (state) => state.psychologists.favorites || []
  );

  const allPsychologist = useSelector(state=>state.psychologists.psychologists);

  const dataOfFavorites = allPsychologist.filter(feature =>favoritePsychologists.includes(feature.name));

  return (
    <div className="flex flex-col gap-5">
      <Filter></Filter>
      {favoritePsychologists.length > 0 ? (
        <Psychologists psychologists={dataOfFavorites}></Psychologists>
      ) : (
        <div className="flex m-auto mt-30">
          <p>
            You do not have favorite psychologist, to find please visit
            Psychologists Page!
          </p>
        </div>
      )}
    </div>
  );
}
