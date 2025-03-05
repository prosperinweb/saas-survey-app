import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, BarChart2, Users } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6"
      >
        Welcome to SurveySaaS
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mb-8 text-gray-600"
      >
        Create, distribute, and analyze surveys with ease.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center space-x-4 mb-12"
      >
        <Link
          to="/register"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-white text-gray-800 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition duration-300"
        >
          Login
        </Link>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-xs"
        >
          <CheckCircle className="w-12 h-12 text-gray-800 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
          <p className="text-gray-600">
            Create professional surveys in minutes with our intuitive interface.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white p-6 rounded-lg shadow-xs"
        >
          <BarChart2 className="w-12 h-12 text-gray-800 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Powerful Analytics</h3>
          <p className="text-gray-600">
            Gain valuable insights with our advanced analytics tools.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="bg-white p-6 rounded-lg shadow-xs"
        >
          <Users className="w-12 h-12 text-gray-800 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
          <p className="text-gray-600">
            Work together with your team to create and manage surveys efficiently.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;