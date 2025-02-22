import "./ExamDetailStyle.css";

const ExamDetails = () => {
  const sampleData = [
    {
      id: 1,
      dateandtime: "17 Feb 2025 (10:00 AM)",
      exam_name: "DBMS Midterm Exam",
      markperq: 1,
      noofq: 50,
      negativeMark: 0.25,
      duration: "10 mins",
    },
    {
      id: 2,
      dateandtime: "18 Feb 2025 (11:00 AM)",
      exam_name: "IT CA F2 CS ONLINE EXAM",
      markperq: 1,
      noofq: 10,
      negativeMark: 0.25,
      duration: "10 mins",
    },
    {
      id: 3,
      dateandtime: "18 Feb 2025 (11:00 AM)",
      exam_name: "Database",
      markperq: 1,
      noofq: 20,
      negativeMark: 0.25,
      duration: "20 mins",
    },
  ];
  return (
    <div className="card mb-4">
      <div className="card-header bg-white fw-bold">Exam Details</div>
      <div className="card-body p-0">
        <table className="table table-striped mb-0">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Date/Time</th>
              <th>Exam Name</th>
              <th>Marks/Qn</th>
              <th>No. of Qn</th>
              <th>Negative Mark</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="examTableBody">
            {sampleData.map((value, index) => (
              <tr key={index}>
                <td>{value.id}</td>
                <td>{value.dateandtime}</td>
                <td>{value.exam_name}</td>
                <td>{value.markperq}</td>
                <td>{value.noofq}</td>
                <td>{value.negativeMark}</td>
                <td>{value.duration}</td>
                <td>
                  <button className="btn btn-sm btn-primary">Start</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamDetails;
