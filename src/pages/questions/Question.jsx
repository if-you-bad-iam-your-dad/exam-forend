import React, { useState, useEffect } from "react";
import NavbarItem from "../../component/navbar/NavbarItem";
import Sidebar from "../../component/sidebar/Sidebar";
// import { questionService } from "../../services/api";
import "./QuestionStyle.css";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
    points: 1,
  });

  // useEffect(() => {
  //   loadQuestions();
  // }, []);

  // const loadQuestions = async () => {
  //   try {
  //     const data = await questionService.getQuestions();
  //     setQuestions(data);
  //   } catch (error) {
  //     console.error("Error loading questions:", error);
  //   }
  // };

  const handleQuestionChange = (e) => {
    setNewQuestion({
      ...newQuestion,
      question: e.target.value,
    });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({
      ...newQuestion,
      options: updatedOptions,
    });
  };

  const handleAnswerSelect = (option) => {
    setNewQuestion({
      ...newQuestion,
      answer: option,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.answer) {
      alert("Please select a correct answer");
      return;
    }
  };

  return (
    <div className="app-container">
      <NavbarItem />
      <div className="main-content">
        <Sidebar />
        <div className="question-container">
          <form onSubmit={handleSubmit}>
            <div className="question-card">
              <div className="question-header">
                <input
                  type="text"
                  className="question-input"
                  placeholder="Enter your question"
                  value={newQuestion.question}
                  onChange={handleQuestionChange}
                  required
                />
              </div>

              <div className="options-container">
                {newQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option-item ${
                      newQuestion.answer === option ? "correct-answer" : ""
                    }`}
                  >
                    <div className="option-letter">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <input
                      type="text"
                      className="question-input"
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      required
                    />
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={newQuestion.answer === option}
                      onChange={() => handleAnswerSelect(option)}
                      style={{ marginLeft: "auto" }}
                    />
                  </div>
                ))}
              </div>

              <div className="validation-section">
                <div className="validation-title">Points</div>
                <input
                  type="number"
                  min="1"
                  value={newQuestion.points}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      points: parseInt(e.target.value),
                    })
                  }
                  className="points-input"
                />
              </div>

              <button type="submit" className="add-question-btn">
                Save Question
              </button>
            </div>
          </form>

          <section className="questions-list">
            {questions.map((q) => (
              <div key={q.id} className="question-card">
                <div className="question-header">
                  <h3 className="question-title">
                    {q.question}
                    <span className="points-badge">{q.points} points</span>
                  </h3>
                </div>
                <div className="options-container">
                  {q.options.map((option, index) => (
                    <div
                      key={option}
                      className={`option-item ${
                        q.answer === option ? "correct-answer" : ""
                      }`}
                    >
                      <div className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </div>
                      {option}
                      {q.answer === option && (
                        <span style={{ marginLeft: "auto", color: "#28a745" }}>
                          ✓ Correct
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Question;
