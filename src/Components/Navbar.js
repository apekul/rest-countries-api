import React from "react";

const Navbar = () => {
  return (
    <navbar className="paddingX flex items-center justify-between py-6 bg-white shadow-md">
      <h1 className="text-2xl font-[800]">Where in the world?</h1>
      <ul>
        <li className="flex gap-2">
          <div>img</div>
          <p>Dark Mode</p>
        </li>
        <li className="hidden gap-2">
          <div>img</div>
          <p>Light Mode</p>
        </li>
      </ul>
    </navbar>
  );
};

export default Navbar;
