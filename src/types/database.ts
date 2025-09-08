export interface Database {
  public: {
    Tables: {
      daily_briefs: {
        Row: {
          id: string;
          title: string;
          date: string;
          meta: {
            word_count: number;
            reading_time: string;
            generated_at: string;
          };
          impact_summary: {
            policy_developments: number;
            international_updates: number;
            economic_indicators: number;
            scientific_advances: number;
          };
          primary_focus: {
            title: string;
            category: string;
            summary: string;
            content: string;
            exam_relevance?: string;
            multi_dimensional_impact?: string;
            key_terms: string[];
            historical_context?: string;
            future_implications?: string;
            citations: string[];
          };
          sections: Array<{
            id: string;
            title: string;
            summary: string;
            articles: Array<{
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
            }>;
          }>;
          rapid_updates: Array<{
            category: string;
            content: string;
            citations: string[];
          }>;
          exam_intelligence: {
            new_concepts: string;
            static_dynamic_connections: string;
            question_probability: string;
            factual_database: string;
            comparative_analysis: string;
          };
          knowledge_synthesis: {
            cross_subject_connections: string;
            historical_parallels: string;
            predictive_analysis: string;
            debate_points: string;
          };
          weekly_analysis?: {
            emerging_trends: string;
            policy_trajectory: string;
            economic_indicators: string;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          date: string;
          meta: {
            word_count: number;
            reading_time: string;
            generated_at: string;
          };
          impact_summary: {
            policy_developments: number;
            international_updates: number;
            economic_indicators: number;
            scientific_advances: number;
          };
          primary_focus: {
            title: string;
            category: string;
            summary: string;
            content: string;
            exam_relevance?: string;
            multi_dimensional_impact?: string;
            key_terms: string[];
            historical_context?: string;
            future_implications?: string;
            citations: string[];
          };
          sections: Array<{
            id: string;
            title: string;
            summary: string;
            articles: Array<{
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
            }>;
          }>;
          rapid_updates: Array<{
            category: string;
            content: string;
            citations: string[];
          }>;
          exam_intelligence: {
            new_concepts: string;
            static_dynamic_connections: string;
            question_probability: string;
            factual_database: string;
            comparative_analysis: string;
          };
          knowledge_synthesis: {
            cross_subject_connections: string;
            historical_parallels: string;
            predictive_analysis: string;
            debate_points: string;
          };
          weekly_analysis?: {
            emerging_trends: string;
            policy_trajectory: string;
            economic_indicators: string;
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          date?: string;
          meta?: {
            word_count: number;
            reading_time: string;
            generated_at: string;
          };
          impact_summary?: {
            policy_developments: number;
            international_updates: number;
            economic_indicators: number;
            scientific_advances: number;
          };
          primary_focus?: {
            title: string;
            category: string;
            summary: string;
            content: string;
            exam_relevance?: string;
            multi_dimensional_impact?: string;
            key_terms: string[];
            historical_context?: string;
            future_implications?: string;
            citations: string[];
          };
          sections?: Array<{
            id: string;
            title: string;
            summary: string;
            articles: Array<{
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
            }>;
          }>;
          rapid_updates?: Array<{
            category: string;
            content: string;
            citations: string[];
          }>;
          exam_intelligence?: {
            new_concepts: string;
            static_dynamic_connections: string;
            question_probability: string;
            factual_database: string;
            comparative_analysis: string;
          };
          knowledge_synthesis?: {
            cross_subject_connections: string;
            historical_parallels: string;
            predictive_analysis: string;
            debate_points: string;
          };
          weekly_analysis?: {
            emerging_trends: string;
            policy_trajectory: string;
            economic_indicators: string;
          };
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}