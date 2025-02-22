import React from "react";
import ExamDetails from "../examDetails/ExamDetails";
import "./dashboardCardStyle.css";

const DashboardCards = () => {
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
      color: "text-bg-warning text-bg-warning",
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
  ];
  return (
    <>
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

      <div style={{ marginTop: "15px" }}>
        <ExamDetails />
      </div>
    </>
  );
};

export default DashboardCards;
