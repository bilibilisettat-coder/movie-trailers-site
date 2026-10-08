import { X, Film, Zap, Globe, Database, ShieldCheck } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs"
    >
      <div className="bg-white border border-zinc-200 rounded-xl max-w-xl w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 p-1 rounded-md hover:bg-zinc-100"
          aria-label="Close about dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-md bg-zinc-900 text-white flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-zinc-950">About CinemaTrailers</h2>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 mb-6 leading-relaxed">
          CinemaTrailers is a lightweight, high-performance cinema platform designed in the clean aesthetic of GeneratePress and Astra. We aggregate official high-definition movie trailers, production details, and release dates without bloated animations or intrusive ad layers.
        </p>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-700">
          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg flex items-start gap-3">
            <Zap className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-zinc-900 mb-0.5">Ultra-Lightweight & Fast</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Optimized to meet GTmetrix score ≥ 90 criteria with asset caching, zero-layout-shift aspect ratios, asynchronous image decoding, and CDN delivery.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg flex items-start gap-3">
            <Database className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-zinc-900 mb-0.5">TMDB Database Engine</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Powered by The Movie Database (TMDB) API v3 for up-to-the-minute global release schedules, official YouTube trailer links, user scores, and cast credits.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg flex items-start gap-3">
            <Globe className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-zinc-900 mb-0.5">Mobile-First Standards</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Built adhering strictly to Google Mobile-Friendly requirements, with touch targets ≥ 44px, fluid responsive grids, and accessible controls.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-zinc-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-zinc-900 mb-0.5">Editorial Contact</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Reach our team directly for media inquiries or trailer syndication at <a href="mailto:yourmovies@movies.com" className="font-semibold underline text-zinc-900">yourmovies@movies.com</a>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
