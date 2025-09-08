import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Tag } from 'lucide-react';
import type { Section, Article } from '@/types';
import { getCategoryColor, formatText } from '@/utils/colors';

interface SectionCardProps {
  section: Section;
}

interface ArticleCardProps {
  article: Article;
  categoryColor: ReturnType<typeof getCategoryColor>;
}

function ArticleCard({ article, categoryColor }: ArticleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMainContent = () => {
    return article.development_overview || 
           article.global_update || 
           article.economic_update || 
           article.research_update || 
           article.social_update || '';
  };

  const getExamConnection = () => {
    return article.exam_connection || 
           article.exam_relevance || 
           article.exam_integration || '';
  };

  const mainContent = getMainContent();
  const examConnection = getExamConnection();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300">
      <h4 className="font-semibold text-gray-900 mb-3 text-lg leading-tight">
        {article.title}
      </h4>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
        {article.summary}
      </p>

      {/* Key Terms */}
      {article.key_terms.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Tag className="h-4 w-4 text-gray-400 mt-0.5" />
          {article.key_terms.slice(0, 3).map((term, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium rounded-md"
              style={{ 
                backgroundColor: categoryColor.light, 
                color: categoryColor.primary 
              }}
            >
              {term}
            </span>
          ))}
          {article.key_terms.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{article.key_terms.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Expand for more details */}
      {(mainContent || examConnection) && (
        <>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-medium transition-colors mb-4"
            style={{ color: categoryColor.primary }}
          >
            <ExternalLink className="h-4 w-4" />
            {isExpanded ? 'Show Less' : 'Read More'}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-gray-100">
              {mainContent && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Overview</h5>
                  <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(mainContent) }} />
                </div>
              )}
              
              {article.policy_significance && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Policy Significance</h5>
                  <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(article.policy_significance) }} />
                </div>
              )}

              {examConnection && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Exam Connection</h5>
                  <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(examConnection) }} />
                </div>
              )}

              {article.analytical_perspectives && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Analysis</h5>
                  <p className="text-gray-700 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(article.analytical_perspectives) }} />
                </div>
              )}

              {/* All Key Terms */}
              {article.key_terms.length > 3 && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">All Key Terms</h5>
                  <div className="flex flex-wrap gap-1">
                    {article.key_terms.map((term, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-md"
                        style={{ 
                          backgroundColor: categoryColor.light, 
                          color: categoryColor.primary 
                        }}
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SectionCard({ section }: SectionCardProps) {
  const categoryColor = getCategoryColor(section.id);

  return (
    <section className="mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="h-1 w-12 rounded-full"
              style={{ backgroundColor: categoryColor.primary }}
            />
            <h3 className="text-2xl font-bold text-gray-900">
              {section.title}
            </h3>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            {section.summary}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.articles.map((article, index) => (
            <ArticleCard 
              key={index} 
              article={article} 
              categoryColor={categoryColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}