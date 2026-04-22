import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import UMIBLogo from "../assets/umiblogo.jpg";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    setLoading(true);

    // Nese po teston vetem frontend-in, perdor kete:
    // setTimeout(() => {
    //   navigate("/professor/dashboard");
    // }, 1000);

    // Nese po perdor backend real me Google OAuth:
    window.location.href = "http://localhost:5000/auth/google";

    console.log("Duke u ridrejtuar te Google...");
  };

  return (
    <div className="login-wrapper">
      <div className="login-container google-only">
        {/* Branding Side */}
        <div className="brand-side">
          <p className="state-title">Republika e Kosovës</p>
          <div className="logo-placeholder">
            <img src={UMIBLogo} alt="UMIB Logo" className="university-logo-img" />
          </div>
          <div className="brand-text">
            <h1>UMIB</h1>
            <p className="smu-tag">
              Sistemi i Menaxhimit Universitar të Kërkimeve Shkencore
            </p>
          </div>
        </div>

        {/* Auth Side */}
        <div className="form-side oauth-center">
          <div className="form-header">
            <h2>Sign in to your account</h2>
          </div>

          <div className="oauth-content">
            <button
              className="google-btn"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <FcGoogle className="google-icon" />
              <span>{loading ? "Duke u lidhur..." : "Sign in with Google"}</span>
            </button>

            <p className="domain-restriction">
              Only <strong>@umib.net</strong> emails are accepted.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-text">
        © 2026 Universiteti i Mitrovicës "Isa Boletini" - Të gjitha të drejtat e rezervuara.
      </div>
    </div>
  );
};

export default LoginForm;
