import React, { useState, useEffect } from "react";

// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";
import CountriePage from "./Components/CountriePage/CountriePage";

// Task link:
// https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode !== null ? JSON.parse(savedMode) : false;
  });

  // update and apply current theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <Router basename="/rest-countries-api">
      <section className="flex flex-col min-h-screen bg-[#FAFAFA] dark:bg-[#202D36] text-[#0C1013] dark:text-[#F5F5F3]">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/:name" element={<CountriePage />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
