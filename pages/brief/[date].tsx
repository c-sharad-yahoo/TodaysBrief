import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../src/components/Header';
import DailyBriefDisplay from '../../src/components/DailyBriefDisplay';
import { getBriefByDate, searchBriefs } from '../../src/utils/storage';
import type { DailyBrief } from '../../src/types';

export default function BriefDetailPage() {
  const router = useRouter();
  const { date } = router.query;
  const [briefData, setBriefData] = useState<DailyBrief | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<DailyBrief[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    if (date && typeof date === 'string') {
      console.log('Looking for brief with date:', date);
      const brief = getBriefByDate(date);
      console.log('Found brief:', brief ? brief.title : 'Not found');
      setBriefData(brief);
      setIsLoading(false);
    }
  }, [date]);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchBriefs(query);
      setSearchResults(results);
      setIsSearchMode(true);
    } else {
      setIsSearchMode(false);
      setSearchResults([]);
    }
  };

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'home':
        router.push('/');
        break;
      case 'today':
        router.push('/today');
        break;
      case 'archive':
        router.push('/archive');
        break;
      case 'about':
        // Handle about page navigation
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header onSearch={handleSearch} onNavigate={handleNavigate} />
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Brief...</h2>
            <p className="text-gray-600">Please wait while we fetch the content.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!briefData) {
    return (
      <div className="min-h-screen bg-white">
        <Header onSearch={handleSearch} onNavigate={handleNavigate} />
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Brief Not Found</h2>
            <p className="text-gray-600 mb-6">The requested brief could not be found.</p>
            <button
              onClick={() => router.push('/archive')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Archive
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSearchMode) {
    return (
      <div className="min-h-screen bg-white">
        <Header onSearch={handleSearch} onNavigate={handleNavigate} />
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />
      <DailyBriefDisplay briefData={briefData} />
      
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