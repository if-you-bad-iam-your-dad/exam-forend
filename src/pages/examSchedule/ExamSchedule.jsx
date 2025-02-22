import { useState } from "react";
import NavbarItem from "../../component/navbar/NavbarItem";
import Sidebar from "../../component/sidebar/Sidebar";
import "./ExamScheduleStyle.css";

const ExamSchedule = () => {
  const [formData, setFormData] = useState({
    dateTime: "",
    examName: "",
    marksPerQuestion: "",
    numberOfQuestions: "",
    negativeMark: "",
    duration: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="app-container">
      <NavbarItem />
      <div className="main-content">
        <Sidebar />
        <div className="form-container">
          <h2>Exam Form</h2>
          <form onSubmit={handleSubmit}>
            <label>Date/Time:</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />

            <label>Exam Name:</label>
            <input
              type="text"
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              required
            />

            <label>Marks per Question:</label>
            <input
              type="number"
              name="marksPerQuestion"
              value={formData.marksPerQuestion}
              onChange={handleChange}
              required
            />

            <label>Number of Questions:</label>
            <input
              type="number"
              name="numberOfQuestions"
              value={formData.numberOfQuestions}
              onChange={handleChange}
              required
            />

            <label>Negative Mark:</label>
            <input
              type="number"
              name="negativeMark"
              value={formData.negativeMark}
              onChange={handleChange}
              required
            />

            <label>Duration (minutes):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExamSchedule;
