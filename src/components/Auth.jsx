// src/pages/Auth.jsx
import React, { useState } from "react";
import supabase from "../supabaseClient";
import "../styles/auth.scss";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    let error;

    if (isRegister) {
      // Sign up
      const { data, error: signUpError } = await supabase.auth.signUp(
        { email, password },
        { redirectTo: "https://Nurmira16.github.io/greentrack" } // your GitHub Pages URL
      );
      error = signUpError;
      if (!error) alert("Check your email to confirm your account!");
    } else {
      // Sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = signInError;
    }

    setLoading(false);

    if (error) alert(error.message);
    // No need to call onLogin — AuthProvider updates the user automatically
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
