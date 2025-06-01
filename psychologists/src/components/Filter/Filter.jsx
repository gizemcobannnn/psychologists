import { useState } from "react";

export default function Filter(){
    const [selectedFilter, setSelectedFilter] = useState("Show All");
    
    return(
    <div className="flex flex-col gap-3 mb-3 mt-5 items-start">
        <p>Filters</p>
        <select
          name="sortOptions"
          id="sortOptions"
          value={selectedFilter}
          onChange={(e) => {setSelectedFilter(e.target.value)
            localStorage.setItem("selectedFilter", JSON.stringify(e.target.value));
            console.log(JSON.parse(localStorage.getItem("selectedFilter")))
            }}
          className="bg-primary appearance-none  text-white p-2 rounded-lg"
        >

          <option value="A to Z" className="bg-white text-gray-600">
            A to Z
          </option>
          <option value="Z to A" className="bg-white text-gray-600">
            Z to A
          </option>
          <option value="Less than $10" className="bg-white text-gray-600">
            Less than $10
          </option>
          <option value="Greater than $10" className="bg-white text-gray-600">
            Greater than $10
          </option>
          <option value="Popular" className="bg-white text-gray-600">
            Popular
          </option>
          <option value="Not Popular" className="bg-white text-gray-600">
            Not Popular
          </option>
          <option value="Show All" className="bg-white text-gray-600">
            Show All
          </option>
        </select>
      </div>)
}

