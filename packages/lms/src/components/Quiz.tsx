"use client";

import React, { useState } from "react";
import { Quiz as QuizType, Question } from "../types";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@cognitolab/ui";

interface QuizProps {
  quiz: QuizType;
  onSubmit?: (answers: Record<string, string | string[]>) => void;
}

export const Quiz: React.FC<QuizProps> = ({ quiz, onSubmit }) => {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let correct = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const correctAnswer = question.correctAnswer;

      if (Array.isArray(correctAnswer)) {
        if (
          Array.isArray(userAnswer) &&
          correctAnswer.length === userAnswer.length &&
          correctAnswer.every((ans) => userAnswer.includes(ans))
        ) {
          correct++;
        }
      } else {
        if (userAnswer === correctAnswer) {
          correct++;
        }
      }
    });

    const finalScore = Math.round((correct / quiz.questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);

    if (onSubmit) {
      onSubmit(answers);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <QuestionComponent
              key={question.id}
              question={question}
              index={index + 1}
              answer={answers[question.id]}
              onChange={(answer) => handleAnswer(question.id, answer)}
              showCorrect={submitted}
            />
          ))}
          {!submitted && (
            <Button onClick={handleSubmit} className="w-full">
              Soumettre
            </Button>
          )}
          {submitted && score !== null && (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-2xl font-bold">Score: {score}%</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface QuestionComponentProps {
  question: Question;
  index: number;
  answer?: string | string[];
  onChange: (answer: string | string[]) => void;
  showCorrect: boolean;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  index,
  answer,
  onChange,
  showCorrect,
}) => {

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold mb-2">
        {index}. {question.question}
      </h3>
      {question.type === "multiple-choice" && question.options && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name={question.id}
                value={option}
                checked={answer === option}
                onChange={() => onChange(option)}
                disabled={showCorrect}
              />
              <span
                className={
                  showCorrect && option === question.correctAnswer
                    ? "text-green-600 font-semibold"
                    : ""
                }
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      )}
      {question.type === "true-false" && (
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={question.id}
              value="true"
              checked={answer === "true"}
              onChange={() => onChange("true")}
              disabled={showCorrect}
            />
            <span>Vrai</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name={question.id}
              value="false"
              checked={answer === "false"}
              onChange={() => onChange("false")}
              disabled={showCorrect}
            />
            <span>Faux</span>
          </label>
        </div>
      )}
      {question.type === "short-answer" && (
        <input
          type="text"
          value={answer as string || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={showCorrect}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      )}
      {showCorrect && question.explanation && (
        <p className="mt-2 text-sm text-gray-600">{question.explanation}</p>
      )}
    </div>
  );
};

