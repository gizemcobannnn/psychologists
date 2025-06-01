import { NavLink } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import Register from '../RegisterModal/Register';
import Login from '../LoginModal/Login';
import Logout from '../Logout/Logout';
import { useSelector } from 'react-redux';

export default function Header() {
    const [isRegModelOpen, setIsRegModelOpen] = useState(false);
    const [isLogModelOpen, setIsLogModelOpen] = useState(false);
    const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false); // Fixed capitalization
    const loggedInUser = useSelector(state=>state.psychologists.loggedInUser);
    const isLoggedIn= useSelector(state=>state.psychologists.isLoggedIn);
    const isLoggedOut = useSelector(state=>state.psychologists.isLoggedOut);
    const [selectedColor, setSelectedColor]=useState("--color-orange")

  const changeTheme = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--text-primary', color);
    localStorage.setItem("primary-color", JSON.stringify(color));
    setSelectedColor(color);
    console.log(selectedColor)
  };

  useEffect(() => {
    const color = JSON.parse(localStorage.getItem("primary-color")) || "#FC832C";
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--text-primary', color);
    setSelectedColor(color);
  }, []);

    
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setIsRegModelOpen(false);
                setIsLogModelOpen(false);
                setIsLogoutModelOpen(false); // Fixed capitalization
            }
        };

        if (isRegModelOpen || isLogModelOpen || isLogoutModelOpen) {
            document.addEventListener("keydown", handleEscape);
            if (document.body) {
                document.body.style.overflow = 'hidden';
            }
        }


        return () => {
            document.removeEventListener("keydown", handleEscape);
            if (document.body) {
                document.body.style.overflow = 'unset';
            }
        }
    }, [isRegModelOpen, isLogModelOpen, isLogoutModelOpen]);

    return (
      <>
        <header className="flex flex-row justify-between items-center p-5 border-b border-slate-300 bg-[#FBFBFB]">
          <div>
            <span className="text-primary">psychologists.</span>services
          </div>
          <nav className="flex flex-row gap-6">
            <NavLink to="/" className="text-black">
              Home
            </NavLink>
            <NavLink to="/psychologists" className="text-black">
              Psychologists
            </NavLink>
            <NavLink to="/favorites" className="text-black">
              Favorites
            </NavLink>
          </nav>
          <div className="flex flex-row gap-6 items-center">
            <div className="flex flex-row gap-2 items-center">
              {!isLoggedOut && (<>
                <IoPersonSharp className="text-2xl bg-primary text-white p-1 rounded-lg w-7 h-7" />
                <p className="text-black">{loggedInUser}</p>
              </>)}
            </div>
            {!isLoggedIn  &&  (
              <button
                onClick={() => setIsLogModelOpen(true)}
                className="authbtn"
              >
                Log in
              </button>
            )}

            {!isLoggedIn &&  (
              <button onClick={() => setIsRegModelOpen(true)} className="authbtn">
              Sign up
                </button>
            )}

            {isLoggedIn && !isLoggedOut && (
            <button
              className="authbtn"
              onClick={() => setIsLogoutModelOpen(true)}
            >
              Log out
            </button>
            )}

          </div>
          <div className='flex flex-row gap-1'>
            <div className='bg-[#FC832C] h-3 w-3 rounded-lg cursor-pointer' onClick={()=>changeTheme("#FC832C")}></div>
            <div className='bg-[#3470FF] h-3 w-3 rounded-lg cursor-pointer' onClick={()=>changeTheme("#3470FF")}></div>
            <div className='bg-[#54BE96] h-3 w-3 rounded-lg cursor-pointer' onClick={()=>changeTheme("#54BE96")}></div>
          </div>
        </header>
        {isRegModelOpen && (
          <Register closeModal={() => setIsRegModelOpen(false)} />
        )}
        {isLogModelOpen && (
          <Login closeModal={() => setIsLogModelOpen(false)} />
        )}
        {isLogoutModelOpen && (
          <Logout closeModal={() => setIsLogoutModelOpen(false)} />
        )}
      </>
    );
}