import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-center w-ful">
      <div className="container h-14 w-full flex items-center justify-center">
        <p>Challenge by&nbsp; </p>
        <a
          href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca"
          target="_blank"
          rel="noreferrer"
          className="text-[#483EFF]"
        >
          Frontend Mentor
        </a>
        <span>. Coded by&nbsp; </span>
        <a
          target="_blank"
          href="https://github.com/apekul"
          rel="noreferrer"
          className="text-[#483EFF]"
        >
          apekul
        </a>
        <span>.</span>
      </div>
    </footer>
  );
};

export default Footer;
