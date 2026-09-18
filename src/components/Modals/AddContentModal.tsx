import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { X, Sparkles, Tag } from 'lucide-react';
import { NewsPost } from '../../types';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({ isOpen, onClose }) => {
  const { addNewsPost, addPromoOffer } = useGym();

  const [contentType, setContentType] = useState<'news' | 'promo'>('news');

  // News State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NewsPost['category']>('Facility');
  const [snippet, setSnippet] = useState('');
  const [content, setContent] = useState('');

  // Promo State
  const [promoTitle, setPromoTitle] = useState('');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('25% OFF');
  const [promoDesc, setPromoDesc] = useState('');
  const [expiresIn, setExpiresIn] = useState('14 Days Left');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contentType === 'news') {
      if (!title.trim() || !snippet.trim()) return;
      addNewsPost({
        title,
        category,
        snippet,
        content: content || snippet
      });
    } else {
      if (!promoTitle.trim() || !code.trim()) return;
      addPromoOffer({
        title: promoTitle,
        code: code.toUpperCase(),
        discount,
        description: promoDesc,
        expiresIn,
        badge: 'Special Deal',
        tagColor: 'border-red-500/30 bg-red-500/10 text-red-400'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        
        <div className="p-5 bg-gradient-to-r from-red-950/80 to-gray-950 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-bold">
              {contentType === 'news' ? <Sparkles className="w-5 h-5" /> : <Tag className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-black text-white">Publish Member Content</h3>
              <p className="text-xs text-red-400 font-medium">Broadcast directly to main community feed</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Type Selector */}
        <div className="p-4 bg-gray-950/60 border-b border-gray-800 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setContentType('news')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              contentType === 'news'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            Gym News / Announcement
          </button>
          <button
            type="button"
            onClick={() => setContentType('promo')}
            className={`py-2 text-xs font-bold rounded-xl transition ${
              contentType === 'promo'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            Promotional Offer Code
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {contentType === 'news' ? (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. New Cold Plunge & Steam Rooms Now Open"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Feed Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as NewsPost['category'])}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Facility">Facility Upgrade</option>
                  <option value="Community">Community Spotlight</option>
                  <option value="Challenge">Fitness Challenge</option>
                  <option value="Milestone">Milestone</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Card Summary Snippet
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short teaser shown on the home page card..."
                  value={snippet}
                  onChange={e => setSnippet(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Full Article Body
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed news release description..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Promotional Offer Headline
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50% Off First Personal Training Session"
                  value={promoTitle}
                  onChange={e => setPromoTitle(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Redemption Code
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FITFALL26"
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500 font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Discount Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 30% OFF"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Offer Terms & Description
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Details of the promotion and terms..."
                  value={promoDesc}
                  onChange={e => setPromoDesc(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Validity Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ends in 10 Days"
                  value={expiresIn}
                  onChange={e => setExpiresIn(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg shadow-red-950/50 transition"
          >
            Publish to Community Feed
          </button>
        </form>

      </div>
    </div>
  );
};
