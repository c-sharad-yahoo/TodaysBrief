import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodayPage from './pages/TodayPage';
import ArchivePage from './pages/ArchivePage';
import BriefDetailPage from './pages/BriefDetailPage';
import WebhookHandler from './api/WebhookHandler';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="/brief/:date" element={<BriefDetailPage />} />
        <Route path="/api/daily-update" element={<WebhookHandler />} />
      </Routes>
    </div>
  );
}

export default App;