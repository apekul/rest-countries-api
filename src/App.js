import React, { useState, useEffect } from "react";

// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";

// Task link:
// https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca

// Countries APi:
// https://restcountries.com/v3.1/all

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);

  // apply dark theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) return root.classList.add("dark");
    root.classList.remove("dark");
    // store darkMode in localStorage to prevent theme from switching back to default
  }, [darkMode]);

  return (
    <Router>
      <section className="bg-[#FAFAFA] dark:bg-[#202D36] text-[#0C1013] dark:text-[#F5F5F3]">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
