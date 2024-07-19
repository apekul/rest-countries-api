import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import CountriesList from "./CountriesList/CountriesList";

// Static data
import staticData from "../data.json";

// Countries APi:
// https://restcountries.com/v3.1/all

function Homepage() {
  const [countries, setCountries] = useState(staticData);
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
  return (
    <section className="flex-1 flex justify-center">
      <div className="container py-10 ">
        {/* Search bar */}
        <ul className="flex items-center justify-between  dark:text-[#F5F5F3]">
          <li className="relative">
            <IoMdSearch className="absolute top-4 left-[1.5rem] text-2xl" />
            <input
              className="p-4 pl-[4rem] w-[30rem] rounded-md shadow-md  dark:bg-[#2B3743]"
              placeholder="Search for a country..."
            />
          </li>
          <li>
            <select
              name="regions"
              className="cursor-pointer p-4 shadow-md dark:bg-[#2B3743] rounded-md"
            >
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

        <CountriesList countries={countries} />
      </div>
    </section>
  );
}

export default Homepage;
