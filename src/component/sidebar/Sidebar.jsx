import React, { useState, useEffect } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./sidebar.css";
// import { Button, Navbar, NavbarBrand } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { GetUserData, RemoveUserData } from "../../services/storage";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  let role = GetUserData().role;
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
      roleBasedVisible: "0",
    },
    {
      path: "/admin-dashboard",
      name: "Dashboard",
      icon: <FaTh />,
      roleBasedVisible: "1",
    },
    {
      path: "/question",
      name: "Questions",
      icon: <FaTh />,
      roleBasedVisible: "1",
    },
    {
      path: "/exam-schedule",
      name: "Exam",
      icon: <FaRegChartBar />,
      roleBasedVisible: "0",
    },
    {
      path: "/register",
      name: "Add User",
      icon: <FaUserAlt />,
      roleBasedVisible: "1",
    },
  ];

  console.log(
    GetUserData().access_token,
    GetUserData().userName,
    "GetUserData()"
  );
  useEffect(() => {
    if (!GetUserData().access_token) {
      navigate("/login");
    } else {
    }
  });

  return (
    <div className="container">
      <div style={{ width: isOpen ? "260px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Examination Portal
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem
          .filter((item) => item.roleBasedVisible.includes(role))
          .map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
