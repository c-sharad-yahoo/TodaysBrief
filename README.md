# Today's Brief

A comprehensive daily briefing platform designed specifically for competitive examination students preparing for UPSC, SSC, Banking, Railways, and State PSC examinations.

## 🎯 Overview

Today's Brief provides automated daily content updates covering current affairs across all major domains including Governance, Economics, International Affairs, Science & Technology, and Social Development. Each brief includes exam-focused analysis, static-dynamic connections, and strategic insights for effective preparation.

## ✨ Features

- **Daily Automated Updates**: Fresh content delivered via JSON webhook integration
- **Impact Dashboard**: Visual summary of daily developments across key domains
- **Primary Focus Analysis**: In-depth coverage of the day's most significant development
- **Multi-Domain Coverage**: Comprehensive sections covering all exam-relevant areas
- **Rapid Updates**: Quick briefings on breaking developments
- **Knowledge Integration**: 
  - Exam intelligence with question probability insights
  - Cross-subject connections and historical parallels
  - Static-dynamic knowledge linking
- **Archive System**: Organized monthly archives with advanced search capabilities
- **Responsive Design**: Optimized for all devices with modern UI/UX
- **Exam-Focused Content**: Every article includes exam relevance and analytical perspectives

## 🛠 Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL) - *Integration in progress*
- **Deployment**: Render (configured via render.yaml)
- **Content Management**: JSON webhook API for automated updates
- **Data Validation**: AJV schema validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for database integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd todays-brief
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   **To get these values:**
   - Sign up at [Supabase](https://supabase.com)
   - Create a new project
   - Go to Settings → API
   - Copy your Project URL and anon/public key

4. **Database Setup** *(Coming Soon)*
   
   The application will include automated database schema setup for Supabase integration.

### Running the Application

**Development Server**
```bash
npm run dev
```

**Production Build**
```bash
npm run build
npm run start
```

**Linting**
```bash
npm run lint
```

Visit `http://localhost:3000` to view the application.

## 📊 Content Management

### Webhook Integration

The application receives daily content updates via a webhook endpoint:

- **Endpoint**: `POST /api/daily-update`
- **Content Type**: `application/json`
- **Validation**: Automatic payload validation using AJV schemas
- **Storage**: Data will be persisted to Supabase database *(integration in progress)*

### Current Data Flow

1. **Sample Data**: Currently uses pre-loaded sample data for demonstration
2. **Local Storage**: Temporary client-side storage for development
3. **Future**: Full Supabase integration for persistent, centralized content management

### Content Structure

Each daily brief includes:
- **Meta Information**: Word count, reading time, generation timestamp
- **Impact Summary**: Quantified developments across domains
- **Primary Focus**: Main story with detailed analysis
- **Domain Sections**: Categorized articles with exam connections
- **Rapid Updates**: Breaking news and quick briefings
- **Knowledge Integration**: Exam intelligence and synthesis

## 🏗 Architecture

```
├── src/
│   ├── components/          # React components
│   ├── types/              # TypeScript interfaces
│   ├── utils/              # Utility functions and helpers
│   └── App.tsx             # Main application component
├── pages/                  # Next.js pages and API routes
│   ├── api/               # API endpoints (webhook)
│   ├── brief/[date].tsx   # Individual brief pages
│   ├── archive.tsx        # Archive browsing
│   ├── today.tsx          # Current day's brief
│   └── index.tsx          # Landing page
├── public/                # Static assets
└── styles/                # Global styles
```

## 🚀 Deployment

### Render Deployment

The project includes `render.yaml` configuration for easy deployment to Render:

1. Connect your GitHub repository to Render
2. Render will automatically detect the configuration
3. Set environment variables in Render dashboard
4. Deploy with automatic builds on git push

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🔄 Development Roadmap

### Phase 1: Database Integration *(In Progress)*
- [ ] Complete Supabase integration
- [ ] Database schema setup with migrations
- [ ] Webhook data persistence
- [ ] Archive functionality with database queries

### Phase 2: Enhanced Features
- [ ] User authentication and personalization
- [ ] Advanced search with filters
- [ ] Bookmark and favorites system
- [ ] Email notifications for daily updates
- [ ] Mobile app development

### Phase 3: Analytics & Insights
- [ ] Reading analytics and progress tracking
- [ ] Personalized exam preparation insights
- [ ] Performance metrics and recommendations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 API Documentation

### Webhook Endpoint

**POST** `/api/daily-update`

Accepts daily brief data in JSON format. See `src/types/index.ts` for the complete `DailyBrief` interface.

**Example payload structure:**
```json
{
  "title": "Today's General Studies Brief",
  "date": "2025-01-XX",
  "meta": {
    "word_count": 1750,
    "reading_time": "10 minutes",
    "generated_at": "2025-01-XX"
  },
  "impact_summary": {
    "policy_developments": 3,
    "international_updates": 2,
    "economic_indicators": 2,
    "scientific_advances": 1
  },
  // ... additional fields
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Designed specifically for competitive examination students
- Automated content delivery system for consistent updates
- Responsive design ensuring accessibility across all devices

---

**Note**: This project is actively under development. The Supabase integration is currently being implemented to replace the temporary localStorage system with persistent, centralized content management.