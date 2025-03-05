import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { motion } from 'framer-motion';

interface SurveyTakeProps {
  id: string;
  isPreview?: boolean;
}

const SurveyTake: React.FC<SurveyTakeProps> = ({ id, isPreview = false }) => {
  const survey = useSelector((state: RootState) =>
    state.survey.surveys.find((s) => s.id === id)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});

  if (!survey) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">Survey Not Found</h2>
        <p>The survey you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  if (survey.questions.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-semibold mb-4">{survey.title}</h2>
        <p>This survey doesn't have any questions yet.</p>
      </div>
    );
  }

  const currentQuestion = survey.questions[currentQuestionIndex];

  const handleAnswer = (answer: string | number) => {
    setAnswers({ ...answers, [currentQuestion.id]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // TODO: Submit survey answers
      console.log('Survey completed:', answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-semibold mb-6">{survey.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-xs">
        <h2 className="text-xl font-semibold mb-4">
          Question {currentQuestionIndex + 1} of {survey.questions.length}
        </h2>
        <p className="text-lg mb-4">{currentQuestion.text}</p>
        {currentQuestion.type === 'text' && (
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            rows={4}
            value={answers[currentQuestion.id] as string || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            disabled={isPreview}
          />
        )}
        {currentQuestion.type === 'multiple_choice' && (
          <div className="space-y-2">
            {currentQuestion.options && currentQuestion.options.map((option: string, index: number) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={answers[currentQuestion.id] === option}
                  onChange={() => handleAnswer(option)}
                  className="mr-2"
                  disabled={isPreview}
                />
                {option}
              </label>
            ))}
          </div>
        )}
        {currentQuestion.type === 'rating' && (
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleAnswer(rating)}
                className={`px-4 py-2 rounded-md ${
                  answers[currentQuestion.id] === rating
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
                disabled={isPreview}
              >
                {rating}
              </button>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
          >
            {currentQuestionIndex === survey.questions.length - 1
              ? 'Submit'
              : 'Next'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SurveyTake;