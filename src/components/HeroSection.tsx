import React from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';
import type { DailyBrief } from '@/types';
import { format } from 'date-fns';

interface HeroSectionProps {
  data: DailyBrief | null;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const totalArticles = data ? data.sections.reduce((acc, section) => acc + section.articles.length, 0) + 1 : 0;

  return (
    <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Today's General Studies
            <span className="block text-blue-600">Brief</span>
          </h1>
          
          {data && (
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">
                  {format(new Date(data.date), 'EEEE, MMMM d, yyyy')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{data.meta.reading_time}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>{totalArticles} articles</span>
              </div>
            </div>
          )}

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your daily comprehensive briefing for competitive examinations including UPSC, SSC, Banking, Railways, and State PSCs. 
            Stay updated with curated content that matters for your success.
          </p>
        </div>
      </div>
    </section>
  );
}