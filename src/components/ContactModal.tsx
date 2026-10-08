import { useState } from 'react';
import { X, Mail, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs"
    >
      <div className="bg-white border border-zinc-200 rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 p-1 rounded-md hover:bg-zinc-100"
          aria-label="Close contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-8 h-8 rounded-md bg-zinc-900 text-white flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-bold text-zinc-950">Contact CinemaTrailers</h2>
        </div>

        <p className="text-xs sm:text-sm text-zinc-600 mb-5 leading-relaxed">
          Questions, trailer submissions, licensing or partnership inquiries? Reach our editorial desk directly at{' '}
          <a
            href="mailto:yourmovies@movies.com"
            className="font-semibold text-zinc-950 underline hover:text-zinc-700"
          >
            yourmovies@movies.com
          </a>
          .
        </p>

        {submitted ? (
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-lg text-center space-y-2 my-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-zinc-900">Message Dispatched</h3>
            <p className="text-xs text-zinc-600">
              Thank you for writing to us. Our editorial staff will reply via <strong>yourmovies@movies.com</strong> within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Your Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Trailer Inquiry / Correction / General Feedback"
                className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1">
                Message
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Write your note here..."
                className="w-full px-3 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-md focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Response time &lt; 24h
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Send Message
              </button>
            </div>
          </form>
        )}

        <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3" />
            Support: yourmovies@movies.com
          </span>
          <span>Fast Lightweight Gateway</span>
        </div>
      </div>
    </div>
  );
}
