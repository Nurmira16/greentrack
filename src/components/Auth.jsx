// src/pages/Auth.jsx
import React, { useState } from "react";
import { signIn, signUp } from "../authService";
import "../styles/auth.scss"; // new SCSS file

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const fn = isRegister ? signUp : signIn;
    const { data, error } = await fn(email, password);
    setLoading(false);

    if (error) alert(error.message);
    else onLogin(data.user);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isRegister ? "Sign Up" : "Login"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        <button className="auth-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
        </button>

        <p className="auth-toggle">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={() => setIsRegister(!isRegister)}> 
            {isRegister ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}
