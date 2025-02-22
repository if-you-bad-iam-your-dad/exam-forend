import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginForm.css";
import { LoginServiceApi } from "../../services/serviceFile";
import { GetUserData, StoreUserData } from "../../services/storage";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (GetUserData().access_token) {
      if (GetUserData().role === "0") {
        navigate("/dashboard");
      } else {
        navigate("/admin-dashboard");
      }
    }
  }, [navigate]);

  const validateUserName = () => {
    if (!userName) {
      setUserNameError("User Name is required");
    } else {
      setUserNameError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateUserName();
    validatePassword();
    if (userName && password.length >= 6) {
      try {
        setLoading(true);
        const response = await LoginServiceApi(userName, password);
        if (response.status === 200) {
          console.log(response.data, "response.data");
          let user_data = {
            token: response.data.data.token,
            userName: response.data.data.user_name,
            role: response.data.data.is_admin,
          };

          StoreUserData(user_data);
          if (user_data.role === "0") {
            navigate("/dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        }
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p>Login to access your account</p>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onBlur={validateUserName}
                placeholder="Enter your username"
              />
              {userNameError && <span className="error">{userNameError}</span>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                placeholder="Enter your password"
              />
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="login-footer">
            {/* <a href="/forgot-password">Forgot Password?</a> */}
            <p>
              Don't have an account? <a href="/register">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
