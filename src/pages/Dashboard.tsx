import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteSurvey } from '../store/slices/surveySlice';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle, Clipboard, BarChart, Eye, Trash2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const surveys = useSelector((state: RootState) => state.survey.surveys);

  const handleDeleteSurvey = (id: string) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      dispatch(deleteSurvey(id));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-semibold mb-6">Welcome, {user?.email}</h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Surveys</h2>
        <Link
          to="/survey/build"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center"
        >
          <PlusCircle className="mr-2" size={18} />
          Create New Survey
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys.map((survey) => (
          <motion.div
            key={survey.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-4">{survey.title}</h3>
            <p className="text-gray-600 mb-4">{survey.questions.length} questions</p>
            <div className="flex justify-between">
              <Link
                to={`/survey/edit/${survey.id}`}
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <Clipboard className="mr-1" size={16} />
                Edit
              </Link>
              <Link
                to={`/survey/preview/${survey.id}`}
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <Eye className="mr-1" size={16} />
                Preview
              </Link>
              <Link
                to={`/survey/results/${survey.id}`}
                className="text-gray-600 hover:text-gray-800 flex items-center"
              >
                <BarChart className="mr-1" size={16} />
                Results
              </Link>
              <button
                onClick={() => handleDeleteSurvey(survey.id)}
                className="text-red-600 hover:text-red-800 flex items-center"
              >
                <Trash2 className="mr-1" size={16} />
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;