import React from "react";
import UserForm from "./components/UserForm.jsx";

import "./App.sass";
import NavBar from "./components/NavBar.jsx";
import GetUserForm from "./components/GetUserForm.jsx";

const App = () => {
  const uri = location.pathname;

  return (
    <div className="form-cnt">
      <div>
        <NavBar/>
      </div>
      <div>{(()=> {
        switch (uri) {
          case "/":
            return <UserForm />;
          case "/get.html":
            return <GetUserForm />;
        }
      })()}</div>
    </div>
  );
}

export default App;