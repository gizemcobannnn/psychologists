import mainPhoto from '../assets/mainperson.png'
import Register from '../components/RegisterModal/Register';
export default function HomePage() {
  return (
    <div className="flex flex-row w-full gap-40">
        <div className="left flex flex-col w-1/2  gap-8 justify-center items-start">
            <h1 className="text-7xl font-bold text-left text-black">The road to the <span className="text-[#54BE96] italic">depths</span> of the human soul</h1>
            <p className="text-xl text-left w-full">We help you to reveal your potential, overcome challenges and find a guide in your own life with the help of our experienced psychologists.</p>
            <button className="text-white p-12 w-40 text-2xl">Get started <span className="text-xl">↗</span></button>
        </div>
        <div className="right flex flex-col w-1/2 gap-8 justify-center items-start ">
            <img src={mainPhoto} alt="main photo" />
        </div>
    </div>
  )
}
