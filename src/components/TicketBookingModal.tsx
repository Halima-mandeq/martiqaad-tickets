import React, { useState } from 'react';
import { EventItem, PurchasedTicket } from '../data/eventsData';
import { X, Calendar, MapPin, Check, ShieldCheck, Smartphone, CreditCard, AlertCircle } from 'lucide-react';
import { TicketPassView } from './TicketPassView';

interface TicketBookingModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
  onTicketPurchased: (ticket: PurchasedTicket) => void;
}

export const TicketBookingModal: React.FC<TicketBookingModalProps> = ({
  event,
  isOpen,
  onClose,
  onTicketPurchased
}) => {
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'EVC Plus' | 'Zaad' | 'Sahal' | 'Card'>('EVC Plus');
  const [isProcessing, setIsProcessing] = useState(false);
  const [issuedTicket, setIssuedTicket] = useState<PurchasedTicket | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const currentTier = event.tiers[selectedTierIndex];
  const totalPrice = currentTier.price * quantity;

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Fadlan geli magacaaga oo buuxa.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Fadlan geli lambarkaaga taleefanka.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const randomSerial = Math.floor(1000 + Math.random() * 9000);
      const ticketNumber = `MQ-2026-${randomSerial}`;
      const newTicket: PurchasedTicket = {
        ticketNumber,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventVenue: event.venue,
        city: event.city,
        tierName: currentTier.name,
        quantity,
        totalPrice,
        customerName: name,
        customerPhone: phone,
        purchaseDate: 'Maanta (12 Oktobar 2026)',
        status: 'Sax ah (Active)',
        qrCodeSeed: `MARTIQAAD-${randomSerial}-${currentTier.name.toUpperCase()}`
      };

      setIsProcessing(false);
      setIssuedTicket(newTicket);
      onTicketPurchased(newTicket);
    }, 1200);
  };

  const handleResetAndClose = () => {
    setIssuedTicket(null);
    setName('');
    setPhone('');
    setEmail('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-2xl shadow-2xl overflow-hidden my-8 transition-colors">
        {/* Top close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {issuedTicket ? (
          <div className="p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 border border-emerald-300 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Hambalyo! Tigidhkaaga Waa La Xaqiijiyay</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Tigidhkaaga dhijitaalka ah ayaa diyaar ah. Waxaa sidoo kale lagu daray qaybta <span className="text-[var(--accent)] font-semibold">Tigidhadeyda</span>.
              </p>
            </div>

            <TicketPassView ticket={issuedTicket} onClose={handleResetAndClose} />
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="p-6 border-b border-[var(--border-subtle)] bg-[var(--bg-page-secondary)]">
              <span className="text-xs font-semibold text-[var(--accent)] tracking-wider uppercase font-mono">
                Goosashada Tigidhka
              </span>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mt-1 leading-snug">{event.title}</h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" /> {event.date}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" /> {event.venue}, {event.city}
                </span>
              </div>
            </div>

            <form onSubmit={handlePurchase} className="p-6 space-y-6">
              {/* Step 1: Select Tier */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                  1. Dooro Heerka Tigidhka (Ticket Tier)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {event.tiers.map((tier, idx) => {
                    const isSelected = selectedTierIndex === idx;
                    return (
                      <button
                        type="button"
                        key={tier.name}
                        onClick={() => setSelectedTierIndex(idx)}
                        className={`p-3 text-left rounded-xl border transition-all text-xs relative ${
                          isSelected
                            ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--text-primary)] shadow-sm'
                            : 'bg-[var(--bg-card-subtle)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[var(--accent)] text-[var(--accent-text)] flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                        <p className="font-semibold text-[var(--text-primary)] text-sm">{tier.name}</p>
                        <p className="text-[var(--accent)] font-bold text-base mt-1">${tier.price}</p>
                        <ul className="mt-2 space-y-1 text-[11px] text-[var(--text-muted)]">
                          {tier.perks.slice(0, 2).map((perk, pIdx) => (
                            <li key={pIdx} className="line-clamp-1">✓ {perk}</li>
                          ))}
                        </ul>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Quantity */}
              <div className="flex items-center justify-between p-3.5 bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">Tirada Tigidhada (Quantity)</p>
                  <p className="text-[11px] text-[var(--text-muted)]">${currentTier.price} qofkiiba</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-page-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center font-bold text-sm shadow-xs"
                  >
                    -
                  </button>
                  <span className="text-base font-bold text-[var(--text-primary)] w-6 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-8 h-8 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-page-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center font-bold text-sm shadow-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Step 3: Attendee Details */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                  2. Xogtaada Shakhsiga ah
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-[11px] text-[var(--text-muted)] mb-1">Magacaaga oo buuxa *</span>
                    <input
                      type="text"
                      required
                      placeholder="Tusaale: Xaliimo Maxamed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] text-[var(--text-muted)] mb-1">Taleefankaaga Mobile Money *</span>
                    <input
                      type="tel"
                      required
                      placeholder="+252 61..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Payment Selector */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                  3. Habka Lacag Bixinta (Payment Method)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'EVC Plus', label: 'EVC Plus (*712*)', icon: Smartphone },
                    { id: 'Zaad', label: 'Zaad (*888*)', icon: Smartphone },
                    { id: 'Sahal', label: 'Sahal Service', icon: Smartphone },
                    { id: 'Card', label: 'Kaarka Bankiga', icon: CreditCard }
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = paymentMethod === method.id;
                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)] font-semibold shadow-xs'
                            : 'bg-[var(--bg-card-subtle)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                        <span className="text-[11px] text-center leading-tight">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Price Summary & Submit */}
              <div className="border-t border-[var(--border-subtle)] pt-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[var(--text-muted)]">Isugeynta Wadarta:</span>
                  <div className="text-xl font-bold text-[var(--accent)] font-mono">${totalPrice}</div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="py-3 px-6 rounded-xl bg-[var(--accent)] hover:opacity-90 active:scale-[0.98] disabled:opacity-50 text-[var(--accent-text)] font-semibold text-xs transition-all shadow-md flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Xaqiijinta Lacagta...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Bixi Lacagta & Jar Tigidhka (${totalPrice})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
