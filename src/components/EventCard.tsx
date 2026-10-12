import React, { useState } from 'react';
import { EventItem } from '../data/eventsData';
import { Calendar, MapPin, Ticket, Clock, Star, MessageSquare, Map as MapIcon, Image as ImageIcon } from 'lucide-react';
import { PlaceholderMap } from './PlaceholderMap';

interface EventCardProps {
  event: EventItem;
  onBook: (event: EventItem) => void;
  onOpenReviews: (event: EventItem) => void;
  onViewDetails?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onBook,
  onOpenReviews,
  onViewDetails
}) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="group bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent)] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl">
      {/* Top Media Area (Toggles between Cover Image & Interactive Placeholder Map) */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-card-subtle)]">
        {showMap ? (
          <div className="w-full h-full p-1 animate-in fade-in duration-200">
            <PlaceholderMap
              venue={event.venue}
              city={event.city}
              variant="compact"
              className="h-full w-full rounded-xl"
            />
          </div>
        ) : (
          <>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </>
        )}

        {/* City & Category Indicator (Top Left) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur text-[11px] font-bold text-white shadow-xs border border-white/10">
            {event.category}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/90 backdrop-blur text-[11px] font-bold text-[var(--text-primary)] shadow-xs border border-[var(--border-subtle)]">
            {event.city}
          </span>
        </div>

        {/* Top Right Controls: Rating Badge & Map Switcher */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {/* Toggle Map / Image Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowMap(!showMap);
            }}
            className={`px-2 py-1 rounded-md backdrop-blur text-[10px] font-bold border transition-all flex items-center gap-1 shadow-sm active:scale-95 ${
              showMap
                ? 'bg-[var(--accent)] text-[var(--accent-text)] border-[var(--border-accent)]'
                : 'bg-[var(--bg-surface)]/95 text-[var(--text-primary)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface)]'
            }`}
            title={showMap ? 'U baddal sawirka xafladda' : 'Arag khariidadda goobta magaalada'}
          >
            {showMap ? (
              <>
                <ImageIcon className="w-3 h-3" />
                <span>Sawir</span>
              </>
            ) : (
              <>
                <MapIcon className="w-3 h-3 text-[var(--accent)]" />
                <span>Khariidad</span>
              </>
            )}
          </button>

          {/* Rating Badge */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenReviews(event);
            }}
            className="px-2 py-1 rounded-md bg-[var(--bg-surface)]/95 backdrop-blur text-[11px] font-bold text-[var(--text-primary)] border border-[var(--border-subtle)] flex items-center gap-1 hover:bg-[var(--bg-surface)] transition-colors shadow-sm"
            title="Guji si aad u aragto faallooyinka ama aad dhibco u bixiso"
          >
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-mono">{event.rating.toFixed(1)}</span>
            <span className="text-[10px] text-[var(--text-muted)]">({event.reviewsCount})</span>
          </button>
        </div>

        {/* Remaining Seats Badge (Bottom Right over Image) */}
        {!showMap && (
          <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-[var(--navy-primary)]/90 border border-[var(--border-accent)] text-[10px] text-[var(--accent)] font-bold shadow-sm backdrop-blur">
            {event.seatsLeft} kursi haray
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata clean text with dot separators */}
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-medium mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[var(--accent)]" />
              <span>{event.date}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[var(--accent)]" />
              <span>{event.time.split('-')[0]}</span>
            </span>
          </div>

          <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
            {event.title}
          </h3>

          <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            {/* Clickable Venue to toggle map */}
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="flex items-center gap-1 hover:text-[var(--accent)] transition-colors text-left group/venue"
              title="Guji si aad khariidadda goobta u aragto"
            >
              <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 group-hover/venue:scale-110 transition-transform" />
              <span className="line-clamp-1 underline decoration-dotted underline-offset-2">
                {event.venue}
              </span>
            </button>

            {/* Click to review button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenReviews(event);
              }}
              className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-[10px] font-semibold shrink-0 ml-2"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Faallo</span>
            </button>
          </div>
        </div>

        {/* Footer & Booking */}
        <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold tracking-wider">Laga bilaabo:</span>
            <span className="text-lg font-black text-[var(--accent)] font-mono">
              ${event.tiers[0].price}
            </span>
          </div>

          <button
            onClick={() => onBook(event)}
            className="py-2.5 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-[var(--accent-glow)] active:scale-95"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Gooso Tigidh</span>
          </button>
        </div>
      </div>
    </div>
  );
};
