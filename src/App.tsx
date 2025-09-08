import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import { searchBriefs } from './utils/storage';
import type { DailyBrief, SearchFilters } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'search' | 'about'>('search');
  const [searchResults, setSearchResults] = useState<DailyBrief[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchBriefs(query, searchFilters.category);
      setSearchResults(results);
      setCurrentView('search');
    }
  };

  const handleNavigate = (section: string) => {
    // Handle navigation - this is now primarily for search and about views
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'search':
        return (
          <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Search Results ({searchResults.length})
              </h2>
              
              {searchResults.length > 0 ? (
                <div className="space-y-8">
                  {searchResults.map((result, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {result.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{result.date}</p>
                      <p className="text-gray-700">{result.primary_focus.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No results found. Try a different search term.</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About Today's Brief</h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>
                    Today's Brief is a premium educational platform designed specifically for competitive examination students. 
                    Our automated daily content updates provide comprehensive coverage of current affairs across all major domains.
                  </p>
                  <p>
                    We cover UPSC, SSC, Banking, Railways, and State PSC examinations with carefully curated content that bridges 
                    the gap between current developments and static knowledge requirements.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-4">Key Features</h3>
                  <ul>
                    <li>Daily automated content updates via JSON webhook integration</li>
                    <li>Multi-dimensional analysis linking current affairs to exam syllabi</li>
                    <li>Cross-subject connections and historical parallels</li>
                    <li>Exam-specific intelligence and question probability insights</li>
                    <li>Comprehensive archive with advanced search capabilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'archive':
        return (
          <div className="pt-24 min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Archive</h2>
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-600">Archive functionality will be available once content starts accumulating.</p>
                <p className="text-gray-500 mt-2">Check back after a few days of daily updates!</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />
      {renderMainContent()}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Today's Brief</h3>
            <p className="text-gray-300 mb-6">
              Your daily comprehensive briefing for competitive examinations
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <span>© 2024 Today's Brief</span>
              <span>•</span>
              <span>Powered by automated JSON webhooks</span>
              <span>•</span>
              <span>Built for serious students</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;