import React from "react";
import { useState } from "react";
import NavbarItem from "../../component/navbar/NavbarItem";
import Sidebar from "../../component/sidebar/Sidebar";
import "./QuestionStyle.css";

const Question = () => {
  const questions = [
    {
      id: 1,
      question: "What is React?",
      options: ["A Library", "A Framework", "A Language", "None of the above"],
      answer: "A Library",
    },
    {
      id: 2,
      question: "Which hook is used for state management?",
      options: ["useEffect", "useState", "useContext", "useRef"],
      answer: "useState",
    },
    {
      id: 3,
      question: "What is JSX?",
      options: [
        "JavaScript XML",
        "JSON XML Syntax",
        "JavaScript Syntax Extension",
        "None of the above",
      ],
      answer: "JavaScript XML",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswer = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  return (
    <div className="app-container">
      <NavbarItem />
      <div className="main-content">
        <Sidebar />
        <div className="">
          <section className="">
            {questions.map((q) => (
              <div key={q.id} className="question-card">
                <h3>{q.question}</h3>
                {q.options.map((option) => (
                  <label key={option} className="">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={selectedAnswers[q.id] === option}
                      onChange={() => handleAnswer(q.id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Question;
