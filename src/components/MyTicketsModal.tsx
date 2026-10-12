import React, { useState } from 'react';
import { PurchasedTicket } from '../data/eventsData';
import { X, Ticket, Search } from 'lucide-react';
import { TicketPassView } from './TicketPassView';

interface MyTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: PurchasedTicket[];
}

export const MyTicketsModal: React.FC<MyTicketsModalProps> = ({
  isOpen,
  onClose,
  tickets
}) => {
  const [selectedTicket, setSelectedTicket] = useState<PurchasedTicket | null>(
    tickets.length > 0 ? tickets[0] : null
  );
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredTickets = tickets.filter(
    (t) =>
      t.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-[var(--border-subtle)] bg-[var(--bg-page-secondary)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-light)] text-[var(--accent)] border border-[var(--border-accent)] flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">Tigidhadeyda (My Purchased Tickets)</h2>
              <p className="text-xs text-[var(--text-muted)]">Dhammaan tigidhada aad goosatay iyo QR Code-yadooda</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] text-[var(--text-secondary)] flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left list */}
          <div className="md:col-span-5 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Raadi magac ama lambar tigidh..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
              />
            </div>

            {filteredTickets.length === 0 ? (
              <div className="p-8 text-center bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl">
                <Ticket className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-2" />
                <p className="text-xs text-[var(--text-secondary)]">Wax tigidh ah lama helin.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                {filteredTickets.map((t) => {
                  const isSelected = selectedTicket?.ticketNumber === t.ticketNumber;
                  return (
                    <button
                      key={t.ticketNumber}
                      onClick={() => setSelectedTicket(t)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs ${
                        isSelected
                          ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--text-primary)] shadow-xs'
                          : 'bg-[var(--bg-card-subtle)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent)]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[11px] text-[var(--accent)] font-semibold">
                          {t.ticketNumber}
                        </span>
                        <span className="text-[10px] bg-[var(--bg-card)] text-[var(--text-muted)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
                          {t.tierName}
                        </span>
                      </div>
                      <p className="font-semibold text-[var(--text-primary)] line-clamp-1">{t.eventTitle}</p>
                      <p className="text-[var(--text-muted)] text-[11px] mt-1">{t.eventDate}</p>
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mt-2 pt-2 border-t border-[var(--border-subtle)]">
                        <span>{t.customerName}</span>
                        <span className="font-semibold text-[var(--text-primary)]">${t.totalPrice}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Preview */}
          <div className="md:col-span-7 flex items-center justify-center bg-[var(--bg-page-secondary)] p-4 rounded-xl border border-[var(--border-subtle)]">
            {selectedTicket ? (
              <div className="w-full">
                <TicketPassView ticket={selectedTicket} />
              </div>
            ) : (
              <div className="text-center p-8 text-[var(--text-muted)] text-xs">
                Dooro tigidh dhanka bidix si aad u aragto pass-kiisa iyo QR Code-ka.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
