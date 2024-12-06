import React from "react";

const UserForm = () => {
  const txtplh = "Put info about yourself here...";

  return (
    <form onClick={e => e.preventDefault()}>
      <div>
        <label>My name</label>
        <input name="name" type="text" minLength={1}/>
      </div>
      <div>
        <label>About me</label>
        <textarea name="about" placeholder={txtplh}></textarea>
      </div>
      <button>Create</button>
    </form>
  );
}

export default UserForm;