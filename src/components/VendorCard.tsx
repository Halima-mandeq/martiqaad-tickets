import React from 'react';
import { VendorItem } from '../data/eventsData';
import { Star, MapPin, Users, ArrowRight, MessageSquare } from 'lucide-react';

interface VendorCardProps {
  vendor: VendorItem;
  onSelect: (vendor: VendorItem) => void;
  onOpenReviews?: (vendor: VendorItem) => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({ vendor, onSelect, onOpenReviews }) => {
  return (
    <div
      onClick={() => onSelect(vendor)}
      className="group bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent)] rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-card-subtle)]">
        <img
          src={vendor.image}
          alt={vendor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Category & City */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur text-[11px] font-bold text-white shadow-xs border border-white/10">
            {vendor.category}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/90 backdrop-blur text-[11px] font-bold text-[var(--text-primary)] shadow-xs border border-[var(--border-subtle)]">
            {vendor.city}
          </span>
        </div>

        {/* Rating Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onOpenReviews) {
              onOpenReviews(vendor);
            } else {
              onSelect(vendor);
            }
          }}
          className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-[var(--bg-surface)]/95 backdrop-blur text-[11px] font-bold text-[var(--text-primary)] border border-[var(--border-subtle)] flex items-center gap-1 shadow-sm hover:bg-[var(--bg-surface)]"
          title="Arag faallooyinka meheraddan"
        >
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{vendor.rating.toFixed(2)}</span>
          <span className="text-[10px] text-[var(--text-muted)]">({vendor.reviewsCount})</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors line-clamp-1 leading-snug">
            {vendor.name}
          </h3>

          <p className="mt-1 text-xs text-[var(--text-muted)] italic line-clamp-1 font-medium">
            "{vendor.tagline}"
          </p>

          <p className="mt-2 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>

          <div className="mt-3 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" /> {vendor.city}
              </span>
              {vendor.capacity && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5 text-[var(--accent)]" /> {vendor.capacity} qof
                  </span>
                </>
              )}
            </div>

            {onOpenReviews && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenReviews(vendor);
                }}
                className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-semibold"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Faallo ({vendor.reviewsCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold tracking-wider">Laga bilaabo:</span>
            <span className="text-lg font-black text-[var(--accent)] font-mono">
              ${vendor.startingPrice}
              <span className="text-xs text-[var(--text-muted)] font-normal"> /{vendor.priceUnit}</span>
            </span>
          </div>

          <button
            type="button"
            className="py-2.5 px-4 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--accent)] text-[var(--text-primary)] hover:text-[var(--accent-text)] border border-[var(--border-subtle)] font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
          >
            <span>Faahfaahin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
