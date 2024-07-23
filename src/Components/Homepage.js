import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import CountriesList from "./CountriesList/CountriesList";

// Static data
import staticData from "../data.json";

// all:     https://restcountries.com/v3.1/all
// name:    https://restcountries.com/v3.1/name/deutschland
// region:  https://restcountries.com/v3.1/region/europe

function Homepage() {
  // TODO: Create search function to get countries all
  // TODO: Create filter by regions function
  const [countries, setCountries] = useState(staticData);
  const [searchQuery, setSearchQuery] = useState("");
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  // Search query and set Countries
  useEffect(() => {
    const getCountries = async () => {
      let url;
      if (searchQuery.trim()) {
        url = `https://restcountries.com/v3.1/name/${searchQuery.trim()}`;
      } else {
        url = "https://restcountries.com/v3.1/all";
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        return setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCountries();
  }, [searchQuery]);

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </li>
          <li>
            <select
              name="regions"
              className="cursor-pointer p-4 shadow-md dark:bg-[#2B3743] rounded-md"
            >
              <option value="" hidden default>
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
