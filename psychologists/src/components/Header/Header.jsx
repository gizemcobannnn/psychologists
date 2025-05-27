import {NavLink} from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center p-5 border-b border-slate-300 bg-[#FBFBFB]">
        <div><span className='text-green-600'>psychologists.</span>services</div>
        <nav className='flex flex-row gap-6'>
            <NavLink to="/" className="text-black ">Home</NavLink>
            <NavLink to="/psychologists" className="text-black ">Psychologists</NavLink>
            <NavLink to="/favorites" className="text-black">Favorites</NavLink>
        </nav>
        <div className='flex flex-row gap-6 items-center'>
          <div className="flex flex-row gap-2 items-center">
            <IoPersonSharp  className='text-2xl bg-green-600 text-white p-1 rounded-lg w-7 h-7'/>
            <p>name</p>
        </div>
        <button>Log in</button>
        <button>Sign up</button>
        <button className='!bg-transparent w-40 !border-gray-500'>Log out</button>
        </div>
    </header>
  )
}
