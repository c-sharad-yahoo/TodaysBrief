import React, { useState } from 'react';
import HeroSection from './HeroSection';
import ImpactDashboard from './ImpactDashboard';
import PrimaryFocus from './PrimaryFocus';
import SectionCard from './SectionCard';
import RapidUpdates from './RapidUpdates';
import KnowledgeSidebar from './KnowledgeSidebar';
import { searchBriefs } from '@/utils/storage';
import type { DailyBrief, SearchFilters } from '@/types';

interface DailyBriefDisplayProps {
  briefData: DailyBrief;
}

export default function DailyBriefDisplay({ briefData }: DailyBriefDisplayProps) {
  return (
    <div>
      <HeroSection data={briefData} />
      <ImpactDashboard data={briefData.impact_summary} />
      <PrimaryFocus data={briefData.primary_focus} />
      
      <div className="py-16 bg-white">
        {briefData.sections.map((section, index) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>

      <RapidUpdates updates={briefData.rapid_updates} />
      
      <KnowledgeSidebar 
        examIntelligence={briefData.exam_intelligence}
        knowledgeSynthesis={briefData.knowledge_synthesis}
      />
    </div>
  );
}