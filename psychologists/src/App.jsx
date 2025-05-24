import './App.css'
import AppRoute from './routers/AppRoute'
import Register from './components/RegisterModal/Register'
import Login from './components/LoginModal/Login'
function App() {

  return (
    <>
      {/**<AppRoute/> */}
      <Register></Register>
      <Login></Login>
    </>
  )
}

export default App
