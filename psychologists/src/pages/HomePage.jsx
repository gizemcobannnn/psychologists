import mainPhoto from '../assets/mainperson.png'
import questionmark from '../assets/fa6-solid_question.svg'
import users from '../assets/mdi_users.svg'
import Register from '../components/RegisterModal/Register';
import { useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row flex-wrap w-full gap-20 justify-around items-center m-auto p-4">
        <div className="left flex flex-col w-[600px]  gap-8 justify-center items-start mt-15">
            <h1 className="text-7xl font-bold text-left text-black">The road to the <span className="text-primary italic">depths</span> of the human soul</h1>
            <p className="text-xl text-justify w-[450px] ">We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
            <button className="bg-primary text-white  p-12 w-45 text-[20px]" onClick={()=>{navigate("/psychologists")}}>Get started <span className="text-xl">↗</span></button>
        </div>
        <div className="md:top-20 md:right-40 relative min-w-[400px] md:w-[500px] h-[500px] ">
            <img src={mainPhoto} alt="main photo"  className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <img src={questionmark} alt="questionmark" className="w-8 h-8 p-2 absolute top-60 -left-3 md:top-50 md:-left-1 bg-[#54BE96] rounded-lg rotate-[-15deg]" />
            <img src={users} alt="users" className="w-8 h-8 p-1 absolute top-20 -right-4 md:top-0 md:-right-1 bg-amber-300 rounded-lg text-purple-700 rotate-[15deg]" />
            <div className='flex justify-center items-center flex-row p-3 gap-3 bg-primary absolute bottom-14 -left-12  md:bottom-8 md:-left-20 rounded-xl'>
              <div className='bg-white w-8 h-8 flex justify-center items-center rounded-xl'>
                <MdDone className='text-primary text-2xl' />
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-white/50 text-[12px] '>Experienced psychologists</p>
                <p className='text-white'>15,000</p>
              </div>
              
            </div>
        </div>
    </div>
  )
}
