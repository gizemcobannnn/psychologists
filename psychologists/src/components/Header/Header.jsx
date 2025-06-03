import { NavLink } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";
import { useEffect, useState } from 'react';
import Register from '../RegisterModal/Register';
import Login from '../LoginModal/Login';
import Logout from '../Logout/Logout';
import { useSelector } from 'react-redux';
import { IoMenu, IoClose } from "react-icons/io5";


export default function Header() {
    const [isRegModelOpen, setIsRegModelOpen] = useState(false);
    const [isLogModelOpen, setIsLogModelOpen] = useState(false);
    const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false); // Fixed capitalization
    const loggedInUser = useSelector(state=>state.psychologists.loggedInUser);
    const isLoggedIn= useSelector(state=>state.psychologists.isLoggedIn);
    const [selectedColor, setSelectedColor]=useState("--color-orange")
    const [isMenuOpen, setIsMenuOpen]=useState(false);

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
        <header className="flex flex-row justify-between items-center min-w-[570px] pr-5 pt-2 pb-2 border-b border-slate-300 bg-[#FBFBFB]">
          <div>
            <span className="text-primary">psychologists.</span>services
          </div>
          <nav className="hidden md:flex md:flex-row md:gap-6">
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

          <button className='text-2xl text-primary md:hidden' onClick={()=>setIsMenuOpen(true)}>
            <IoMenu />
          </button>

          {/** Side menu */}
      <div
        className={`fixed top-0 right-0 w-70 h-47 bg-white shadow-lg z-50 p-5 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} className="text-primary text-2xl">
            <IoClose />
          </button>
        </div>
        <nav className="flex flex-col gap-3">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/psychologists" onClick={() => setIsMenuOpen(false)}>Psychologists</NavLink>
          <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>Favorites</NavLink>
        </nav>
      </div>

          <div className="hidden md:flex flex-row gap-6 items-center">
            <div className="flex flex-row gap-2 items-center">
              {isLoggedIn && loggedInUser &&(<>
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

            {isLoggedIn  && (
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