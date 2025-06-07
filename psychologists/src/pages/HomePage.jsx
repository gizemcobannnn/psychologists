import mainPhoto from '../assets/mainperson.png'
import questionmark from '../assets/fa6-solid_question.svg'
import users from '../assets/mdi_users.svg'
import Register from '../components/RegisterModal/Register';
import { useNavigate } from "react-router-dom";
import { MdDone } from "react-icons/md";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center pt-25 md:flex md:flex-row md:gap-20 md:w-full  md:justify-around md:items-center md:m-auto ">
        <div className="relative -left-20 flex flex-col w-[600px] gap-8 justify-center items-start mt-15">
            <h1 className="text-[80px] leading-[82px] font-bold text-left text-black">The road to the <span className="text-primary italic">depths</span> of the human soul</h1>
            <p className="text-xl text-justify w-[450px] ">We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
            <button className="bg-primary text-white  p-12 w-45 text-[20px]" onClick={()=>{navigate("/psychologists")}}>Get started <span className="text-xl">↗</span></button>
        </div>
        <div className="-right-2 mt-8 relative min-w-[650px] md:min-w-[400px] md:w-[500px] h-[500px]  md:top-0 md:-right-5 lg:right-5 lg:top-0 xl:right-8 lg:max-w-[450px] ">
            <img src={mainPhoto} alt="main photo"  className="mt-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            <img src={questionmark} alt="questionmark" className="w-8 h-8 p-2 absolute top-60 left-20 md:top-60 md:-left-4 lg:top-65 lg:-left-4 bg-[#7bcaac] rounded-lg rotate-[-15deg]" />
            <img src={users} alt="users" className="w-8 h-8 p-1 absolute top-20 right-20 md:top-20 md:-right-3 lg:-right-4 lg:top-20 bg-amber-300 rounded-lg text-purple-700 rotate-[15deg]" />
            <div className='flex justify-center items-center flex-row p-3 gap-3 bg-primary absolute bottom-14 left-10  md:bottom-9 md:-left-20 rounded-xl'>
              <div className='bg-white w-8 h-8 flex justify-center items-center rounded-xl'>
                <MdDone className='text-primary text-2xl' />
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-white/50 text-[12px]'>Experienced psychologists</p>
                <p className='text-white'>15,000</p>
              </div>
              
            </div>
        </div>
    </div>
  )
}
