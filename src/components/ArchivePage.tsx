import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Calendar, BookOpen, Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { getBriefsGroupedByMonth, getArchivedBriefs } from '@/utils/storage';
import type { MonthlyArchive, DailyBrief } from '@/utils/storage';

export default function ArchivePage() {
  const router = useRouter();
  const { month } = router.query;
  const [monthlyArchives, setMonthlyArchives] = useState<MonthlyArchive[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<MonthlyArchive | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBriefs, setFilteredBriefs] = useState<DailyBrief[]>([]);

  useEffect(() => {
    const archives = getBriefsGroupedByMonth();
    setMonthlyArchives(archives);

    // If month parameter is provided, find and select that month
    if (month && typeof month === 'string') {
      const targetMonth = archives.find(archive => 
        archive.month.toLowerCase().replace(' ', '-') === month.toLowerCase()
      );
      if (targetMonth) {
        setSelectedMonth(targetMonth);
        setFilteredBriefs(targetMonth.briefs);
      }
    }
  }, [month]);

  useEffect(() => {
    if (selectedMonth) {
      const filtered = selectedMonth.briefs.filter(brief =>
        brief.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brief.primary_focus.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brief.primary_focus.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBriefs(filtered);
    }
  }, [searchTerm, selectedMonth]);

  const handleMonthSelect = (monthArchive: MonthlyArchive) => {
    setSelectedMonth(monthArchive);
    setFilteredBriefs(monthArchive.briefs);
    setSearchTerm('');
  };

  const handleBriefClick = (brief: DailyBrief) => {
    // Ensure consistent date format for routing
    let dateString: string;
    try {
      // If brief.date is already in YYYY-MM-DD format, use it directly
      if (/^\d{4}-\d{2}-\d{2}$/.test(brief.date)) {
        dateString = brief.date;
      } else {
        // Otherwise, parse and format it
        dateString = format(new Date(brief.date), 'yyyy-MM-dd');
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return;
    }
    router.push(`/brief/${dateString}`);
  };

  const handleBackToMonths = () => {
    setSelectedMonth(null);
    setFilteredBriefs([]);
    setSearchTerm('');
    router.push('/archive', undefined, { shallow: true });
  };

  if (selectedMonth) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleBackToMonths}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to Archive
            </button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedMonth.month}</h1>
                <p className="text-gray-600">{selectedMonth.count} daily briefings</p>
              </div>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search briefs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-white rounded-full border border-gray-300 outline-none focus:border-blue-500 focus:shadow-lg transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Briefs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBriefs.map((brief, index) => (
              <div
                key={index}
                onClick={() => handleBriefClick(brief)}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {(() => {
                      try {
                        return format(new Date(brief.date), 'MMM dd, yyyy');
                      } catch (error) {
                        return brief.date;
                      }
                    })()}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {brief.meta.reading_time}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                  {brief.primary_focus.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {brief.primary_focus.summary}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {brief.sections.reduce((acc, section) => acc + section.articles.length, 0)} articles
                  </span>
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: brief.primary_focus.category === 'Economic' ? '#E8F7EC' : '#E6F3FF',
                      color: brief.primary_focus.category === 'Economic' ? '#28A745' : '#007AFF'
                    }}
                  >
                    {brief.primary_focus.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredBriefs.length === 0 && searchTerm && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or browse all briefs for {selectedMonth.month}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Archive</h1>
          <p className="text-lg text-gray-600">
            Browse through our comprehensive collection of daily briefs organized by month
          </p>
        </div>

        {/* Monthly Archive Grid */}
        {monthlyArchives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {monthlyArchives.map((archive, index) => (
              <div
                key={index}
                onClick={() => handleMonthSelect(archive)}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100 hover:border-blue-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <Calendar className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" />
                  <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                    {archive.count} briefs
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {archive.month}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {archive.count} comprehensive daily briefings covering all major domains
                </p>

                {/* Preview of recent topics */}
                {archive.briefs.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Recent Topics:</p>
                    {archive.briefs.slice(0, 2).map((brief, briefIndex) => (
                      <p key={briefIndex} className="text-sm text-gray-700 truncate leading-tight">
                        • {brief.primary_focus.title}
                      </p>
                    ))}
                    {archive.briefs.length > 2 && (
                      <p className="text-xs text-blue-600 font-medium">+{archive.briefs.length - 2} more topics...</p>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium">Click to explore</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Archive Yet</h3>
            <p className="text-gray-600">
              Daily briefs will appear here as they are published. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}