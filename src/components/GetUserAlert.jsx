import React from "react";

import "./GetUserAlert.sass";
import { fetchAPI } from "../fetchAPI";

const changeName = async (form, oldData) => {
  const data = Object.fromEntries((new FormData(form)).entries());
  
  data["id"] = oldData["id"];

  const res = await fetchAPI("/user/change", {
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

const GetUserAlert = (props) => {

  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    const cnt = document.getElementById("root");

    !props.hidden 
      ? cnt.style.filter = "blur(4px)"
      : cnt.style.filter = "blur(0)"; 

  }, [props.hidden]);

  React.useEffect(() => {
    if (props.data.name)
      setValue(props.data.name.toString());
  }, [props.data]);

  return (  
  <div 
    id="alert" 
    style={props.hidden ? {visibility : "hidden"} : {visibility : "visible"}}>
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label htmlFor="">New name</label>
        <input onChange={(e)=> {
          setValue(e.target.value);
        }} name="name" type="text" value={value}/>
      </div>
      <button
        onClick={async () => {
          const res = await changeName(document.querySelectorAll("form")[1], props.data);
          console.log(res);
        }}>Change</button>
      <button 
        onClick={() => props.setHidden(true)}>Close</button>
    </form>
  </div>
  );
}

export default GetUserAlert;