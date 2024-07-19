import React from "react";
import { IoMoonOutline, IoMoonSharp } from "react-icons/io5";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="flex justify-center w-full bg-white dark:bg-[#2B3743] shadow-md select-none ">
      <div className="container w-full flex items-center justify-between py-6 ">
        <h1 className="text-2xl font-[800]">Where in the world?</h1>
        <ul>
          {!darkMode ? (
            <li
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              <IoMoonOutline />
              <p>Dark Mode</p>
            </li>
          ) : (
            <li
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              <IoMoonSharp />
              <p>Light Mode</p>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
