export interface ImpactSummary {
  policy_developments: number;
  international_updates: number;
  economic_indicators: number;
  scientific_advances: number;
}

export interface Article {
  title: string;
  summary: string;
  development_overview?: string;
  global_update?: string;
  economic_update?: string;
  research_update?: string;
  social_update?: string;
  policy_significance?: string;
  exam_connection?: string;
  exam_relevance?: string;
  exam_integration?: string;
  analytical_perspectives?: string;
  key_terms: string[];
  historical_context?: string;
  future_implications?: string;
  citations: string[];
}

export interface PrimaryFocus extends Article {
  category: string;
  content: string;
  multi_dimensional_impact: string;
}

export interface Section {
  id: string;
  title: string;
  summary: string;
  articles: Article[];
}

export interface RapidUpdate {
  category: string;
  content: string;
  citations: string[];
}

export interface ExamIntelligence {
  new_concepts: string;
  static_dynamic_connections: string;
  question_probability: string;
  factual_database: string;
  comparative_analysis: string;
}

export interface KnowledgeSynthesis {
  cross_subject_connections: string;
  historical_parallels: string;
  predictive_analysis: string;
  debate_points: string;
}

export interface WeeklyAnalysis {
  emerging_trends: string;
  policy_trajectory: string;
  economic_indicators: string;
}

export interface Meta {
  word_count: number;
  reading_time: string;
  generated_at: string;
}

export interface DailyBrief {
  title: string;
  date: string;
  meta: Meta;
  impact_summary: ImpactSummary;
  primary_focus: PrimaryFocus;
  sections: Section[];
  rapid_updates: RapidUpdate[];
  exam_intelligence: ExamIntelligence;
  knowledge_synthesis: KnowledgeSynthesis;
  weekly_analysis?: WeeklyAnalysis;
}

export interface SearchFilters {
  category?: string;
  dateRange?: 'today' | 'week' | 'month' | 'all';
  searchTerm?: string;
}