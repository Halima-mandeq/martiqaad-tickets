import React from 'react';
import { PurchasedTicket } from '../data/eventsData';
import { Calendar, Clock, MapPin, CheckCircle2, Sparkles, Download, Share2 } from 'lucide-react';

interface TicketPassViewProps {
  ticket: PurchasedTicket;
  onClose?: () => void;
}

export const TicketPassView: React.FC<TicketPassViewProps> = ({ ticket, onClose }) => {
  const handlePrintOrDownload = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎫 Tigidhka Martiqaad ee Xafladda: ${ticket.eventTitle}\nTaariikhda: ${ticket.eventDate} - ${ticket.eventTime}\nGoobta: ${ticket.eventVenue}, ${ticket.city}\nHeerka: ${ticket.tierName}\nLambarka Tigidhka: ${ticket.ticketNumber}\nMagaca: ${ticket.customerName}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 text-white max-w-lg mx-auto shadow-2xl relative overflow-hidden">
      {/* Golden ambient glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-serif-luxury text-sm font-semibold tracking-wider text-amber-400">MARTIQAAD PASS</h4>
            <p className="text-[11px] text-slate-300">Tigidh Rasmi ah oo Dhijitaal ah</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3" /> {ticket.status}
          </span>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{ticket.ticketNumber}</p>
        </div>
      </div>

      {/* Event Details */}
      <div className="mb-6">
        <span className="text-[11px] uppercase tracking-wider text-amber-300 font-medium">{ticket.city}</span>
        <h3 className="text-lg font-semibold text-white mt-0.5 leading-snug">{ticket.eventTitle}</h3>

        <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
          <div className="bg-slate-800/80 border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Taariikhda</span>
            </div>
            <p className="font-medium text-white">{ticket.eventDate}</p>
          </div>
          <div className="bg-slate-800/80 border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Waqtiga</span>
            </div>
            <p className="font-medium text-white">{ticket.eventTime}</p>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-white/10 rounded-xl p-3 mt-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Goobta Xafladda</span>
          </div>
          <p className="font-medium text-white">{ticket.eventVenue}</p>
        </div>
      </div>

      {/* Attendee Info & Tear-off Divider */}
      <div className="relative py-4 border-t border-dashed border-white/20 my-4">
        {/* Decorative notch cuts */}
        <div className="absolute -left-9 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--bg-card)] border-r border-amber-500/40" />
        <div className="absolute -right-9 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[var(--bg-card)] border-l border-amber-500/40" />

        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="text-slate-400 text-[11px]">Qofka Tigidhka leh:</p>
            <p className="text-sm font-semibold text-white mt-0.5">{ticket.customerName}</p>
            <p className="text-slate-400 text-[11px] font-mono">{ticket.customerPhone}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-[11px]">Heerka & Tirada:</p>
            <p className="text-sm font-semibold text-amber-400 mt-0.5">{ticket.tierName} ({ticket.quantity}x)</p>
            <p className="text-xs text-white font-semibold">${ticket.totalPrice}</p>
          </div>
        </div>
      </div>

      {/* QR Code Graphic Box */}
      <div className="bg-slate-950/90 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="space-y-1 text-xs">
          <p className="text-amber-400 font-semibold">Baaraha Albaabka (Gate Scan)</p>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Tus QR Code-kan shaqaalaha albaabka marka aad goobta xafladda gaarto si laguu soo dhoweeyo.
          </p>
          <p className="font-mono text-[10px] text-slate-400 mt-1">{ticket.qrCodeSeed}</p>
        </div>

        {/* Visual Simulated QR Code SVG */}
        <div className="w-24 h-24 bg-white p-2 rounded-lg flex flex-col items-center justify-center shrink-0 shadow-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Corner squares */}
            <rect x="5" y="5" width="26" height="26" fill="#000" />
            <rect x="9" y="9" width="18" height="18" fill="#fff" />
            <rect x="13" y="13" width="10" height="10" fill="#000" />

            <rect x="69" y="5" width="26" height="26" fill="#000" />
            <rect x="73" y="9" width="18" height="18" fill="#fff" />
            <rect x="77" y="13" width="10" height="10" fill="#000" />

            <rect x="5" y="69" width="26" height="26" fill="#000" />
            <rect x="9" y="73" width="18" height="18" fill="#fff" />
            <rect x="13" y="77" width="10" height="10" fill="#000" />

            {/* Matrix dots pattern */}
            <rect x="36" y="8" width="6" height="6" fill="#000" />
            <rect x="46" y="14" width="6" height="6" fill="#000" />
            <rect x="56" y="8" width="6" height="6" fill="#000" />
            <rect x="36" y="24" width="6" height="6" fill="#000" />
            <rect x="46" y="20" width="6" height="6" fill="#000" />

            <rect x="8" y="38" width="6" height="6" fill="#000" />
            <rect x="20" y="44" width="6" height="6" fill="#000" />
            <rect x="12" y="52" width="6" height="6" fill="#000" />

            <rect x="36" y="40" width="8" height="8" fill="#000" />
            <rect x="50" y="44" width="8" height="8" fill="#000" />
            <rect x="42" y="58" width="8" height="8" fill="#000" />
            <rect x="58" y="54" width="6" height="6" fill="#000" />

            <rect x="72" y="40" width="6" height="6" fill="#000" />
            <rect x="84" y="46" width="6" height="6" fill="#000" />
            <rect x="76" y="56" width="6" height="6" fill="#000" />
            <rect x="86" y="66" width="6" height="6" fill="#000" />

            <rect x="38" y="74" width="6" height="6" fill="#000" />
            <rect x="48" y="82" width="6" height="6" fill="#000" />
            <rect x="60" y="76" width="6" height="6" fill="#000" />
            <rect x="72" y="80" width="6" height="6" fill="#000" />
            <rect x="84" y="84" width="6" height="6" fill="#000" />
          </svg>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6 print:hidden">
        <button
          onClick={handlePrintOrDownload}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-white/10 transition-colors"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Soo Degso / Print</span>
        </button>
        <button
          onClick={handleShareWhatsApp}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold shadow-lg shadow-amber-500/20 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>U Dir WhatsApp</span>
        </button>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-center text-xs text-slate-400 hover:text-white transition-colors print:hidden"
        >
          Xir Daaqaddan
        </button>
      )}
    </div>
  );
};
