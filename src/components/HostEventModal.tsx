import React, { useState } from 'react';
import { X, CalendarPlus, Check, Building2, Ticket } from 'lucide-react';
import { EventItem } from '../data/eventsData';

interface HostEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewEvent: (newEvent: EventItem) => void;
}

export const HostEventModal: React.FC<HostEventModalProps> = ({
  isOpen,
  onClose,
  onAddNewEvent
}) => {
  const [submissionType, setSubmissionType] = useState<'event' | 'vendor'>('event');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Shirarka' | 'Aroosyada' | 'Fanka & Dhaqanka' | 'Ciyaaraha' | 'Carwooyinka'>('Shirarka');
  const [city, setCity] = useState<'Muqdisho' | 'Hargeysa' | 'Garoowe' | 'Kismaayo'>('Muqdisho');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [priceRegular, setPriceRegular] = useState('20');
  const [priceVip, setPriceVip] = useState('60');
  const [organizerName, setOrganizerName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (submissionType === 'event') {
      const newEvent: EventItem = {
        id: `evt-user-${Date.now()}`,
        title: title || 'Munaasabad Cusub',
        category,
        date: date || 'Sabti, 19 Diseembar 2026',
        time: '08:30 Subaxnimo',
        city,
        venue: venue || 'Mogadishu Grand Hall',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        description: description || 'Munaasabad heer sare ah oo loogu talagalay bulshada.',
        organizer: organizerName || 'Qabanqaabiye Madax-bannaan',
        seatsTotal: 500,
        seatsLeft: 500,
        daysLeft: 30,
        rating: 5.0,
        reviewsCount: 0,
        tiers: [
          { name: 'Caadi', price: Number(priceRegular) || 20, perks: ['Galitaanka guud'] },
          { name: 'VIP', price: Number(priceVip) || 60, perks: ['Fadhiga hore', 'Qado & Cabitaan'] }
        ]
      };
      onAddNewEvent(newEvent);
    }

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setTitle('');
    setVenue('');
    setDate('');
    setOrganizerName('');
    setPhone('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-page-secondary)]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] flex items-center justify-center">
              <CalendarPlus className="w-4 h-4" />
            </div>
            <h2 className="text-base font-semibold text-[var(--text-primary)]">Diiwaangeli Munaasabad ama Adeeg</h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Ku xayeysii xafladdaada, shirkaddaada tigidhada ama hoolkaaga aroosyada barxadda Martiqaad.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Diiwaangelintaada Waa La Helay!</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              Munaasabaddaada <span className="text-[var(--accent)] font-semibold">"{title}"</span> waxaa lagu daray liiska website-ka.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-3 py-2 px-5 rounded-xl bg-[var(--accent)] text-[var(--accent-text)] font-semibold text-xs shadow-xs"
            >
              Waayahay, Ku Laabo Bogga
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Type selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => setSubmissionType('event')}
                className={`py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  submissionType === 'event'
                    ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-xs font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Munaasabad & Tigidho</span>
              </button>
              <button
                type="button"
                onClick={() => setSubmissionType('vendor')}
                className={`py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  submissionType === 'vendor'
                    ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-xs font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Hool / Sawir-qaade</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] text-[var(--text-muted)] mb-1">
                Magaca Munaasabadda ama Adeegga *
              </label>
              <input
                type="text"
                required
                placeholder="Tusaale: Bandhigga Ganacsiga 2026 ama Hoolka Boqortooyada"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Qaybta</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                >
                  <option value="Shirarka">Shirarka</option>
                  <option value="Aroosyada">Aroosyada</option>
                  <option value="Fanka & Dhaqanka">Fanka & Dhaqanka</option>
                  <option value="Ciyaaraha">Ciyaaraha</option>
                  <option value="Carwooyinka">Carwooyinka</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Magaalada</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as any)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                >
                  <option value="Muqdisho">Muqdisho</option>
                  <option value="Hargeysa">Hargeysa</option>
                  <option value="Garoowe">Garoowe</option>
                  <option value="Kismaayo">Kismaayo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Goobta Xafladda (Venue) *</label>
                <input
                  type="text"
                  required
                  placeholder="Tusaale: Mogadishu Convention Center"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Taariikhda *</label>
                <input
                  type="text"
                  required
                  placeholder="Tusaale: 20 Diseembar 2026"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Qiimaha Tigidhka Caadiga ah ($)</label>
                <input
                  type="number"
                  value={priceRegular}
                  onChange={(e) => setPriceRegular(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Qiimaha Tigidhka VIP ($)</label>
                <input
                  type="number"
                  value={priceVip}
                  onChange={(e) => setPriceVip(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Magaca Qabanqaabiyaha *</label>
                <input
                  type="text"
                  required
                  placeholder="Shirkaddaada ama Magacaaga"
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Taleefanka Xiriirka *</label>
                <input
                  type="tel"
                  required
                  placeholder="+252 61..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[var(--text-muted)] mb-1">Faahfaahin Kooban</label>
              <textarea
                rows={2}
                placeholder="Qor ujeeddada munaasabadda iyo waxa dadku ka faa'iidi doonaan..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none text-[11px]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[var(--accent)] hover:opacity-90 text-[var(--accent-text)] font-semibold transition-colors shadow-md"
            >
              Gudbi & Ku Daabac Website-ka
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
