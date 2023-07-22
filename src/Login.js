import { useState } from "react";
import { BACKEND_URL } from "./WebConfig";

export default function Login({ groupId, setSessionId }) {
  const [registering, setRegistering] = useState(false);
  const [toggleDisabled, setToggleDisabled] = useState(false);
  const [groupName, setGroupName] = useState("");
  console.log(setSessionId);

  const getGroupName = () => {
    fetch(BACKEND_URL + "/group/" + groupId).then((r) => {
      if (r.status === 200) {
        r.text().then(setGroupName);
      }
    });
  };

  useState(getGroupName, []);

  const handleResponse = (r) => {
    setToggleDisabled(false);
    if (r.status === 201) {
      alert(registering ? "Registered" : "Logged In");
      if (registering) {
        alert("Registered!");
        setRegistering(false);
      } else {
        r.text().then((text) => setSessionId(text));
      }
    } else if (r.status === 409) {
      alert("Username taken");
    } else {
      alert("error");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setToggleDisabled(true);
    const url = `${BACKEND_URL}/${registering ? "user" : "login"}`;
    const formData = new FormData(e.target);
    formData.append("group_id", groupId);
    fetch(url, { method: "POST", body: formData })
      .then(handleResponse)
      .catch(alert);
  };
  return (
    <div className="fills-page flex-col ">
      <h1 className="flex-center fill-x">{groupName}</h1>
      <div className="flex-center fills-page">
        <form
          className="moved-up-by-height flex-col flex-center"
          onSubmit={onSubmit}
        >
          <h3>{registering ? "Register" : "Log In"}</h3>
          <label>Username</label>
          <input type="text" className="fill-x" name="username" />
          <label>Password</label>
          <input type="password" className="fill-x" name="password" />
          <input type="submit" />
          <label name="toggle-register">
            {registering ? "Already Registstered?" : "Not Registered?"}
          </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              setRegistering(!registering);
            }}
            disabled={toggleDisabled}
          >
            {registering ? "Log In Instead" : "Register Instead"}
          </button>
        </form>
      </div>
    </div>
  );
}
