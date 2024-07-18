import React from "react";
import { IoMdSearch } from "react-icons/io";

function Homepage() {
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  return (
    <section className="paddingX flex-1 h-screen py-10">
      {/* Search bar */}
      <ul className="flex items-center justify-between">
        <li className="relative">
          <IoMdSearch className="absolute top-3.5 left-[1.5rem] text-xl" />
          <input
            className="p-3 pl-[4rem] w-[30rem] rounded-md shadow-md"
            placeholder="Search for a country..."
          />
        </li>
        <li>
          <select name="regions" className="cursor-pointer p-3 shadow-md">
            <option value="" default className="cursor-pointer">
              Filter by Region
            </option>
            {regions.map((region, index) => (
              <option key={index} value={region} className="cursor-pointer">
                {region}
              </option>
            ))}
          </select>
        </li>
      </ul>

      <div className="my-10">Countries list</div>
    </section>
  );
}

export default Homepage;
