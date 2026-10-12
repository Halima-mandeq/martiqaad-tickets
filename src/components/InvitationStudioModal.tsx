import React, { useState } from 'react';
import { X, Sparkles, Heart, Share2, Copy, Check, Calendar, MapPin } from 'lucide-react';

interface InvitationStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InvitationStudioModal: React.FC<InvitationStudioModalProps> = ({
  isOpen,
  onClose
}) => {
  const [groomName, setGroomName] = useState('Axmed Maxamed');
  const [brideName, setBrideName] = useState('Faadumo Jaamac');
  const [eventDate, setEventDate] = useState('Khamiis, 25 Diseembar 2026');
  const [eventTime, setEventTime] = useState('06:00 Fiidnimo');
  const [venue, setVenue] = useState('Hoolka Boqortooyada ee Jazeera (Royal Ballroom), Muqdisho');
  const [message, setMessage] = useState(
    'Waxaan si xushmad iyo maamuus leh ugu faraxsanahay inaan idinku casuuno munaasabadda meherka iyo arooskeena barakeysan. Joogitaankiinu waa noo sharaf.'
  );
  const [theme, setTheme] = useState<'gold' | 'emerald' | 'navy'>('gold');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `💍 Casuumaad Aroos: ${groomName} & ${brideName}\nTaariikhda: ${eventDate} (${eventTime})\nGoobta: ${venue}\n${message}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `✨ CASUUMAAD AROOS ✨\n\n💍 ${groomName} ❤️ ${brideName}\n\n📅 Taariikhda: ${eventDate}\n⏰ Waqtiga: ${eventTime}\n📍 Goobta: ${venue}\n\n"${message}"\n\nMartiqaad Digital Invitation Pass.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-page-secondary)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--border-accent)] flex items-center justify-center">
              <Heart className="w-4 h-4 fill-[var(--accent)]" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">Naqshadeynta Kaarka Casuumaadda Arooska</h2>
              <p className="text-xs text-[var(--text-muted)]">Sameyso kaar dhijitaal ah oo casri ah oo aad asxaabta ugu dirto WhatsApp</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Studio Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Form Editor */}
          <div className="md:col-span-5 space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Dooro Midabka Kaarka (Card Style)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gold', label: 'Dahab & Madow', border: 'border-amber-500', bg: 'bg-amber-900/10 text-amber-900' },
                  { id: 'emerald', label: 'Royal Emerald', border: 'border-emerald-500', bg: 'bg-emerald-900/10 text-emerald-900' },
                  { id: 'navy', label: 'Midnight Navy', border: 'border-blue-500', bg: 'bg-blue-900/10 text-blue-900' }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id as any)}
                    className={`py-2 px-2 rounded-xl border text-[11px] font-medium transition-all text-center ${
                      theme === t.id ? `${t.border} ${t.bg} shadow-sm font-semibold` : 'border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Magaca Caruuska</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Magaca Caruusadda</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Taariikhda</label>
                <input
                  type="text"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[var(--text-muted)] mb-1">Waqtiga</label>
                <input
                  type="text"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-[var(--text-muted)] mb-1">Goobta Xafladda & Hoolka</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[var(--text-muted)] mb-1">Qoraalka Casuumaadda</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none text-[11px] leading-relaxed"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleCopyLink}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-card)] text-[var(--text-primary)] font-medium border border-[var(--border-subtle)] transition-colors flex items-center justify-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[var(--accent)]" />}
                <span>{copied ? 'Waa La Koobiyeeyay!' : 'Koobiyeey'}</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[var(--accent)] hover:opacity-90 text-[var(--accent-text)] font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>U Dir WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Live Card Preview */}
          <div className="md:col-span-7 flex items-center justify-center bg-[var(--bg-page-secondary)] p-6 rounded-2xl border border-[var(--border-subtle)]">
            <div
              className={`w-full max-w-md rounded-2xl p-8 text-center relative overflow-hidden shadow-2xl border ${
                theme === 'gold'
                  ? 'bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border-amber-500/40 text-amber-100'
                  : theme === 'emerald'
                  ? 'bg-gradient-to-b from-emerald-950/90 via-slate-900 to-slate-950 border-emerald-500/40 text-emerald-100'
                  : 'bg-gradient-to-b from-slate-950 via-blue-950/80 to-slate-950 border-blue-500/40 text-blue-100'
              }`}
            >
              {/* Ornate corner borders */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400/50" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400/50" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400/50" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400/50" />

              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-amber-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bismillaahi Raxmaani Raxiim</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </div>

                <p className="text-[11px] text-slate-300 tracking-wider uppercase font-medium">
                  Casuumaad Meher & Dabbaaldeg Aroos
                </p>

                {/* Couple Names */}
                <div className="py-2">
                  <h3 className="font-serif-luxury text-2xl font-bold tracking-wide text-white">
                    {groomName}
                  </h3>
                  <div className="flex items-center justify-center gap-2 my-1 text-amber-400">
                    <span className="w-8 h-px bg-amber-400/40" />
                    <Heart className="w-4 h-4 fill-amber-400" />
                    <span className="w-8 h-px bg-amber-400/40" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl font-bold tracking-wide text-white">
                    {brideName}
                  </h3>
                </div>

                {/* Message */}
                <p className="text-xs text-slate-200 italic px-2 leading-relaxed">
                  "{message}"
                </p>

                {/* Date & Venue Box */}
                <div className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs space-y-2 mt-4">
                  <div className="flex items-center justify-center gap-2 text-amber-300 font-medium">
                    <Calendar className="w-4 h-4" />
                    <span>{eventDate} · {eventTime}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-slate-300 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="line-clamp-2">{venue}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 tracking-wider uppercase mt-4">
                  MARTIQAAD DIGITAL LUXURY INVITATION
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
