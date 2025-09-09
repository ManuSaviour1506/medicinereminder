// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between px-6">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
              Never Miss Your Medicine Again
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Revolutionary medicine reminder app that uses AI to personalize your health routine.
            </p>
            <div className="mt-8 flex space-x-4">
              <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;