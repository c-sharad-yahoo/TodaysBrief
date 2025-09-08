import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../src/components/Header';
import DailyBriefDisplay from '../src/components/DailyBriefDisplay';
import { getDailyBrief, searchBriefs, saveDailyBrief, archiveDailyBrief } from '../src/utils/storage';
import type { DailyBrief } from '../src/types';

// Sample data for September 7, 2025
const sampleDataSept7: DailyBrief = {
  title: "Today's General Studies Brief - September 7, 2025",
  date: "2025-09-07",
  meta: {
    word_count: 1742,
    reading_time: "10 minutes",
    generated_at: "2025-09-07T16:48:00+05:30"
  },
  impact_summary: {
    policy_developments: 3,
    international_updates: 2,
    economic_indicators: 2,
    scientific_advances: 2
  },
  primary_focus: {
    title: "GST 2.0 Reforms: India's Next-Generation Tax Structure Takes Effect",
    category: "Economic",
    summary: "Union Finance Minister Nirmala Sitharaman announced comprehensive GST reforms featuring a simplified two-tier structure (5% and 18%) effective September 22, 2025. These reforms represent the most significant tax policy overhaul since GST implementation in 2017.",
    content: "The GST Council unanimously approved a revolutionary reform package that consolidates the current multi-slab structure into just two rates - 5% and 18% - while maintaining exemptions on essential goods. The reforms prioritize common man relief, support for labour-intensive industries, agriculture sector benefits, and healthcare affordability. Implementation will be phased, with tobacco products retaining existing higher rates until compensation cess obligations are cleared. Prime Minister Modi hailed these as next-generation reforms that will drive consumption and manufacturing growth across India.",
    exam_relevance: "Critical for Economics syllabus covering indirect taxation, federal fiscal relations, and tax policy analysis. Connects to Constitutional provisions on GST under Article 246A and cooperative federalism principles. Relevant for Public Finance topics in UPSC Mains GS-III.",
    multi_dimensional_impact: "Economically boosts consumption and reduces compliance burden; politically strengthens federal cooperation through consensus-building; socially benefits common households through lower rates on essentials; internationally enhances India's business environment rankings and investment attractiveness.",
    key_terms: ["GST Council", "Two-tier structure", "Compensation cess", "Federal consensus"],
    historical_context: "Builds on 2017 GST implementation and addresses complexity concerns raised over seven years of operation, similar to VAT simplifications in European Union during 1990s.",
    future_implications: "Expected to increase tax compliance, reduce litigation, boost GDP growth by 0.5-1%, and serve as model for other developing economies implementing unified tax systems.",
    citations: ["2", "3", "7"]
  },
  sections: [
    {
      id: "governance",
      title: "Governance and Policy Updates",
      summary: "Key policy developments and administrative reforms shaping governance structures",
      articles: [
        {
          title: "Banking Laws Amendment Act 2025 Strengthens Financial Governance",
          summary: "Comprehensive banking reforms enhance governance standards, audit quality, and depositor protection across public and cooperative banks",
          development_overview: "The Banking Laws Amendment Act 2025, effective from August 1, introduces 19 amendments across five key banking legislations including RBI Act 1934 and Banking Regulation Act 1949. Key changes include raising conflict-of-interest threshold from Rs 5 lakh to Rs 2 crore, extending cooperative bank director tenure to 10 years, and enabling PSBs to transfer unclaimed deposits to IEPF.",
          policy_significance: "The reforms align banking governance with constitutional norms and modern corporate standards, enhancing accountability and depositor trust. PSBs can now directly remunerate statutory auditors, expected to attract higher-quality professionals and improve audit standards. The legislation addresses governance gaps identified over decades of banking evolution.",
          exam_connection: "Essential for Banking Awareness sections across SSC, Banking exams, and UPSC Economic Survey coverage. Links to Constitutional provisions on cooperative governance (97th Amendment) and financial sector reforms under Economic Liberalization topics.",
          analytical_perspectives: "Proponents argue enhanced governance will reduce NPAs and improve banking efficiency. Critics question whether structural changes alone can address deep-rooted issues without cultural transformation in public sector banks.",
          key_terms: ["IEPF alignment", "Statutory auditor remuneration"],
          citations: ["4"]
        }
      ]
    }
  ],
  rapid_updates: [
    {
      category: "Environment and Climate", 
      content: "India's steel demand projected to triple by 2050, lifting global market share from 8% to 21% as China's dominance contracts, positioning India as key driver of long-term global steel growth",
      citations: ["7"]
    }
  ],
  exam_intelligence: {
    new_concepts: "GST 2.0 represents next-generation tax reform with simplified two-tier structure (5% and 18%) replacing complex multi-slab system.",
    static_dynamic_connections: "GST reforms connect to Constitutional Article 246A on taxation powers and 101st Amendment introducing GST.",
    question_probability: "High probability topics include GST 2.0 implementation mechanism and banking law amendments.",
    factual_database: "GST implementation date: September 22 2025, Banking Laws Amendment Act effective: August 1, 2025",
    comparative_analysis: "GST 2.0 vs original GST (2017): simplified structure vs complex multi-slab."
  },
  knowledge_synthesis: {
    cross_subject_connections: "Economic reforms (GST 2.0) connect to polity (federal relations), geography (regional economic impact), and social development (common man benefits).",
    historical_parallels: "GST simplification mirrors 1991 economic liberalization's complexity reduction approach.",
    predictive_analysis: "GST 2.0 success likely to accelerate further tax reforms and possibly influence state-level taxation.",
    debate_points: "GST rate reduction vs revenue impact debate: simplified structure benefits vs potential fiscal deficit concerns."
  }
};

// Sample data for September 8, 2025
const sampleDataSept8: DailyBrief = {
  title: "Today's General Studies Brief",
  date: "2025-09-08",
  meta: {
    word_count: 1750,
    reading_time: "10 minutes",
    generated_at: "2025-09-08T12:20:00+05:30"
  },
  impact_summary: {
    policy_developments: 3,
    international_updates: 3,
    economic_indicators: 2,
    scientific_advances: 2
  },
  primary_focus: {
    title: "India Expands Digital Censorship Powers to District-Level Officers",
    category: "Governance",
    summary: "Government introduces new censorship mechanism allowing district-level officials to demand social media content takedowns. This represents significant expansion of state control over digital platforms.",
    content: "The Indian government has implemented a new digital censorship framework that empowers even district-level officers to demand social media companies remove posts, marking a substantial expansion of content regulation powers beyond central authorities. This development comes amid growing concerns about misinformation and digital platform governance, but raises questions about potential misuse of expanded censorship capabilities. The mechanism allows local administrative officials to directly engage with social media firms for content removal, streamlining the process but potentially creating inconsistent enforcement standards across different jurisdictions. Legal experts suggest this could lead to increased litigation and compliance challenges for digital platforms operating in India.",
    exam_relevance: "Directly connects to Constitutional provisions on freedom of speech and expression (Article 19), Information Technology Act provisions, and digital governance frameworks in Public Administration syllabus.",
    multi_dimensional_impact: "Politically, this strengthens state control over digital discourse while potentially creating federalism tensions. Economically, it may increase compliance costs for tech companies. Socially, it could impact civil liberties and democratic discourse. Internationally, it may draw criticism from digital rights organizations.",
    key_terms: ["Digital Censorship", "IT Act", "Content Moderation", "Administrative Powers"],
    historical_context: "Builds on IT Rules 2021 and previous social media regulations, reflecting global trend toward platform accountability while raising concerns about overreach.",
    future_implications: "May lead to more stringent digital governance frameworks and potential challenges in courts regarding balance between regulation and free speech.",
    citations: ["18"]
  },
  sections: [
    {
      id: "governance",
      title: "Governance and Policy Updates",
      summary: "Key policy developments and administrative reforms shaping governance structures",
      articles: [
        {
          title: "India-EU Free Trade Agreement Talks Advance",
          summary: "Bilateral trade negotiations gain momentum with focus on market access and regulatory convergence",
          development_overview: "India and European Union are making significant headway in free trade agreement negotiations as talks advance on September 8, 2025. The discussions focus on reducing tariff barriers, improving market access, and establishing regulatory frameworks for enhanced bilateral trade. Key stakeholders include Ministry of External Affairs, Commerce Ministry, and EU trade representatives working on comprehensive economic partnership.",
          policy_significance: "This agreement could significantly boost India's export potential, particularly in services and pharmaceuticals, while providing European companies better access to Indian markets. Implementation challenges include reconciling different regulatory standards and addressing agricultural trade concerns. The agreement aligns with India's strategy of diversifying trade partnerships beyond traditional partners.",
          exam_connection: "Relevant to International Trade, WTO provisions, India's foreign trade policy, and economic diplomacy components of General Studies. Connects to balance of payments, trade deficit concepts in Economics.",
          analytical_perspectives: "Proponents argue this will boost economic growth and technological transfer. Critics worry about impact on domestic industries and agricultural sector. Environmental groups focus on sustainability clauses in trade agreements.",
          key_terms: ["Free Trade Agreement", "Market Access", "Economic Partnership"],
          citations: ["6"]
        }
      ]
    }
  ],
  rapid_updates: [
    {
      category: "Environment and Climate",
      content: "Green hydrogen pilot projects at ports demonstrate India's commitment to clean energy transition and achieving net-zero targets by 2070 through innovative infrastructure integration.",
      citations: ["10"]
    }
  ],
  exam_intelligence: {
    new_concepts: "Digital Censorship Powers: Administrative authority to demand content removal from social media platforms.",
    static_dynamic_connections: "Constitutional provisions on free speech connect with digital censorship developments.",
    question_probability: "High probability topics include digital governance frameworks and India-EU trade negotiations.",
    factual_database: "Digital censorship framework implementation: September 2025, India-EU FTA talks: September 8, 2025",
    comparative_analysis: "Compare digital governance expansion with traditional media regulation frameworks."
  },
  knowledge_synthesis: {
    cross_subject_connections: "Digital governance combines constitutional law, public administration, and technology policy.",
    historical_parallels: "Current digital censorship debates echo emergency period press restrictions.",
    predictive_analysis: "Expect increased digital governance litigation challenging new censorship powers.",
    debate_points: "Balance between digital regulation and free speech rights."
  }
};

export default function TodayPage() {
  const [currentData, setCurrentData] = useState<DailyBrief | null>(null);
  const [searchResults, setSearchResults] = useState<DailyBrief[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Try to load saved data, fallback to sample data
    const savedData = getDailyBrief();
    if (savedData) {
      setCurrentData(savedData);
    } else {
      // Archive the September 7th data first
      archiveDailyBrief(sampleDataSept7);
      
      // Then save current data
      saveDailyBrief(sampleDataSept8);
      setCurrentData(sampleDataSept8);
    }
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      const results = searchBriefs(query);
      setSearchResults(results);
      setIsSearchMode(true);
    } else {
      setIsSearchMode(false);
      setSearchResults([]);
    }
  };

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'home':
        router.push('/');
        break;
      case 'archive':
        router.push('/archive');
        break;
      case 'about':
        // Handle about page navigation
        break;
      default:
        break;
    }
  };

  if (isSearchMode) {
    return (
      <div className="min-h-screen bg-white">
        <Header onSearch={handleSearch} onNavigate={handleNavigate} />
        <div className="pt-24 min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Search Results ({searchResults.length})
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="space-y-8">
                {searchResults.map((result, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{result.date}</p>
                    <p className="text-gray-700">{result.primary_focus.summary}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">No results found. Try a different search term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} />
      
      {currentData ? (
        <DailyBriefDisplay briefData={currentData} />
      ) : (
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Today's Brief...</h2>
            <p className="text-gray-600">Please wait while we fetch the latest content.</p>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Today's Brief</h3>
            <p className="text-gray-300 mb-6">
              Your daily comprehensive briefing for competitive examinations
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <span>© 2024 Today's Brief</span>
              <span>•</span>
              <span>Powered by automated JSON webhooks</span>
              <span>•</span>
              <span>Built for serious students</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}