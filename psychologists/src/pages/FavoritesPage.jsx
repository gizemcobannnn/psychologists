import { useSelector } from "react-redux";
import Psychologists from "../components/Psychologists/Psychologists";
import Filter from "../components/Filter/Filter";

export default function FavoritesPage() {
  const favoritePsychologists = useSelector(
    (state) => state.psychologists.favorites || []
  );
  const allPsychologists = useSelector(
    (state) => state.psychologists.psychologists
  );
  const isLoggedIn = useSelector((state) => state.psychologists.isLoggedIn);

  // Favori psikologların tüm bilgilerini bul
  const dataOfFavorites = allPsychologists.filter((psychologist) =>
    favoritePsychologists.includes(psychologist.name)
  );

  return (
    <div className="flex flex-col gap-5 w-full pl-10 pr-10 md:pl-30 lg:p-0 md:pr-30">
      {isLoggedIn ? (
        <>
          <Filter />

          {dataOfFavorites.length > 0 ? (
            <Psychologists psychologists={dataOfFavorites} />
          ) : (
            <div className="flex m-auto mt-30">
              <p>
                You do not have any favorite psychologist yet. To find one,
                please visit the Psychologists page!
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-lg mt-30 text-primary">
          Please log in and visit the Psychologists page!
        </p>
      )}
    </div>
  );
}
