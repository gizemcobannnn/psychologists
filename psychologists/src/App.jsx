import './App.css'
import AppRoute from './routers/AppRoute'
import Register from './components/RegisterModal/Register'
import Login from './components/LoginModal/Login'
import HomePage from './pages/HomePage'
import ReadFirebase from './components/ReadFirebase/ReadFirebase'
import PsychologistPage from './pages/PsychologistPage'
import Header from './components/Header/Header'
import Appointment from './components/Appointment/Appointment'

function App() {

  return (
    <>
      {/**<AppRoute/>   <HomePage/>    <Register></Register>    <Login></Login> */}
      {/** <ReadFirebase></ReadFirebase> */}
      {/** <PsychologistPage></PsychologistPage> */}
      {<Header></Header>}
      <Appointment></Appointment>
      <AppRoute></AppRoute>


    </>
  )
}

export default App
