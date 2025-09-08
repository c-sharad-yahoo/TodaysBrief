import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Search, BookOpen, Archive, Home, Info } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (section: string) => void;
}

export default function Header({ onSearch, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'home':
        router.push('/');
        break;
      case 'today':
        router.push('/today');
        break;
      case 'archive':
        router.push('/archive');
        break;
      case 'about':
        // Handle about page when created
        break;
      default:
        onNavigate(section);
        break;
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">Today's Brief</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigate('home')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate('today')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Today's Update
            </button>
            <button
              onClick={() => handleNavigate('archive')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Archive
            </button>
            <button
              onClick={() => handleNavigate('about')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </button>
          </nav>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none outline-none focus:bg-white focus:shadow-lg transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigate('home')}
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>
              <button
                onClick={() => handleNavigate('today')}
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Today's Update</span>
              </button>
              <button
                onClick={() => handleNavigate('archive')}
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <Archive className="h-5 w-5" />
                <span>Archive</span>
              </button>
              <button
                onClick={() => handleNavigate('about')}
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 py-2"
              >
                <Info className="h-5 w-5" />
                <span>About</span>
              </button>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="pt-4 border-t border-gray-200/50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full border-none outline-none focus:bg-white focus:shadow-lg transition-all"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}