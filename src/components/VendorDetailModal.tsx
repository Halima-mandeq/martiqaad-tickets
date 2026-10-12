import React, { useState } from 'react';
import { VendorItem, ReviewItem } from '../data/eventsData';
import { X, Star, MapPin, Users, Check, MessageSquare } from 'lucide-react';
import { PlaceholderMap } from './PlaceholderMap';

interface VendorDetailModalProps {
  vendor: VendorItem;
  isOpen: boolean;
  onClose: () => void;
  onOpenReviewModal?: (vendor: VendorItem) => void;
  vendorReviews?: ReviewItem[];
}

export const VendorDetailModal: React.FC<VendorDetailModalProps> = ({
  vendor,
  isOpen,
  onClose,
  onOpenReviewModal,
  vendorReviews
}) => {
  const [activeImage, setActiveImage] = useState(vendor.image);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Salaan sare! Waxaan ka helay adeeggaaga ${vendor.name} ee ku jira website-ka Martiqaad. Waxaan rabaa inaan wax ka ogaado ballan-qabsashada iyo qiimaha taariikhda ${eventDate || 'soo socota'}.`
    );
    window.open(`https://wa.me/${vendor.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Main Hero Gallery */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
            <img
              src={activeImage}
              alt={vendor.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider font-mono">
                  {vendor.category} · {vendor.city}
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mt-1 leading-snug">
                  {vendor.name}
                </h2>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-white/80 block">Laga bilaabo:</span>
                <span className="text-xl sm:text-2xl font-bold text-amber-300 font-mono">
                  ${vendor.startingPrice}
                </span>
                <span className="text-xs text-white/80 block">/{vendor.priceUnit}</span>
              </div>
            </div>
          </div>

          {/* Thumbnails if gallery > 1 */}
          {vendor.gallery.length > 1 && (
            <div className="flex gap-2 p-4 bg-[var(--bg-card-subtle)] border-b border-[var(--border-subtle)] overflow-x-auto">
              {vendor.gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`h-14 w-20 rounded-lg overflow-hidden shrink-0 border transition-all ${
                    activeImage === img ? 'border-[var(--accent)] scale-95 shadow-md' : 'border-[var(--border-subtle)] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Details Body */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Info */}
            <div className="md:col-span-7 space-y-5 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[var(--accent)] font-semibold">
                  <Star className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                  <span>{vendor.rating.toFixed(2)}</span>
                </div>
                <span className="text-[var(--text-muted)]">({vendor.reviewsCount} qiimeyn)</span>
                {vendor.capacity && (
                  <>
                    <span className="text-[var(--text-muted)]">·</span>
                    <span className="flex items-center gap-1 text-[var(--text-secondary)]">
                      <Users className="w-3.5 h-3.5 text-[var(--accent)]" />
                      <span>Qaada: {vendor.capacity} qof</span>
                    </span>
                  </>
                )}
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-1">
                  Sharaxaadda Adeegga
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">{vendor.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                  Waxyaabaha Laguugu Darayo (Features & Amenities)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vendor.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 p-2 rounded-lg bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                      <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      <span className="text-[11px]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrated Visual Placeholder Map for the Vendor */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Goobta & Khariidadda Magaalada ({vendor.city})</span>
                  </h4>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">GPS Xaqiijisan</span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  Khariidadda tooska ah ee goobta meheradda ku taallo magaalada {vendor.city}. Waxaad ka heli kartaa tilmaamaha GPS-ka iyo masaafada.
                </p>
                <PlaceholderMap
                  venue={vendor.name}
                  city={vendor.city}
                  variant="compact"
                  className="h-48 w-full mt-1"
                />
              </div>

              {/* Reviews Section inside Vendor Modal */}
              <div className="pt-3 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                    <span>Qiimeynta Macaamiisha ({vendor.reviewsCount})</span>
                  </h4>
                  {onOpenReviewModal && (
                    <button
                      type="button"
                      onClick={() => onOpenReviewModal(vendor)}
                      className="text-[var(--accent)] hover:underline text-[11px] font-semibold"
                    >
                      + Qor Qiimeyn
                    </button>
                  )}
                </div>

                {vendorReviews && vendorReviews.length > 0 ? (
                  <div className="space-y-2 mt-2">
                    {vendorReviews.slice(0, 2).map((rev) => (
                      <div key={rev.id} className="p-3 rounded-xl bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[11px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-[var(--text-primary)]">{rev.userName}</span>
                          <div className="flex items-center gap-0.5 text-[var(--accent)]">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3 h-3 ${s <= rev.rating ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[var(--text-secondary)] italic">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-[var(--text-muted)] italic">Weli wax faallo ah lagama bixin.</p>
                )}
              </div>
            </div>

            {/* Right Booking / Request Box */}
            <div className="md:col-span-5 bg-[var(--bg-card-subtle)] p-5 rounded-2xl border border-[var(--border-subtle)] text-xs flex flex-col justify-between shadow-xs">
              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-[var(--text-primary)] text-sm">Codsigaaga Waa La Diray!</h4>
                  <p className="text-[var(--text-muted)] text-[11px]">
                    Kooxda {vendor.name} ayaa kula soo xiriiraysa lambarka {clientPhone} 24 saac gudahood.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-2 text-[var(--accent)] underline text-[11px]"
                  >
                    Dib u bilow
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="space-y-3">
                  <h4 className="font-semibold text-[var(--text-primary)] text-sm">Codsashada Ballan / Qiime-dhimis</h4>
                  <p className="text-[var(--text-muted)] text-[11px]">
                    Toos ula hadal milkiilaha ama buuxi foomkan si lagula soo xiriiro.
                  </p>

                  <div>
                    <label className="block text-[11px] text-[var(--text-muted)] mb-1">Magacaaga</label>
                    <input
                      type="text"
                      required
                      placeholder="Magacaaga oo buuxa"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[var(--text-muted)] mb-1">Taleefankaaga</label>
                    <input
                      type="tel"
                      required
                      placeholder="+252 61..."
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[var(--text-muted)] mb-1">Taariikhda la rabo</label>
                    <input
                      type="text"
                      placeholder="Tusaale: 28 Diseembar 2026"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] text-[var(--text-primary)] font-medium border border-[var(--border-subtle)] transition-colors mt-2 shadow-xs"
                  >
                    Gudbi Codsiga Ballanta
                  </button>

                  <div className="relative py-2 text-center">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest bg-[var(--bg-card-subtle)] px-2">ama</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full py-2.5 rounded-xl bg-[var(--accent)] hover:opacity-90 text-[var(--accent-text)] font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Kala Hadal WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
