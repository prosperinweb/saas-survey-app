import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { motion } from 'framer-motion';
import SurveyTake from './SurveyTake';
import DeploySurvey from '../components/DeploySurvey';

const SurveyPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const survey = useSelector((state: RootState) =>
    state.survey.surveys.find((s) => s.id === id)
  );

  if (!survey || !id) {
    return <div>Survey not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Survey Preview</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
          Back to Dashboard
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <SurveyTake id={id} isPreview={true} />
      </div>
      <DeploySurvey surveyId={id} />
    </motion.div>
  );
};

export default SurveyPreview;