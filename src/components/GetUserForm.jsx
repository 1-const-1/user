import React from "react";
import ReactDOM from "react-dom";
import { fetchAPI } from "../fetchAPI.js";
import GetUserAlert from "./GetUserAlert.jsx";


const getUser = async (form) => {
  const data = Object.fromEntries((new FormData(form)).entries());

  const res = await fetchAPI("/user/get", {
    method: "POST",
    headers: {
      "content-type" : "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res) {
    console.warn("Response is empty");
  }
    
  return res;
}

const GetUserForm = () => {

  const [hidden, setHidden] = React.useState(true);
  const [user, setUser] = React.useState({});

  return (
  <>
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label htmlFor="">User ID</label>
        <input name="uid" type="text" placeholder="id" />
      </div>
      <button
        onClick={async () => {
          setUser(await getUser(document.querySelector("form")));
          setHidden(false);
        }}>Get</button>
    </form>
    {ReactDOM.createPortal(
      <GetUserAlert 
        data={user} 
        hidden={hidden} 
        setHidden={setHidden}/>, 
      document.body)}
  </>
  );
}

export default GetUserForm;