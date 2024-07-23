import React, { useEffect, useState, useCallback } from "react";
import { IoMdSearch } from "react-icons/io";
import CountriesList from "./CountriesList/CountriesList";
import debounce from "lodash.debounce";
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
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

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
      setError("Failed to fetch data.");
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
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <CountriesList countries={countries} />
      </div>
    </section>
  );
}

export default Homepage;
