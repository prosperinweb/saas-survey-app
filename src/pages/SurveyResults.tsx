import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SurveyResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const survey = useSelector((state: RootState) =>
    state.survey.surveys.find((s) => s.id === id)
  );

  if (!survey) {
    return <div>Survey not found</div>;
  }

  // TODO: Fetch actual results from API
  const mockResults = {
    totalResponses: 100,
    questions: survey.questions.map((question) => ({
      ...question,
      responses: question.type === 'multiple_choice'
        ? question.options.map((option) => ({
            option,
            count: Math.floor(Math.random() * 100),
          }))
        : question.type === 'rating'
        ? [1, 2, 3, 4, 5].map((rating) => ({
            rating,
            count: Math.floor(Math.random() * 100),
          }))
        : { averageLength: Math.floor(Math.random() * 100) + 20 },
    })),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-2xl font-semibold mb-6">Survey Results: {survey.title}</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-2">Total Responses: {mockResults.totalResponses}</h2>
      </div>
      {mockResults.questions.map((question, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6"
        >
          <h3 className="text-lg font-semibold mb-4">Question {index + 1}: {question.text}</h3>
          {question.type === 'multiple_choice' && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={question.responses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="option" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
          {question.type === 'rating' && (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={question.responses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          )}
          {question.type === 'text' && (
            <div>
              <p>Average response length: {question.responses.averageLength} characters</p>
              {/* You could add more text analysis here, such as word clouds or sentiment analysis */}
            </div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SurveyResults;