import { useLocation } from "react-router-dom";
import NavbarItem from "../../component/navbar/NavbarItem";
import Sidebar from "../../component/sidebar/Sidebar";
import RegisterForm from "../register/RegisterForm";

const AdminDashboard = () => {
  const location = useLocation();
  console.log(location.pathname);

  let dashboardDetail = [
    {
      id: 1,
      title: "Total Exams",
      color: "text-bg-primary",
      titleId: "totalExams",
      total: 17,
    },
    {
      id: 2,
      title: "Compeleted Exams",
      color: "text-bg-success",
      titleId: "completedExams",
      total: 15,
    },
    {
      id: 3,
      title: "Running Exams",
      color: "text-bg-warning",
      titleId: "runningExams",
      total: 8,
    },
    {
      id: 4,
      title: "Upcoming Exams",
      color: "text-bg-info",
      titleId: "upcomingExams",
      total: 12,
    },
    {
      id: 5,
      title: "Users",
      color: "text-bg-warning",
      titleId: "users",
      total: 12,
    },
    {
      id: 6,
      title: "Exam Result",
      color: "text-bg-success",
      titleId: "examResult",
      total: 12,
    },
  ];

  return (
    <div className="app-container">
      <NavbarItem />
      <div className="main-content">
        <Sidebar />

        <div className="dashboard">
          {location.pathname === "/admin-dashboard" && (
            <div className="dashboard-cards">
              {dashboardDetail.map((value, index) => (
                <div className="col-md-3" key={index}>
                  <div className={`DashboardCard ${value.color}`}>
                    <div className="card-body">
                      <h5 className="card-title">{value.title}</h5>
                      <p className="card-text" id={value.titleId}>
                        {value.total}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {location.pathname === "/register" && <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
