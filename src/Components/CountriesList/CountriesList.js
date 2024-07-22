import React from "react";
import { useNavigate } from "react-router-dom";

const CountriesList = ({ countries }) => {
  const navigate = useNavigate();

  const navigateToCountry = (name, country) => {
    navigate(`/${name}`, { state: { country } });
  };
  return (
    <section className="my-10">
      <ul className="grid grid-cols-4 gap-20">
        {countries.map((country, index) => (
          <li
            key={index}
            onClick={() => navigateToCountry(country.name.common, country)}
            className="bg-white dark:bg-[#2B3743] flex flex-col rounded-md h-[25rem] shadow-md cursor-pointer hover:brightness-105 transition-all duration-150"
          >
            <img
              src={country.flags.svg}
              alt="flag"
              className="rounded-t-md w-full h-1/2 object-cover"
            />
            <span className="p-8 flex flex-col gap-3">
              <p className="font-bold text-2xl">{country.name.common}</p>
              <span>
                <p>
                  <span className="">Population:</span>
                  <span className="text-[#9CA6B2] ">
                    {" "}
                    {new Intl.NumberFormat().format(country.population)}
                  </span>
                </p>
                <p>
                  <span className="">Region:</span>
                  <span className="text-[#9CA6B2] "> {country.region}</span>
                </p>
                <p>
                  <span className="">Capital:</span>
                  <span className="text-[#9CA6B2] "> {country.capital}</span>
                </p>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CountriesList;
