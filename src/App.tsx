import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SurveyBuilder from './pages/SurveyBuilder';
import SurveyTake from './pages/SurveyTake';
import SurveyPreview from './pages/SurveyPreview';
import SurveyResults from './pages/SurveyResults';

const AppContent: React.FC = () => {
  const darkMode = useSelector((state: RootState) => state.ui.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <Header />
        <main className="grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/survey/build" element={<SurveyBuilder />} />
            <Route path="/survey/edit/:id" element={<SurveyBuilder />} />
            <Route path="/survey/take/:id" element={<SurveyTake />} />
            <Route path="/survey/preview/:id" element={<SurveyPreview />} />
            <Route path="/survey/results/:id" element={<SurveyResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;