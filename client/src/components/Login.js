import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const { push } = useHistory();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    e.persist();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        push("/bubble-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="email">Password: </label>
        <input
          type="text"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <br></br>
        <button onClick={handleSubmit}>Login</button>
        <br></br>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </form>
    </>
  );
};

export default Login;
