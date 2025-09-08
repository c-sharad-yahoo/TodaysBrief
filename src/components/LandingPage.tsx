import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BookOpen, Calendar, Archive, TrendingUp, Users, Globe } from 'lucide-react';
import { getBriefsGroupedByMonth, getDailyBrief } from '@/utils/storage';
import type { MonthlyArchive } from '@/utils/storage';

export default function LandingPage() {
  const router = useRouter();
  const [todaysBrief, setTodaysBrief] = useState<any>(null);
  const [monthlyArchives, setMonthlyArchives] = useState<MonthlyArchive[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [brief, archives] = await Promise.all([
          getDailyBrief(),
          getBriefsGroupedByMonth()
        ]);
        setTodaysBrief(brief);
        setMonthlyArchives(archives);
      } catch (error) {
        console.error('Error loading landing page data:', error);
      }
    }

    loadData();
  }, []);

  const handleTodayClick = () => {
    router.push('/today');
  };

  const handleArchiveClick = (monthKey: string) => {
    router.push(`/archive?month=${monthKey}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-16 w-16 text-blue-600 mr-4" />
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Today's Brief
              </h1>
            </div>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Your comprehensive daily briefing for competitive examinations including UPSC, SSC, Banking, Railways, and State PSCs. 
              Stay updated with curated content that matters for your success.
            </p>

            {/* Today's Update Button */}
            <div className="mb-16">
              <button
                onClick={handleTodayClick}
                className="group relative inline-flex items-center gap-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <TrendingUp className="h-6 w-6 group-hover:scale-110 transition-transform" />
                <span>Today's Update</span>
              </button>
            </div>

            {/* Archive Section */}
            {monthlyArchives.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Archive</h2>
                  <p className="text-lg text-gray-600">Explore our comprehensive collection of daily briefs organized by month</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {monthlyArchives.slice(0, 8).map((archive, index) => (
                    <div
                      key={index}
                      onClick={() => handleArchiveClick(archive.month.toLowerCase().replace(' ', '-'))}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Calendar className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                          {archive.count} briefs
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {archive.month}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4">
                        {archive.count} comprehensive daily briefings covering all major domains
                      </p>

                      {/* Preview of recent topics */}
                      {archive.briefs.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Recent Topics:</p>
                          {archive.briefs.slice(0, 2).map((brief, briefIndex) => (
                            <p key={briefIndex} className="text-sm text-gray-700 truncate">
                              • {brief.primary_focus.title}
                            </p>
                          ))}
                          {archive.briefs.length > 2 && (
                            <p className="text-xs text-gray-500">+{archive.briefs.length - 2} more...</p>
                          )}
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Click to explore</span>
                          <Archive className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {monthlyArchives.length > 8 && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => router.push('/archive')}
                      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                    >
                      <Archive className="h-5 w-5" />
                      View All Archive
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Today's Brief?</h2>
            <p className="text-lg text-gray-600">Comprehensive, reliable, and exam-focused content delivery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-600">
                All major domains covered: Governance, Economics, International Affairs, Science & Technology, and Social Development
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exam-Focused Analysis</h3>
              <p className="text-gray-600">
                Every article includes exam relevance, static-dynamic connections, and question probability insights
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Daily Updates</h3>
              <p className="text-gray-600">
                Fresh content every day with automated updates ensuring you never miss important developments
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}