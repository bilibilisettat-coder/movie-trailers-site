import { Film, Mail, Shield, Info, FileText } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAbout: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export function Footer({ onSelectTab, onOpenAbout, onOpenPrivacy, onOpenContact }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-zinc-950 text-white flex items-center justify-center">
                <Film className="w-4 h-4 text-zinc-100" />
              </div>
              <span className="font-bold text-base text-zinc-950 tracking-tight">
                CinemaTrailers
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Ultra-lightweight movie discovery portal built on GeneratePress and Astra clean architecture. Instant official HD trailers with zero bloated animations.
            </p>
            <div className="pt-1">
              <a
                href="mailto:yourmovies@movies.com"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-900 hover:underline"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                yourmovies@movies.com
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-3">
              Explore Cinema
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('popular')}
                  className="hover:text-zinc-950 transition-colors"
                >
                  Popular Movies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('now_playing')}
                  className="hover:text-zinc-950 transition-colors"
                >
                  Now Playing in Theaters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('top_rated')}
                  className="hover:text-zinc-950 transition-colors"
                >
                  Top Rated All Time
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('upcoming')}
                  className="hover:text-zinc-950 transition-colors"
                >
                  Upcoming Releases
                </button>
              </li>
            </ul>
          </div>

          {/* Information & Legal */}
          <div>
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-3">
              Company & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-zinc-950 transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3 h-3 text-zinc-400" />
                  About CinemaTrailers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-zinc-950 transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-zinc-400" />
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-zinc-950 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3 h-3 text-zinc-400" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <a
                  href="/llm.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-zinc-400" />
                  llm.txt Manifest
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 transition-colors flex items-center gap-1.5 text-zinc-500"
                >
                  robots.txt
                </a>
              </li>
            </ul>
          </div>

          {/* Attribution & Standards */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-3">
              Database Attribution
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
            <div className="pt-2 text-[11px] text-zinc-400 space-y-1">
              <div>GTmetrix Score Target: ≥ 90</div>
              <div>Mobile-First Optimized</div>
              <div>Clean Lightweight Theme</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} CinemaTrailers. All rights reserved. Direct inquiries to{' '}
            <a href="mailto:yourmovies@movies.com" className="text-zinc-600 underline">
              yourmovies@movies.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-zinc-600">Privacy</button>
            <span>•</span>
            <button onClick={onOpenContact} className="hover:text-zinc-600">Contact</button>
            <span>•</span>
            <a href="/robots.txt" className="hover:text-zinc-600">Robots</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
