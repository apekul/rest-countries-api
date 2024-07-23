import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

// Icons
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";

// Components
import CountriesList from "./CountriesList/CountriesList";
import Loading from "./Utils/loading";
// Static data
// import staticData from "../data.json";

// all:     https://restcountries.com/v3.1/all
// name:    https://restcountries.com/v3.1/name/deutschland
// region:  https://restcountries.com/v3.1/region/europe

function Homepage() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // regions
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  const fetchCountries = async (query = "", region = "") => {
    setLoading(true);
    setError(null);
    try {
      let url = "https://restcountries.com/v3.1/all";
      if (query.trim()) {
        url = `https://restcountries.com/v3.1/name/${query.trim()}`;
      } else if (region) {
        url = `https://restcountries.com/v3.1/region/${region}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.log("Error fetching data:", error);
      setError("Can't find the country you're looking for.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchCountries = useCallback(
    debounce((query, region) => {
      fetchCountries(query, region);
    }, 500),
    []
  );
  useEffect(() => {
    debouncedFetchCountries(searchQuery, selectedRegion);
  }, [searchQuery, selectedRegion, debouncedFetchCountries]);

  return (
    <section className="flex-1 flex justify-center">
      <div className="container py-10 w-full">
        {/* Search bar */}
        <ul className="flex flex-col lg:flex-row lg:items-center justify-between dark:text-[#F5F5F3]">
          <li className="relative w-full">
            <IoMdSearch className="absolute top-4 left-[1.5rem] text-2xl" />
            <input
              className="p-4 px-[4rem] w-full lg:w-[30rem] rounded-md shadow-md  dark:bg-[#2B3743]"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IoMdClose
              onClick={() => setSearchQuery("")}
              className={`${
                searchQuery
                  ? "flex text-xl items-center justify-center absolute top-[1.10rem] right-[1.5rem] cursor-pointer text-gray-500 hover:text-white"
                  : "hidden"
              }`}
            />
          </li>
          <li>
            <select
              name="regions"
              className="relative border-r-[16px] border-white dark:border-[#2B3743] cursor-pointer p-4 pl-4 pr-10 shadow-md dark:bg-[#2B3743] rounded-md  my-4 bg-white "
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="" hidden>
                Filter by Region
              </option>
              {regions.map((region, index) => (
                <option key={index} value={region} className=" cursor-pointer">
                  {region}
                </option>
              ))}
            </select>
          </li>
        </ul>
        {loading && <Loading />}
        {error && (
          <div className="my-2 flex items-center gap-2 text-red-200">
            <MdError className="text-yellow-200" />
            {error}
          </div>
        )}
        <CountriesList countries={countries} />
      </div>
    </section>
  );
}

export default Homepage;
