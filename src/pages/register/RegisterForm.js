import React, { useState } from "react";
import axios from "axios";
import NavbarItem from "../../component/navbar/NavbarItem";
import Sidebar from "../../component/sidebar/Sidebar";
import "./RegisterStyle.css";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        isAdmin: false,
      });
      const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
    
        try {
          const response = await axios.post("/api/register", formData);
          setSuccess("User registered successfully");
        } catch (err) {
          setError("Registration failed. Try again.");
        }
      };

  return (
    <div className="app-container">
      <NavbarItem />
      <div className="main-content">
        <Sidebar />
    <div className="admin-form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          {/* {errors.username && <span className="error">{errors.username}</span>} */}
        </div>

        <div className="form-group">

<label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
          {/* {errors.email && <span className="error">{errors.email}</span>} */}
        </div>

        <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Enter confirmPassword"
          required
        />
          {/* {errors.password && <span className="error">{errors.password}</span>} */}
        </div>

        <div className="form-group">
        <label>Is Admin:</label>
        <select name="isAdmin" value={formData.isAdmin} onChange={handleChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        </div>

        <button type="submit">Add User</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default RegisterForm;



