import React from "react";
import "./login.css";
import passwords from "../userlogin";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "./../redux/actions/index";
import { useNavigate } from "react-router-dom";

function Login() {
  const user = useSelector((state) => state.changeUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (user !== "") {
    navigate("/");
  }
  const onLoginSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const password = e.target[1].value;
    let login = false;

    passwords.forEach((el) => {
      if (el.name === name && el.Password === password) {
        dispatch(updateUser(el.name));
        navigate("/");
        login = true;
      }
    });

    if (!login) alert("Wrong ID or Password");
  };
  return (
    <>
      <form action="action_page.php" method="post" onSubmit={onLoginSubmit}>
        <div className="container">
          <label htmfor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
          />

          <label htmfor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
          />

          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}

export default Login;
