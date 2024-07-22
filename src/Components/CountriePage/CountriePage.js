import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const fetchCountryData = async (countryName) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching country data:", error);
    return null;
  }
};

const getFullNameByCode = async (code) => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    const result = await response.json();
    return result[0].name.common;
  } catch (error) {
    console.error(`Error fetching data for code ${code}:`, error);
    return null;
  }
};

function CountriePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = useParams();
  // const { country } = location.state || {};

  const [countryData, setCountryData] = useState();
  const [borders, setBorders] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryAndBorders = async () => {
      setLoading(true);
      setError(null);

      try {
        let countryData;

        if (location.state?.country) {
          countryData = location.state.country;
        } else if (name) {
          countryData = await fetchCountryData(name);
          if (!countryData) {
            setError("Country not found");
            setLoading(false);
            return;
          }
        } else {
          setError("No country specified");
          setLoading(false);
          return;
        }

        setCountryData(countryData);

        if (countryData.borders && countryData.borders.length > 0) {
          const borderNames = await Promise.all(
            countryData.borders.map(async (border) => getFullNameByCode(border))
          );
          setBorders(borderNames);
        } else {
          setBorders([]);
        }
      } catch (error) {
        setError("An error occurred while fetching data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryAndBorders();
  }, [name, location.state?.country]);

  return (
    <section className="flex-1 flex justify-center">
      <div className="container py-20">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#FFFFFF] dark:bg-[#2B3743] flex items-center gap-3 px-8 py-2 rounded-md shadow-md transition-all duration-150 hover:brightness-95 dark:hover:brightness-105"
        >
          <FaArrowLeftLong />
          <p>Back</p>
        </button>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && !countryData && <p>Country data not found.</p>}

        {!loading && !error && countryData && (
          <ul className="flex items-center justify-between my-20 gap-32">
            <li>
              <img
                src={countryData.flags.svg}
                alt="country_flag"
                className="object-cover w-[35rem] h-[25rem]"
              />
            </li>
            <li className="flex-1 text-[#111214] dark:text-[#F8FDFD]">
              <p className="font-[800] text-3xl mb-10 ">
                {countryData.name.common}
              </p>
              <span className="flex gap-32">
                <span className="mb-20 flex flex-col gap-1">
                  <p>
                    <span className=" font-[800]">Native Name:</span>{" "}
                    {Object.values(countryData.name.nativeName)[0].common}
                  </p>
                  <p>
                    <span className="font-[800]">Population: </span>
                    {new Intl.NumberFormat().format(countryData.population)}
                  </p>
                  <p>
                    <span className="font-[800]">Region: </span>
                    {countryData.region}
                  </p>
                  <p>
                    <span className="font-[800]">Sub Region: </span>
                    {countryData.subregion}
                  </p>
                  <p>
                    <span className="font-[800]">Capital: </span>
                    {countryData.capital}
                  </p>
                </span>
                <span className="flex flex-col gap-1">
                  <p>
                    <span className="font-[800]">Top Level Domain: </span>
                    {countryData.tld}
                  </p>
                  <div className="flex gap-2">
                    <span className="font-[800]">Currencies: </span>
                    {Object.values(countryData.currencies)?.map(
                      (currency, index) => (
                        <p key={index}>
                          {currency.name}
                          {index + 1 !==
                            Object.values(countryData.currencies).length && ","}
                        </p>
                      )
                    )}
                  </div>
                  <span className="flex gap-2">
                    <p className="font-[800]">Languages: </p>
                    {Object.values(countryData.languages)?.map(
                      (lang, index) => (
                        <p key={index}>
                          {lang}
                          {index + 1 !==
                            Object.values(countryData.languages).length && ","}
                        </p>
                      )
                    )}
                  </span>
                </span>
              </span>
              <span className="flex items-start gap-5">
                <p className="font-[800] text-nowrap">Border Countries:</p>
                <span className="flex items-start flex-wrap gap-5">
                  {borders?.map((border, index) => (
                    <p
                      onClick={() => navigate(`/${border}`)}
                      key={index}
                      className="shadow-md px-5 py-1  text-center bg-white dark:bg-[#2B3743] cursor-pointer hover:brightness-95 transition-all duration-150"
                    >
                      {border}
                    </p>
                  ))}
                </span>
              </span>
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}

export default CountriePage;
