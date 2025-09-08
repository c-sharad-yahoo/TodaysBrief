import React, { useState } from 'react';
import { Brain, BookOpen, TrendingUp, Target, ChevronDown, ChevronUp } from 'lucide-react';
import type { ExamIntelligence, KnowledgeSynthesis } from '@/types';
import { formatText } from '@/utils/colors';

interface KnowledgeSidebarProps {
  examIntelligence: ExamIntelligence;
  knowledgeSynthesis: KnowledgeSynthesis;
}

interface SectionProps {
  title: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function ExpandableSection({ title, content, icon: Icon, color }: SectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-6 w-6 ${color}`} />
          <h3 className="font-semibold text-gray-900 text-left">{title}</h3>
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>
      
      {isExpanded && (
        <div 
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatText(content) }}
        />
      )}
      
      {!isExpanded && (
        <p className="text-gray-600 text-sm leading-relaxed">
          {content.length > 100 ? content.substring(0, 100) + '...' : content}
        </p>
      )}
    </div>
  );
}

export default function KnowledgeSidebar({ examIntelligence, knowledgeSynthesis }: KnowledgeSidebarProps) {
  const sections = [
    {
      title: 'New Concepts',
      content: examIntelligence.new_concepts,
      icon: Brain,
      color: 'text-purple-600'
    },
    {
      title: 'Static-Dynamic Links',
      content: examIntelligence.static_dynamic_connections,
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      title: 'Question Probability',
      content: examIntelligence.question_probability,
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Cross-Subject Connections',
      content: knowledgeSynthesis.cross_subject_connections,
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Historical Parallels',
      content: knowledgeSynthesis.historical_parallels,
      icon: BookOpen,
      color: 'text-indigo-600'
    },
    {
      title: 'Debate Points',
      content: knowledgeSynthesis.debate_points,
      icon: Target,
      color: 'text-red-600'
    }
  ];

  return (
    <aside className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Knowledge Integration</h2>
          <p className="text-lg text-gray-600">Strategic insights for exam preparation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <ExpandableSection key={index} {...section} />
          ))}
        </div>

        {/* Factual Database */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <Brain className="h-6 w-6 text-blue-600" />
            Factual Database
          </h3>
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatText(examIntelligence.factual_database) }}
          />
        </div>

        {/* Comparative Analysis */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
            Comparative Analysis
          </h3>
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatText(examIntelligence.comparative_analysis) }}
          />
        </div>
      </div>
    </aside>
  );
}