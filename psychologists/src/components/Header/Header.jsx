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
    // eslint-disable-next-line no-unused-vars
    const [selectedColor, setSelectedColor]=useState("--color-orange")
    const [isMenuOpen, setIsMenuOpen]=useState(false);

  const changeTheme = (color) => {
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--text-primary', color);
    localStorage.setItem("primary-color", JSON.stringify(color));
    setSelectedColor(color);
    
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
        <header className="fixed top-0 left-0 w-full z-50 pl-10 md:pl-32 flex flex-row flex-nowrap justify-between items-center x-auto  pr-5 pt-3 pb-3 border-b border-slate-300 bg-[#FBFBFB]">
          <div className="flex items-start">
            <span className="text-primary flex flex-row">psychologists.</span>services
            <div className="flex flex-row gap-1 flex-shrink min-w-0 fixed left-8 top-7">
              <div
                className="bg-[#FC832C] h-3 w-3 rounded-lg cursor-pointer"
                onClick={() => changeTheme("#FC832C")}
              ></div>
              <div
                className="bg-[#3470FF] h-3 w-3 rounded-lg cursor-pointer"
                onClick={() => changeTheme("#3470FF")}
              ></div>
              <div
                className="bg-[#54BE96] h-3 w-3 rounded-lg cursor-pointer"
                onClick={() => changeTheme("#54BE96")}
              ></div>
            </div>
          </div>
          <nav className="hidden ml-4 mr-4 md:flex md:flex-row md:gap-6 lg:mr-30 lg:ml-30 flex-shrink min-w-0">
            <NavLink to="/" className="text-black">
              Home
            </NavLink>
            <NavLink to="/psychologists" className="text-black">
              Psychologists
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/favorites" className="text-black">
                Favorites
              </NavLink>
            )}
          </nav>

          <button
            className="text-2xl text-primary pr-0 md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <IoMenu />
          </button>

          {/** Side menu */}
          <div
            className={`fixed top-0 right-0 w-70 h-70 bg-white shadow-lg z-50 p-5 transform ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-primary">Menu</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-primary text-2xl"
              >
                <IoClose />
              </button>
            </div>
            <nav className="flex flex-col gap-3 flex-shrink min-w-0">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/psychologists" onClick={() => setIsMenuOpen(false)}>
                Psychologists
              </NavLink>
              <NavLink to="/favorites" onClick={() => setIsMenuOpen(false)}>
                Favorites
              </NavLink>
            </nav>
            {!isLoggedIn && (
              <div className="flex flex-col items-start ">
                <button
                  onClick={() => setIsLogModelOpen(true)}
                  className="text-primary menuButton"
                >
                  Log in
                </button>
                <button
                  onClick={() => setIsRegModelOpen(true)}
                  className="text-primary menuButton"
                >
                  Sign up
                </button>
              </div>
            )}
            {isLoggedIn && (
              <button
                className="text-primary menuButton"
                onClick={() => setIsLogoutModelOpen(true)}
              >
                Log out
              </button>
            )}
          </div>

          <div className="hidden md:flex flex-row gap-6 items-center flex-shrink min-w-0">
            <div className="flex flex-row gap-2 items-center">
              {isLoggedIn && loggedInUser && (
                <>
                  <IoPersonSharp className="text-2xl bg-primary text-white p-1 rounded-lg w-7 h-7" />
                  <p className="text-black text-[10px] md:text-[15px]">
                    {loggedInUser}
                  </p>
                </>
              )}
            </div>
            {!isLoggedIn && (
              <button
                onClick={() => setIsLogModelOpen(true)}
                className="authbtn w-[110px] text-[10px] md:text-[15px] min-w-[110px]"
              >
                Log in
              </button>
            )}

            {!isLoggedIn && (
              <button
                onClick={() => setIsRegModelOpen(true)}
                className="w-[150px] text-white bg-primary text-[10px] md:text-[15px] min-w-[150px]"
              >
                Registration
              </button>
            )}

            {isLoggedIn && (
              <button
                className="authbtn text-[10px] md:text-[15px] min-w-[100px]"
                onClick={() => setIsLogoutModelOpen(true)}
              >
                Log out
              </button>
            )}
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