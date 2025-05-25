import './App.css'
import AppRoute from './routers/AppRoute'
import Register from './components/RegisterModal/Register'
import Login from './components/LoginModal/Login'
import HomePage from './pages/HomePage'
import ReadFirebase from './components/ReadFirebase/ReadFirebase'


function App() {

  return (
    <>
      {/**<AppRoute/>   <HomePage/>    <Register></Register>    <Login></Login> */}
      <ReadFirebase></ReadFirebase>

    </>
  )
}

export default App
