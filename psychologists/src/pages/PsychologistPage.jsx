import { useState } from "react"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";


export default function PsychologistPage() {
  const [selectedFilter, setSelectedFilter ] = useState("Show All");

  return (
    <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-3 mb-5 items-start">
            <p>Filters</p>
            <select name="sortOptions" id="sortOptions" value={selectedFilter} onChange={e=>setSelectedFilter(e.target.value)}
                className="bg-[#54BE96]">
                <option value="A to Z">A to Z</option>
                <option value="Z to A">Z to A</option>
                <option value="Less than $10">Less than $10</option>
                <option value="Greater than $10">Greater than $10</option>
                <option value="Popular">Popular</option>
                <option value="Not Popular">Not Popular</option>
                <option value="Show All">Show All</option>
            </select>
        </div>
        <div id="psyc karts" className="flex flex-row bg-[#FBFBFB] w-screen">
            <div className="flex flex-col w-[300px]">
               img
            </div>
            <div className="flex flex-col">
                <div className="flex flex-row justify-around gap-20">
                    <div className="flex flex-col items-start">
                        <p>Psychologist</p>
                        <p>name</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <p>Rating: </p>
                        <p>Price / 1 hour: </p>
                        <MdFavorite className="text-2xl"></MdFavorite>
                    </div>
                </div>
                <div>
                    <div></div>
                </div>
                <p className="text-start text-slate-600">acıklama</p>
                <button style={{all:'unset'}}  className="text-black underline bg-transparent border-none p-0 m-0 w-40">Read more</button>
            </div>
        </div>
    </div>
  )
}
