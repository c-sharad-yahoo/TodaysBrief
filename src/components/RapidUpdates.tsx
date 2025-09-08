import React from 'react';
import { Zap, ExternalLink } from 'lucide-react';
import type { RapidUpdate } from '@/types';
import { getCategoryColor, formatText } from '@/utils/colors';

interface RapidUpdatesProps {
  updates: RapidUpdate[];
}

export default function RapidUpdates({ updates }: RapidUpdatesProps) {
  if (updates.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-gray-900">Rapid Updates</h2>
          </div>
          <p className="text-lg text-gray-600">Quick briefings on breaking developments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updates.map((update, index) => {
            const categoryColor = getCategoryColor(update.category);
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 hover:scale-105"
                style={{ borderLeftColor: categoryColor.primary }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: categoryColor.light, 
                      color: categoryColor.primary 
                    }}
                  >
                    {update.category}
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
                
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatText(update.content) }}
                />

                {update.citations.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1">
                      {update.citations.map((citation, citIndex) => (
                        <span
                          key={citIndex}
                          className="text-xs text-gray-500 hover:text-blue-600 cursor-pointer"
                        >
                          [{citIndex + 1}]
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}