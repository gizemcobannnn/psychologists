import { Suspense,  } from "react"
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
                <Route></Route>
                <Route path="/*" element={<NotFoundPage/>}></Route>
            </Routes>
        </Suspense>
    </>
  )
}
