import { Suspense, lazy } from "react"

export default function AppRoute() {

  const HomePage = lazy(()=> import('../'));
  const NotFoundPage = lazy(()=> import('../'));
  return (
    <>
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route></Route>
                <Route></Route>
                <Route path="/*" element={NotFoundPage}></Route>
            </Routes>
        </Suspense>
    </>
  )
}
