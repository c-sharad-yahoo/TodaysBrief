import React from 'react';
import Header from '../src/components/Header';
import ArchivePage from '../src/components/ArchivePage';

export default function ArchivePageRoute() {
  const handleSearch = (query: string) => {
    // Handle search functionality
    console.log('Search:', query);
  };

  const handleNavigate = (section: string) => {
    // Handle navigation
    console.log('Navigate:', section);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />
      <div className="pt-16">
        <ArchivePage />
      </div>
    </div>
  );
}