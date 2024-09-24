import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google login successful:", credentialResponse);
    localStorage.setItem(
      "googleProfile",
      JSON.stringify(credentialResponse.profileObj)
    );
    navigate("/home");
  };

  const handleGoogleLoginError = () => {
    console.log("Google login failed");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    if (username === "") {
      setUsernameError("Username is required");
    }
    if (password === "") {
      setPasswordError("Password is required");
    }

    if (username !== "" && password !== "") {
      navigate("/home");
    }
  };

  return (
    <div className="container1">
      <div style={{ border: "1px solid #000000" }} className="container2">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <h1>Login</h1>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && <span className="error">{usernameError}</span>}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <span className="error">{passwordError}</span>}
          </div>
          <button
            type="submit"
            style={{
              borderRadius: "10px",
            }}
          >
            Login
          </button>

          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
