import React, { useState, useEffect } from 'react';
import {
  EVENTS_LIST,
  FEATURED_EVENT,
  VENDORS_LIST,
  INITIAL_PURCHASED_TICKETS,
  INITIAL_REVIEWS,
  EventItem,
  VendorItem,
  PurchasedTicket,
  ReviewItem
} from './data/eventsData';
import { Navbar, EventTheme } from './components/Navbar';
import { Hero } from './components/Hero';
import { EventCard } from './components/EventCard';
import { VendorCard } from './components/VendorCard';
import { TicketBookingModal } from './components/TicketBookingModal';
import { VendorDetailModal } from './components/VendorDetailModal';
import { MyTicketsModal } from './components/MyTicketsModal';
import { QrScannerModal } from './components/QrScannerModal';
import { InvitationStudioModal } from './components/InvitationStudioModal';
import { HostEventModal } from './components/HostEventModal';
import { ReviewModal } from './components/ReviewModal';
import { Footer } from './components/Footer';
import {
  Search,
  Sparkles,
  Ticket,
  Heart,
  QrCode
} from 'lucide-react';

export default function App() {
  // Theme state: default to 'gold' (Dahab & Boqortooyo - Royal Midnight Navy & Warm Amber Gold)
  const [currentTheme, setCurrentTheme] = useState<EventTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('martiqaad_theme') as EventTheme;
      if (saved && ['gold', 'emerald', 'indigo'].includes(saved)) {
        return saved;
      }
    }
    return 'gold';
  });

  // Dark mode state: persist in localStorage and sync with HTML
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('martiqaad_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('martiqaad_theme', currentTheme);

    if (isDarkMode) {
      document.documentElement.setAttribute('data-mode', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.setAttribute('data-mode', 'light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('martiqaad_dark_mode', String(isDarkMode));
  }, [currentTheme, isDarkMode]);

  const handleThemeChange = (newTheme: EventTheme) => {
    setCurrentTheme(newTheme);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Main Data States
  const [events, setEvents] = useState<EventItem[]>(EVENTS_LIST);
  const [vendors, setVendors] = useState<VendorItem[]>(VENDORS_LIST);
  const [purchasedTickets, setPurchasedTickets] = useState<PurchasedTicket[]>(INITIAL_PURCHASED_TICKETS);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'events' | 'wedding-hub'>('events');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<'All' | 'Muqdisho' | 'Hargeysa' | 'Garoowe' | 'Kismaayo'>('All');
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('All');
  const [selectedVendorCategory, setSelectedVendorCategory] = useState<string>('All');

  // Modals
  const [bookingEvent, setBookingEvent] = useState<EventItem | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<VendorItem | null>(null);
  const [isTicketsModalOpen, setIsTicketsModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
  const [isHostModalOpen, setIsHostModalOpen] = useState(false);

  // Review Target Modal State
  const [reviewTarget, setReviewTarget] = useState<{
    id: string;
    title: string;
    type: 'event' | 'vendor';
    image?: string;
  } | null>(null);

  // Handlers
  const handleAddReview = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);

    if (newReview.targetType === 'event') {
      const allTargetReviews = [
        ...reviews.filter((r) => r.targetId === newReview.targetId),
        newReview
      ];
      const sum = allTargetReviews.reduce((acc, curr) => acc + curr.rating, 0);
      const newAverage = Number((sum / allTargetReviews.length).toFixed(1));

      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === newReview.targetId
            ? { ...evt, rating: newAverage, reviewsCount: allTargetReviews.length }
            : evt
        )
      );
    } else {
      const allTargetReviews = [
        ...reviews.filter((r) => r.targetId === newReview.targetId),
        newReview
      ];
      const sum = allTargetReviews.reduce((acc, curr) => acc + curr.rating, 0);
      const newAverage = Number((sum / allTargetReviews.length).toFixed(2));

      setVendors((prev) =>
        prev.map((vnd) =>
          vnd.id === newReview.targetId
            ? { ...vnd, rating: newAverage, reviewsCount: allTargetReviews.length }
            : vnd
        )
      );

      if (selectedVendor && selectedVendor.id === newReview.targetId) {
        setSelectedVendor((prev) =>
          prev ? { ...prev, rating: newAverage, reviewsCount: allTargetReviews.length } : null
        );
      }
    }
  };

  const handleTicketPurchased = (newTicket: PurchasedTicket) => {
    setPurchasedTickets((prev) => [newTicket, ...prev]);
    setEvents((prev) =>
      prev.map((evt) =>
        evt.id === newTicket.eventId
          ? { ...evt, seatsLeft: Math.max(0, evt.seatsLeft - 1) }
          : evt
      )
    );
  };

  const handleAddNewEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  // Filter Logic
  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === 'All' || evt.city === selectedCity;
    const matchesCategory = selectedEventCategory === 'All' || evt.category === selectedEventCategory;

    return matchesSearch && matchesCity && matchesCategory;
  });

  const filteredVendors = vendors.filter((vnd) => {
    const matchesSearch =
      vnd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vnd.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vnd.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === 'All' || vnd.city === selectedCity;
    const matchesCategory = selectedVendorCategory === 'All' || vnd.category === selectedVendorCategory;

    return matchesSearch && matchesCity && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] selection:bg-[var(--accent)] selection:text-[var(--accent-text)] transition-colors">
      {/* Top Navigation with Dark Mode & Theme controls */}
      <Navbar
        onOpenTickets={() => setIsTicketsModalOpen(true)}
        onOpenScanner={() => setIsScannerModalOpen(true)}
        onOpenInvitations={() => setIsInvitationModalOpen(true)}
        onOpenHostEvent={() => setIsHostModalOpen(true)}
        ticketCount={purchasedTickets.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Hero Showcase with Live Countdown Timer */}
      <Hero
        featuredEvent={FEATURED_EVENT}
        onBookEvent={(evt) => setBookingEvent(evt)}
        onOpenInvitations={() => setIsInvitationModalOpen(true)}
      />

      {/* Trust & Proof Metric Strip */}
      <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-6 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="font-mono text-xl sm:text-2xl font-black text-[var(--accent)]">45,000+</span>
              <p className="text-[11px] text-[var(--text-muted)] font-semibold uppercase">Tigidho La Goostay</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xl sm:text-2xl font-black text-[var(--accent)]">120+</span>
              <p className="text-[11px] text-[var(--text-muted)] font-semibold uppercase">Hoolal & Xaflado Weyn</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xl sm:text-2xl font-black text-[var(--accent)]">100%</span>
              <p className="text-[11px] text-[var(--text-muted)] font-semibold uppercase">QR Code Xaqiijin Degdeg ah</p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xl sm:text-2xl font-black text-[var(--accent)]">EVC / Zaad</span>
              <p className="text-[11px] text-[var(--text-muted)] font-semibold uppercase">Lacag Bixin Mobile Money ah</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Explorer Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Navigation Tabs Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--accent)] font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Sahmi & Xulo</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight font-serif-luxury">
              {activeTab === 'events'
                ? 'Munaasabadaha & Tigidhada Diyaar-ka ah'
                : 'Hoolalka & Adeegyada Aroosyada'}
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl shadow-xs self-start md:self-auto transition-colors">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Xafladaha ({events.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('wedding-hub')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'wedding-hub'
                  ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Aroosyada & Hoolalka ({vendors.length})</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-4 mb-8 space-y-4 shadow-sm transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder={
                  activeTab === 'events'
                    ? 'Raadi shir, fanka, goobta, ama magaca xafladda...'
                    : 'Raadi hool, sawir-qaade, cunto, ama qurxin...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] font-medium transition-colors"
              />
            </div>

            {/* City Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value as any)}
                className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] font-medium transition-colors"
              >
                <option value="All">Dhammaan Magaalooyinka</option>
                <option value="Muqdisho">Muqdisho</option>
                <option value="Hargeysa">Hargeysa</option>
                <option value="Garoowe">Garoowe</option>
                <option value="Kismaayo">Kismaayo</option>
              </select>
            </div>

            {/* Category Selector depending on tab */}
            <div className="md:col-span-3">
              {activeTab === 'events' ? (
                <select
                  value={selectedEventCategory}
                  onChange={(e) => setSelectedEventCategory(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] font-medium transition-colors"
                >
                  <option value="All">Dhammaan Qeybaha</option>
                  <option value="Shirarka">Shirarka (Conferences)</option>
                  <option value="Aroosyada">Aroosyada (Weddings)</option>
                  <option value="Fanka & Dhaqanka">Fanka & Dhaqanka (Festivals)</option>
                  <option value="Carwooyinka">Carwooyinka (Expos)</option>
                  <option value="Ciyaaraha">Ciyaaraha (Sports)</option>
                </select>
              ) : (
                <select
                  value={selectedVendorCategory}
                  onChange={(e) => setSelectedVendorCategory(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] font-medium transition-colors"
                >
                  <option value="All">Dhammaan Qeybaha</option>
                  <option value="Hoolalka">Hoolalka (Venues)</option>
                  <option value="Sawir-qaadista">Sawir-qaadista (Photographers)</option>
                  <option value="Cuntada & Keega">Cuntada & Keega (Catering)</option>
                  <option value="Qurxinta Masraxa">Qurxinta Masraxa (Decor)</option>
                </select>
              )}
            </div>
          </div>

          {/* Quick Segmented Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 text-xs">
            <span className="text-[11px] text-[var(--text-muted)] uppercase font-bold shrink-0">
              Qaybaha:
            </span>
            {activeTab === 'events' ? (
              ['All', 'Shirarka', 'Aroosyada', 'Fanka & Dhaqanka', 'Carwooyinka', 'Ciyaaraha'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedEventCategory(cat)}
                  className={`px-3 py-1 rounded-lg transition-colors shrink-0 text-xs ${
                    selectedEventCategory === cat
                      ? 'bg-[var(--accent)] text-[var(--accent-text)] font-bold shadow-xs'
                      : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] font-medium'
                  }`}
                >
                  {cat === 'All' ? 'Dhammaan' : cat}
                </button>
              ))
            ) : (
              ['All', 'Hoolalka', 'Sawir-qaadista', 'Cuntada & Keega', 'Qurxinta Masraxa'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedVendorCategory(cat)}
                  className={`px-3 py-1 rounded-lg transition-colors shrink-0 text-xs ${
                    selectedVendorCategory === cat
                      ? 'bg-[var(--accent)] text-[var(--accent-text)] font-bold shadow-xs'
                      : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] font-medium'
                  }`}
                >
                  {cat === 'All' ? 'Dhammaan' : cat}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Grid Content */}
        {activeTab === 'events' ? (
          <div>
            {filteredEvents.length === 0 ? (
              <div className="py-16 text-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xs transition-colors">
                <Ticket className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[var(--text-primary)]">Wax Munaasabad ah Lama Helin</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
                  Isku day inaad beddesho erayga raadinta ama doorato magaalo kale.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCity('All');
                    setSelectedEventCategory('All');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] font-bold text-xs shadow-xs"
                >
                  Dib u celi Raadinta
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    onBook={(selectedEvt) => setBookingEvent(selectedEvt)}
                    onOpenReviews={(selectedEvt) =>
                      setReviewTarget({
                        id: selectedEvt.id,
                        title: selectedEvt.title,
                        type: 'event',
                        image: selectedEvt.image
                      })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {filteredVendors.length === 0 ? (
              <div className="py-16 text-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl shadow-xs transition-colors">
                <Heart className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[var(--text-primary)]">Wax Adeeg ah Lama Helin</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 max-w-sm mx-auto">
                  Isku day inaad beddesho erayga raadinta ama nooca adeegga.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vnd) => (
                  <VendorCard
                    key={vnd.id}
                    vendor={vnd}
                    onSelect={(selectedVnd) => setSelectedVendor(selectedVnd)}
                    onOpenReviews={(selectedVnd) =>
                      setReviewTarget({
                        id: selectedVnd.id,
                        title: selectedVnd.name,
                        type: 'vendor',
                        image: selectedVnd.image
                      })
                    }
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Feature Highlights Banner */}
        <section className="mt-20 rounded-3xl p-8 sm:p-10 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] shadow-xl relative overflow-hidden transition-colors">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[var(--accent)] tracking-wider uppercase font-mono">
              ★ Adeegyo Gaar ah
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-1 font-serif-luxury text-[var(--text-primary)]">
              Qabanqaabo Aroos oo Dhammeystiran & Tigidho La Aaminsan Yahay
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
              Website-ka Martiqaad wuxuu meesha ka saarayaa dhibaatadii tigidhada been-abuurka ah iyo raadinta hoolalka aroosyada.
              Sameyso kaarka casuumaadda, gooso tigidhkaaga, ama kireyso adeegyada arooskaaga hal meel.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-6">
              <button
                onClick={() => setIsInvitationModalOpen(true)}
                className="py-2.5 px-5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] font-black text-xs transition-colors flex items-center gap-2 shadow-md shadow-[var(--accent-glow)] active:scale-95"
              >
                <Heart className="w-4 h-4" />
                <span>Naqshadey Kaarka Casuumaadda</span>
              </button>

              <button
                onClick={() => setIsScannerModalOpen(true)}
                className="py-2.5 px-5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-page-secondary)] text-[var(--text-primary)] font-semibold text-xs border border-[var(--border-subtle)] transition-colors flex items-center gap-2"
              >
                <QrCode className="w-4 h-4 text-[var(--accent)]" />
                <span>Tijaabi Baaraha Tigidhada (Scanner)</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      {bookingEvent && (
        <TicketBookingModal
          event={bookingEvent}
          isOpen={!!bookingEvent}
          onClose={() => setBookingEvent(null)}
          onTicketPurchased={handleTicketPurchased}
        />
      )}

      {selectedVendor && (
        <VendorDetailModal
          vendor={selectedVendor}
          isOpen={!!selectedVendor}
          onClose={() => setSelectedVendor(null)}
          onOpenReviewModal={(vnd) =>
            setReviewTarget({
              id: vnd.id,
              title: vnd.name,
              type: 'vendor',
              image: vnd.image
            })
          }
          vendorReviews={
            selectedVendor
              ? reviews.filter((r) => r.targetId === selectedVendor.id)
              : []
          }
        />
      )}

      {/* Reviews & Feedback Modal */}
      {reviewTarget && (
        <ReviewModal
          isOpen={!!reviewTarget}
          onClose={() => setReviewTarget(null)}
          targetId={reviewTarget.id}
          targetTitle={reviewTarget.title}
          targetType={reviewTarget.type}
          targetImage={reviewTarget.image}
          reviews={reviews}
          averageRating={
            reviewTarget.type === 'event'
              ? events.find((e) => e.id === reviewTarget.id)?.rating || 5
              : vendors.find((v) => v.id === reviewTarget.id)?.rating || 5
          }
          totalReviews={
            reviewTarget.type === 'event'
              ? events.find((e) => e.id === reviewTarget.id)?.reviewsCount || 0
              : vendors.find((v) => v.id === reviewTarget.id)?.reviewsCount || 0
          }
          onAddReview={handleAddReview}
        />
      )}

      <MyTicketsModal
        isOpen={isTicketsModalOpen}
        onClose={() => setIsTicketsModalOpen(false)}
        tickets={purchasedTickets}
      />

      <QrScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        validTickets={purchasedTickets}
      />

      <InvitationStudioModal
        isOpen={isInvitationModalOpen}
        onClose={() => setIsInvitationModalOpen(false)}
      />

      <HostEventModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
        onAddNewEvent={handleAddNewEvent}
      />
    </div>
  );
}
