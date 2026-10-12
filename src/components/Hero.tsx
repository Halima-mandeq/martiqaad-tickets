import React, { useState, useEffect } from 'react';
import { EventItem } from '../data/eventsData';
import { Calendar, MapPin, Clock, ArrowRight, ShieldCheck, Ticket, Star, Flame } from 'lucide-react';

interface HeroProps {
  featuredEvent: EventItem;
  onBookEvent: (event: EventItem) => void;
  onOpenInvitations: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredEvent,
  onBookEvent,
  onOpenInvitations
}) => {
  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 7,
    minutes: 42,
    seconds: 35
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden pt-8 pb-16 bg-[var(--bg-page)] border-b border-[var(--border-subtle)] transition-colors">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-[var(--accent-glow)] blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] text-xs font-bold mb-4 border border-[var(--border-accent)] shadow-xs">
            <Flame className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />
            <span>Madasha 1-aad ee Tigidhada Xafladaha, Shirarka & Aroosyada Soomaaliya</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tight leading-[1.15] font-serif-luxury">
            Xafladaha Ugu Waaweyn, <br />
            <span className="text-[var(--accent)] drop-shadow-xs">
              Gooso Tigidhkaaga Degdeg!
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto font-medium">
            Tigidhada shirarka ganacsiga, carwooyinka, fanka, iyo hoolalka aroosyada. 
            Ku bixi EVC Plus, Zaad ama Kaarka Bangiga, kuna hel tigidh rasmi ah oo QR Code leh daqiiqad gudaheed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => onBookEvent(featuredEvent)}
              className="py-3 px-6 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] font-black text-xs transition-all shadow-lg shadow-[var(--accent-glow)] flex items-center gap-2 active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              <span>Gooso Tigidh Hadda</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenInvitations}
              className="py-3 px-6 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-subtle)] text-[var(--text-primary)] font-bold text-xs border border-[var(--border-subtle)] shadow-xs transition-all flex items-center gap-2"
            >
              <span>Sameyso Kaarka Casuumaadda Arooska</span>
            </button>
          </div>
        </div>

        {/* Featured Big Event Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xl transition-colors">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image & Overlay */}
            <div className="lg:col-span-7 relative min-h-[320px] lg:min-h-[420px]">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--accent-text)] text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  Xafladda Todobaadka
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur text-white text-xs font-semibold border border-white/20">
                  {featuredEvent.city}
                </span>
              </div>
            </div>

            {/* Right Information & Countdown */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[var(--bg-surface)] transition-colors">
              <div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-2">
                  <div className="flex items-center gap-1.5 text-[var(--accent)] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />
                    <span>Xaqiijiyay & Dammaanad leh</span>
                  </div>
                  <span className="text-[var(--text-muted)]">·</span>
                  <div className="flex items-center gap-1 font-sans">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-[var(--text-primary)]">{featuredEvent.rating.toFixed(1)}</span>
                    <span className="text-[var(--text-muted)]">({featuredEvent.reviewsCount} qiimeyn)</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] leading-snug">
                  {featuredEvent.title}
                </h3>

                <p className="mt-3 text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                  {featuredEvent.description}
                </p>

                {/* Event meta tags */}
                <div className="mt-4 space-y-2 text-xs text-[var(--text-secondary)] font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span className="line-clamp-1">{featuredEvent.venue}</span>
                  </div>
                </div>
              </div>

              {/* Countdown Timer Block */}
              <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                    Waqtiga Ka Dhiman:
                  </span>
                  <span className="text-[11px] text-[var(--accent)] font-black">
                    Kaliya {featuredEvent.seatsLeft} kursi ayaa haray!
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-[var(--text-primary)] shadow-xs">
                    <span className="block font-mono text-xl font-black">{timeLeft.days}</span>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Maalmood</span>
                  </div>
                  <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-[var(--text-primary)] shadow-xs">
                    <span className="block font-mono text-xl font-black">{timeLeft.hours}</span>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Saacadood</span>
                  </div>
                  <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl p-2.5 text-[var(--text-primary)] shadow-xs">
                    <span className="block font-mono text-xl font-black">{timeLeft.minutes}</span>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Daqiiqo</span>
                  </div>
                  <div className="bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl p-2.5 shadow-xs">
                    <span className="block font-mono text-xl font-black text-[var(--accent)]">{timeLeft.seconds}</span>
                    <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold">Ilbiriqsi</span>
                  </div>
                </div>

                {/* Instant Book CTA */}
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-[var(--text-muted)] font-medium">Laga bilaabo:</span>
                    <p className="text-2xl font-black text-[var(--accent)] font-mono">
                      ${featuredEvent.tiers[0].price}
                    </p>
                  </div>
                  <button
                    onClick={() => onBookEvent(featuredEvent)}
                    className="flex-1 py-3 px-5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] font-black text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-[var(--accent-glow)] active:scale-95"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Gooso Tigidhkaaga</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
