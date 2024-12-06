import React from "react";
import { fetchAPI } from "../fetchAPI";

const createUser = async (form) => {
  const data = Object.fromEntries((new FormData(form)).entries());

  const res = await fetchAPI("/user/create", {
    method: "POST",
    headers: {
      "content-type" : "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res) {
    console.warn("Response is empty");
  }
    

  console.log(res);
}

const UserForm = () => {
  const txtplh = "Put info about yourself here...";

  return (
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label>My name</label>
        <input name="name" type="text" minLength={1}/>
      </div>
      <div>
        <label>About me</label>
        <textarea name="about" placeholder={txtplh} cols={22} rows={10}></textarea>
      </div>
      <button 
        onClick={() => createUser(document.querySelector("form"))}>Create</button>
    </form>
  );
}

export default UserForm;