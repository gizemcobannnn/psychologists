import { Suspense, lazy } from "react"
import PsychologistPage from "../pages/PsychologistPage"
import { Routes, Route } from "react-router-dom";
//<Route path="/favorites" element={<FavoritesPage/>}></Route>

export default function AppRoute() {

  const HomePage = lazy(()=> import('../pages/HomePage'));
  const PsychologistsPage = lazy(()=>import('../pages/PsychologistPage'))
  const NotFoundPage = lazy(()=> import('../pages/NotFoundPage'));
  
  return (
    <>
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path='/psychologists' element={<PsychologistsPage/>}></Route>
                <Route></Route>
                <Route path="/*" element={<NotFoundPage/>}></Route>
            </Routes>
        </Suspense>
    </>
  )
}
