"use client"

import { useState } from "react"
import "./styles.css"

export default function ExamPortal() {
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const totalQuestions = 20
  const currentQuestion = 1

  const questionNumbers = Array.from({ length: totalQuestions }, (_, i) => i + 1)

  return (
    <div className="exam-portal">

      <div className="main-content">
        <main>
          {/* Question Header */}
          <div className="question-header">
            <h2>
              Question {currentQuestion} Out of {totalQuestions}
            </h2>
          </div>

          {/* Question Content */}
          <div className="question-container">
            <h3 className="question-text">
              Which of the following is designed to control the operations of a computer?
            </h3>

            <div className="options-list">
              {["User", "System Software", "Application Software", "Utility Software"].map((option, index) => (
                <label key={index} className="option-item">
                  <input
                    type="radio"
                    name="answer"
                    value={option.toLowerCase().replace(" ", "-")}
                    checked={selectedAnswer === option.toLowerCase().replace(" ", "-")}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            <button className="btn btn-secondary" onClick={() => setSelectedAnswer("")}>
              Clear Response
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="navigation-buttons">
            <button className="btn btn-secondary">Previous</button>
            <button className="btn btn-secondary">Mark</button>
            <button className="btn btn-primary">Next</button>
          </div>
        </main>

        <aside className="sidebar">
          {/* Language Selector */}
          

          {/* Timer */}
          <div className="timer-section">
            <span>⏱</span>
            <div className="time" id=""></div>
          </div>

          {/* Question Grid */}
          <div className="question-grid">
            <div className="grid-container">
              {questionNumbers.map((num) => (
                <button key={num} className={`grid-button ${num === currentQuestion ? "active" : ""}`}>
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Status Indicators */}
          

          {/* Submit Section */}
          <div className="submit-section">
        
            <button className="submit-btn">Submit</button>
          </div>
        </aside>
      </div>
    </div>
  )
}

