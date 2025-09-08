import React from 'react';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';

export default function HomePage() {
  const handleSearch = (query: string) => {
    // Handle search functionality - could redirect to search page
    console.log('Search:', query);
  };

  const handleNavigate = (section: string) => {
    // Handle navigation - this is handled by Header component now
    console.log('Navigate:', section);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />
      <LandingPage />
    </div>
  );
}