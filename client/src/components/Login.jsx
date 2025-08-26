import React, { useState } from "react";
import axios from "axios";
import "../App.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        { username, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/auth/register", {
        username,
        password,
      });
      handleLogin(e);
    } catch {
      setError("Username already exists. Please try another.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>AI Chat Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-group">
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
