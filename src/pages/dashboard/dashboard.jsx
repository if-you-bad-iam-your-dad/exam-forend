// import { useState, useEffect } from "react";
import NavbarItem from "../../component/navbar/NavbarItem";
import Sidebar from "../../component/sidebar/Sidebar";
import DashboardCards from "../../component/dashboardCards/DashboardCards";
import "./dashboardStyle.css";

const Dashboard = () => {
  return (
    <div className="app-container">
      <NavbarItem />
      <div className="main-content">
        <Sidebar />
        <div className="dashboard">
          <DashboardCards />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
