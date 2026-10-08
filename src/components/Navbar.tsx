import { useState } from 'react';
import { Film, Search, Menu, X, Mail, Info, Shield } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onOpenAbout: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export function Navbar({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onOpenAbout,
  onOpenPrivacy,
  onOpenContact,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'popular', label: 'Popular' },
    { id: 'now_playing', label: 'Now Playing' },
    { id: 'top_rated', label: 'Top Rated' },
    { id: 'upcoming', label: 'Upcoming' },
  ];

  const handleTabClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo - Astra/GeneratePress lightweight style */}
          <div
            onClick={() => handleTabClick('popular')}
            className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none"
          >
            <div className="w-9 h-9 rounded-md bg-zinc-900 text-white flex items-center justify-center shadow-xs">
              <Film className="w-5 h-5 text-zinc-100" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight text-zinc-900 leading-none">
                Cinema<span className="text-zinc-600 font-normal">Trailers</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                HD Official Trailers
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleTabClick(link.id)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeTab === link.id && !searchQuery
                    ? 'text-zinc-950 font-semibold bg-zinc-100'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={onSearchSubmit} className="hidden sm:flex items-center relative flex-1 max-w-xs lg:max-w-sm">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search movies or trailers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs lg:text-sm bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-colors"
            />
          </form>

          {/* Quick Actions (Contact, About, Privacy) */}
          <div className="hidden lg:flex items-center space-x-2 text-xs text-zinc-600 border-l border-zinc-200 pl-4">
            <button
              onClick={onOpenContact}
              className="px-2.5 py-1.5 rounded-md hover:bg-zinc-100 text-zinc-700 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              Contact
            </button>
            <button
              onClick={onOpenAbout}
              className="px-2.5 py-1.5 rounded-md hover:bg-zinc-100 text-zinc-700 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Info className="w-3.5 h-3.5" />
              About
            </button>
            <button
              onClick={onOpenPrivacy}
              className="px-2.5 py-1.5 rounded-md hover:bg-zinc-100 text-zinc-700 flex items-center gap-1.5 transition-colors font-medium"
            >
              <Shield className="w-3.5 h-3.5" />
              Privacy
            </button>
          </div>

          {/* Mobile menu button (Accessible touch target >= 44px) */}
          <div className="flex sm:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-md text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="sm:hidden pb-3">
          <form onSubmit={onSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search movie trailers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-md text-zinc-900 placeholder-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
            />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-100">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleTabClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                  activeTab === link.id && !searchQuery
                    ? 'bg-zinc-900 text-white'
                    : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-1 pt-1 text-sm text-zinc-700">
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-md text-left hover:bg-zinc-50 flex items-center gap-2 min-h-[44px]"
            >
              <Mail className="w-4 h-4 text-zinc-500" />
              Contact Us (yourmovies@movies.com)
            </button>
            <button
              onClick={() => {
                onOpenAbout();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-md text-left hover:bg-zinc-50 flex items-center gap-2 min-h-[44px]"
            >
              <Info className="w-4 h-4 text-zinc-500" />
              About CinemaTrailers
            </button>
            <button
              onClick={() => {
                onOpenPrivacy();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2.5 rounded-md text-left hover:bg-zinc-50 flex items-center gap-2 min-h-[44px]"
            >
              <Shield className="w-4 h-4 text-zinc-500" />
              Privacy Policy
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
