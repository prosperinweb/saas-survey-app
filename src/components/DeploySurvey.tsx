import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { motion } from 'framer-motion';
import { Send, Copy, Check } from 'lucide-react';

interface DeploySurveyProps {
  surveyId: string;
}

const DeploySurvey: React.FC<DeploySurveyProps> = ({ surveyId }) => {
  const [isDeployed, setIsDeployed] = useState(false);
  const [deployLink, setDeployLink] = useState('');
  const [copied, setCopied] = useState(false);
  const survey = useSelector((state: RootState) =>
    state.survey.surveys.find(s => s.id === surveyId)
  );

  const handleDeploy = () => {
    // In a real application, this would make an API call to deploy the survey
    // For now, we'll simulate deployment by generating a fake link
    const fakeDeployLink = `https://surveyapp.com/s/${surveyId}`;
    setDeployLink(fakeDeployLink);
    setIsDeployed(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(deployLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!survey) {
    return <div>Survey not found</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Deploy Survey</h2>
      {!isDeployed ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDeploy}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300 flex items-center"
        >
          <Send className="mr-2" size={18} />
          Deploy Survey
        </motion.button>
      ) : (
        <div className="space-y-4">
          <p className="text-green-600 font-semibold">Survey Deployed!</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={deployLink}
              readOnly
              className="grow px-3 py-2 border rounded-md focus:outline-hidden focus:ring-2 focus:ring-gray-400"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="bg-gray-200 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300 transition duration-300 flex items-center"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploySurvey;