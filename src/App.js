import React from "react";

// react router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Homepage from "./Components/Homepage";

// Task link
// https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca

function App() {
  // boolean for dark/light mode
  // countire list
  // current countrie
  return (
    <Router>
      <section className="bg-[#FAFAFA]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
