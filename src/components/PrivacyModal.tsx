import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
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
          aria-label="Close privacy dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-md bg-zinc-900 text-white flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-zinc-950">Privacy Policy</h2>
        </div>

        <p className="text-xs text-zinc-500 mb-5">
          Effective Date: October 2026 • Last updated: October 8, 2026
        </p>

        <div className="space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed">
          <section>
            <h3 className="font-bold text-zinc-900 mb-1 text-sm">1. Overview</h3>
            <p className="text-xs text-zinc-600">
              CinemaTrailers (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This policy outlines how information is handled when using our movie trailer discovery platform.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-zinc-900 mb-1 text-sm">2. Information Collection</h3>
            <p className="text-xs text-zinc-600">
              We do not require user account registration, payment methods, or personal identity tracking. We do not sell or monetize personal browsing history. Form submissions sent to <span className="font-semibold text-zinc-900">yourmovies@movies.com</span> are retained solely for direct communication and support.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-zinc-900 mb-1 text-sm">3. Third-Party Services & APIs</h3>
            <p className="text-xs text-zinc-600">
              This application interfaces with:
            </p>
            <ul className="list-disc pl-5 text-xs text-zinc-600 space-y-1 mt-1">
              <li><strong>The Movie Database (TMDB) API:</strong> Supplies public movie metadata and promotional imagery.</li>
              <li><strong>YouTube Embedded Players:</strong> Renders official video trailers under YouTube&apos;s privacy-enhanced mode (youtube-nocookie.com).</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-zinc-900 mb-1 text-sm">4. Cookies & Performance Storage</h3>
            <p className="text-xs text-zinc-600">
              To guarantee fast loading speed consistent with GTmetrix standards, client-side session caching may store movie catalog responses locally in memory during your active session. No tracking cookies are permanently planted.
            </p>
          </section>

          <section>
            <h3 className="font-bold text-zinc-900 mb-1 text-sm">5. Contact Information</h3>
            <p className="text-xs text-zinc-600">
              For privacy-related questions, data removal requests, or copyright inquiries, contact our Data Protection Officer at:{' '}
              <a href="mailto:yourmovies@movies.com" className="font-semibold text-zinc-900 underline">
                yourmovies@movies.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold rounded-md transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
