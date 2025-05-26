import { Suspense,  } from "react"
import PsychologistPage from "../pages/PsychologistPage"
//lazy
export default function AppRoute() {

  //const HomePage = lazy(()=> import('../'));
  //const NotFoundPage = lazy(()=> import('../'));
  return (
    <>
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route></Route>
                <Route path='/psychologists' element={<PsychologistPage/>}></Route>
                <Route path="/*" element={<NotFoundPage/>}></Route>
            </Routes>
        </Suspense>
    </>
  )
}
