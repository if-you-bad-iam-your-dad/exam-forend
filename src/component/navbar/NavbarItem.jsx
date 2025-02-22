import "./NavbarStyleItem.css";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GetUserData, RemoveUserData } from "../../services/storage";

const NavbarItem = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  let userName =
    GetUserData().userName.charAt(0).toUpperCase() +
    GetUserData().userName.slice(1);

  useEffect(() => {
    if (!GetUserData().access_token) {
      navigate("/login");
    } else {
    }
  });

  const handleLogoutButton = (event) => {
    RemoveUserData();
    if (!GetUserData().access_token) {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        FEARSOME FIFTEEN ONLINE EXAMINATION PORTAL
      </div>
      <div className="navbar-right">
        <div className="nav-right">
          <h3>Hello {userName}</h3>
          <div className="account-menu">
            <FaUserCircle
              className="user-icon"
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className="dropdown">
                <ul>
                  <li>{userName}</li>
                  <li>
                    <button
                      className="logoutbtn"
                      type="button"
                      onClick={(event) => handleLogoutButton(event)}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarItem;
