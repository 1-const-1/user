import React from "react";

import "./NavBar.sass";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <nav>
        <div><a href="/">Create</a></div>
        <div><a href="/get.html">Get</a></div>
      </nav>
    </div>
  );
}

export default NavBar;