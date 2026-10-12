import React, { useState } from 'react';
import { ReviewItem } from '../data/eventsData';
import { X, Star, CheckCircle2, MessageSquare, Send, Sparkles } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetTitle: string;
  targetType: 'event' | 'vendor';
  targetImage?: string;
  reviews: ReviewItem[];
  averageRating: number;
  totalReviews: number;
  onAddReview: (review: ReviewItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetTitle,
  targetType,
  targetImage,
  reviews,
  averageRating,
  totalReviews,
  onAddReview
}) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const targetReviews = reviews.filter((r) => r.targetId === targetId);

  const starLabels: { [key: number]: string } = {
    1: 'Liita (1/5)',
    2: 'Dhexdhexaad (2/5)',
    3: 'Wanaagsan (3/5)',
    4: 'Aad u Wanaagsan (4/5)',
    5: 'Heer Sare / Cajiib (5/5)'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      targetId,
      targetType,
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
      date: 'Hadda (Maanta)',
      verifiedAttendee: true
    };

    onAddReview(newRev);
    setIsSubmitted(true);
    setComment('');
    setUserName('');

    setTimeout(() => {
      setIsSubmitted(false);
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-page-secondary)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {targetImage && (
              <img
                src={targetImage}
                alt={targetTitle}
                className="w-12 h-12 rounded-xl object-cover border border-[var(--border-subtle)] shrink-0"
              />
            )}
            <div>
              <span className="text-[10px] font-semibold text-[var(--accent)] uppercase tracking-wider font-mono">
                Qiimeynta & Faallooyinka ({targetType === 'event' ? 'Munaasabad' : 'Adeeg'})
              </span>
              <h2 className="text-base font-semibold text-[var(--text-primary)] leading-snug line-clamp-1">
                {targetTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Average Rating Scorecard */}
          <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="space-y-0.5">
                <span className="font-mono text-3xl font-bold text-[var(--accent)]">
                  {averageRating.toFixed(1)}
                </span>
                <p className="text-[11px] text-[var(--text-muted)]">5.0 dhex-dhexaad</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1 text-[var(--accent)]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(averageRating)
                          ? 'fill-[var(--accent)] text-[var(--accent)]'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-medium">
                  Wadarta: <span className="font-bold text-[var(--text-primary)]">{totalReviews}</span> qiimeyn oo la dhiibtay
                </p>
              </div>
            </div>

            <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-card)] px-3.5 py-2 rounded-xl border border-[var(--border-subtle)] flex items-center gap-2 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Qiimeyn dhab ah oo ka timid macaamiisha</span>
            </div>
          </div>

          {/* Form: Add Your Review */}
          <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-accent)] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <h3 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                Ku Dar Qiimeyntaada & Faalladaada
              </h3>
            </div>

            {isSubmitted && (
              <div className="p-3 mb-4 rounded-xl bg-[var(--accent-light)] border border-[var(--border-accent)] text-[var(--accent)] text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                <span className="font-medium">Waad ku mahadsan tahay! Qiimeyntaada waa la daabacay waxaana lagu daray wadarta guud.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Star selector */}
              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] mb-1.5 font-medium">
                  Xulo Dhibcaha (1 ilaa 5 Stars):
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => {
                      const isActive = (hoverRating || rating) >= s;
                      return (
                        <button
                          type="button"
                          key={s}
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(s)}
                          className="p-1 hover:scale-110 transition-transform focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              isActive
                                ? 'fill-[var(--accent)] text-[var(--accent)]'
                                : 'text-slate-300 hover:text-slate-400'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[var(--accent)] font-semibold text-xs">
                    {starLabels[hoverRating || rating]}
                  </span>
                </div>
              </div>

              {/* User Name */}
              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] mb-1 font-medium">
                  Magacaaga oo buuxa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Tusaale: Cabdiraxmaan Cali"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              {/* Comment text */}
              <div>
                <label className="block text-[11px] text-[var(--text-secondary)] mb-1 font-medium">
                  Faalladaada iyo Khibraddaada *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Sidee kuula muuqatay munaasabaddu ama adeeggu? Qor fikraddaada runta ah..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="py-2.5 px-5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-[var(--accent-text)] font-semibold text-xs transition-colors shadow-md flex items-center gap-2 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gudbi Qiimeynta</span>
              </button>
            </form>
          </div>

          {/* Existing Reviews List */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-3">
              Faallooyinkii Hore ({targetReviews.length})
            </h3>

            {targetReviews.length === 0 ? (
              <div className="p-8 text-center bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-2xl">
                <MessageSquare className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                <p className="text-xs text-[var(--text-secondary)]">Weli faallo lagama bixin meeshan.</p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">Noqo qofkii ugu horreeyay ee qiimeyn ku dara!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {targetReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center font-bold text-xs uppercase border border-[var(--border-accent)]">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--text-primary)]">{rev.userName}</p>
                          <span className="text-[10px] text-[var(--text-muted)]">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {rev.verifiedAttendee && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1 font-medium">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Xaqiijiyay</span>
                          </span>
                        )}
                        <div className="flex items-center gap-0.5 text-[var(--accent)]">
                          {[1, 2, 3, 4, 5].map((st) => (
                            <Star
                              key={st}
                              className={`w-3.5 h-3.5 ${
                                st <= rev.rating ? 'fill-[var(--accent)]' : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-[var(--text-secondary)] text-xs leading-relaxed pl-9">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
