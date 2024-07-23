import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

// Icons
import { IoMdSearch, IoMdClose } from "react-icons/io";
import { MdError } from "react-icons/md";

// Components
import CountriesList from "./CountriesList/CountriesList";
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
      <div className="container py-10 ">
        {/* Search bar */}
        <ul className="flex items-center justify-between  dark:text-[#F5F5F3]">
          <li className="relative">
            <IoMdSearch className="absolute top-4 left-[1.5rem] text-2xl" />
            <input
              className="p-4 px-[4rem] w-[30rem] rounded-md shadow-md  dark:bg-[#2B3743]"
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
              className="cursor-pointer p-4 shadow-md dark:bg-[#2B3743] rounded-md"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="" hidden disabled>
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
        {loading && (
          <div role="status" className="my-2">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
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
