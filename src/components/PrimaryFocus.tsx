import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Tag } from 'lucide-react';
import type { PrimaryFocus as PrimaryFocusType } from '@/types';
import { getCategoryColor, formatText } from '@/utils/colors';

interface PrimaryFocusProps {
  data: PrimaryFocusType;
}

export default function PrimaryFocus({ data }: PrimaryFocusProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryColor = getCategoryColor(data.category);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: categoryColor.light, 
                  color: categoryColor.primary 
                }}
              >
                {data.category}
              </div>
              <span className="text-sm text-gray-500">Primary Focus</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {data.title}
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {data.summary}
            </p>

            {/* Key Terms */}
            {data.key_terms.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                <Tag className="h-4 w-4 text-gray-400 mt-1" />
                {data.key_terms.map((term, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    {term}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content Preview */}
          <div className="px-8 pb-6">
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ 
                __html: isExpanded 
                  ? formatText(data.content)
                  : formatText(data.content.substring(0, 300) + (data.content.length > 300 ? '...' : ''))
              }}
            />
          </div>

          {/* Expand Button */}
          {data.content.length > 300 && (
            <div className="px-8 pb-6">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                {isExpanded ? 'Show Less' : 'Read More'}
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          )}

          {/* Expanded Content */}
          {isExpanded && (
            <div className="px-8 pb-8 border-t border-gray-100 pt-6 space-y-6">
              {data.exam_relevance && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Exam Relevance</h4>
                  <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: formatText(data.exam_relevance) }} />
                </div>
              )}
              
              {data.multi_dimensional_impact && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Multi-Dimensional Impact</h4>
                  <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: formatText(data.multi_dimensional_impact) }} />
                </div>
              )}

              {data.historical_context && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Historical Context</h4>
                  <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: formatText(data.historical_context) }} />
                </div>
              )}

              {data.future_implications && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Future Implications</h4>
                  <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: formatText(data.future_implications) }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}