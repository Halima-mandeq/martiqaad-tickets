import React, { useState } from 'react';
import { Ticket, Heart, QrCode, PlusCircle, Menu, X, Palette, Check, Sun, Moon } from 'lucide-react';

export type EventTheme = 'gold' | 'emerald' | 'indigo';

interface NavbarProps {
  onOpenTickets: () => void;
  onOpenScanner: () => void;
  onOpenInvitations: () => void;
  onOpenHostEvent: () => void;
  ticketCount: number;
  activeTab: 'events' | 'wedding-hub';
  setActiveTab: (tab: 'events' | 'wedding-hub') => void;
  currentTheme: EventTheme;
  onThemeChange: (theme: EventTheme) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTickets,
  onOpenScanner,
  onOpenInvitations,
  onOpenHostEvent,
  ticketCount,
  activeTab,
  setActiveTab,
  currentTheme,
  onThemeChange,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const themeOptions: { id: EventTheme; name: string; tag: string; dotClass: string }[] = [
    {
      id: 'gold',
      name: 'Dahab & Sharaf',
      tag: 'Shirarka & Galas',
      dotClass: 'bg-amber-500'
    },
    {
      id: 'emerald',
      name: 'Aroos & Barwaaqo',
      tag: 'Aroosyada & Hoolalka',
      dotClass: 'bg-emerald-500'
    },
    {
      id: 'indigo',
      name: 'Casri & Xarrago',
      tag: 'Bandhigyada & Fanka',
      dotClass: 'bg-indigo-600'
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[var(--bg-surface)]/95 border-b border-[var(--border-subtle)] shadow-xs transition-colors">
      {/* Top announcement bar */}
      <div className="bg-[var(--navy-primary)] text-white text-[11px] py-1.5 px-4 text-center font-medium border-b border-black/20">
        <span className="text-[var(--accent)] font-bold uppercase tracking-wider mr-2">
          ★ Munaasabado & Tigidho:
        </span>
        Gooso tigidhada shirarka, carwooyinka iyo xafladaha adoo isticmaalaya EVC Plus, Zaad & Sahal.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-[var(--border-accent)] text-[var(--accent)] flex items-center justify-center shadow-md shrink-0">
            <Ticket className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-[var(--text-primary)] font-serif-luxury">
                MARTIQAAD
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] tracking-wider uppercase font-bold">
              Tigidhada & Munaasabadaha
            </p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[var(--bg-card-subtle)] p-1.5 rounded-full border border-[var(--border-subtle)]">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'events'
                ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Munaasabadaha & Tigidhada
          </button>
          <button
            onClick={() => setActiveTab('wedding-hub')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'wedding-hub'
                ? 'bg-[var(--accent)] text-[var(--accent-text)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Hoolalka & Aroosyada
          </button>
          <button
            onClick={onOpenInvitations}
            className="px-4 py-2 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Kaarka Casuumaadda</span>
          </button>
          <button
            onClick={onOpenScanner}
            className="px-4 py-2 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>Baaraha Albaabka</span>
          </button>
        </nav>

        {/* Right Actions, Dark Mode & Theme Selector */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-page-secondary)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all flex items-center justify-center shadow-xs"
            title={isDarkMode ? 'Baddal: Habka Cad (Switch to Light Mode)' : 'Baddal: Habka Madow (Switch to Dark Mode)'}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-300" />
            )}
          </button>

          {/* Quick Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-page-secondary)] border border-[var(--border-subtle)] text-xs font-semibold text-[var(--text-secondary)] transition-colors"
              title="Dooro midabka ku habboon munaasabadda"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Midabka</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shrink-0" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                <p className="text-[10px] uppercase font-bold text-[var(--text-muted)] px-3 py-1 tracking-wider">
                  Dooro Midabka Website-ka
                </p>
                <div className="space-y-1">
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onThemeChange(opt.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors ${
                        currentTheme === opt.id
                          ? 'bg-[var(--accent-light)] text-[var(--text-primary)] font-bold'
                          : 'hover:bg-[var(--bg-card-subtle)] text-[var(--text-secondary)] font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3.5 h-3.5 rounded-full ${opt.dotClass} shadow-xs`} />
                        <div>
                          <p className="leading-none">{opt.name}</p>
                          <span className="text-[10px] text-[var(--text-muted)] leading-none">{opt.tag}</span>
                        </div>
                      </div>
                      {currentTheme === opt.id && (
                        <Check className="w-4 h-4 text-[var(--accent)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* My Tickets Button */}
          <button
            onClick={onOpenTickets}
            className="relative flex items-center gap-2 py-2 px-3.5 rounded-xl bg-[var(--bg-card-subtle)] hover:bg-[var(--bg-page-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)] transition-colors"
          >
            <Ticket className="w-4 h-4 text-[var(--accent)]" />
            <span>Tigidhadeyda</span>
            {ticketCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[var(--accent)] text-[var(--accent-text)] text-[10px] font-black flex items-center justify-center">
                {ticketCount}
              </span>
            )}
          </button>

          {/* Host Event Button */}
          <button
            onClick={onOpenHostEvent}
            className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-xs font-black shadow-md border border-[var(--border-accent)] active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Diiwaangeli Xaflad</span>
          </button>
        </div>

        {/* Mobile menu toggle & dark mode toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onToggleDarkMode}
            className="w-10 h-10 rounded-xl bg-[var(--bg-card-subtle)] text-[var(--text-primary)] flex items-center justify-center border border-[var(--border-subtle)]"
            title="Baddal Habka Madow/Cad"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-[var(--bg-card-subtle)] text-[var(--text-primary)] flex items-center justify-center border border-[var(--border-subtle)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200 shadow-lg text-[var(--text-primary)]">
          {/* Theme & Mode Quick Switcher Mobile */}
          <div className="p-3 bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--border-subtle)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                Midabka Website-ka:
              </span>
              <button
                onClick={onToggleDarkMode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)]"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{isDarkMode ? 'Habka Cad' : 'Habka Madow'}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {themeOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onThemeChange(opt.id)}
                  className={`py-2 px-1 rounded-lg text-[11px] font-bold text-center flex flex-col items-center gap-1 border transition-all ${
                    currentTheme === opt.id
                      ? 'bg-[var(--bg-surface)] border-[var(--accent)] text-[var(--text-primary)] shadow-xs'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${opt.dotClass}`} />
                  <span className="truncate w-full">{opt.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[var(--border-subtle)]">
            <button
              onClick={() => {
                setActiveTab('events');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold text-center ${
                activeTab === 'events' ? 'bg-[var(--accent)] text-[var(--accent-text)]' : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              Munaasabadaha
            </button>
            <button
              onClick={() => {
                setActiveTab('wedding-hub');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-xs font-bold text-center ${
                activeTab === 'wedding-hub' ? 'bg-[var(--accent)] text-[var(--accent-text)]' : 'bg-[var(--bg-card-subtle)] text-[var(--text-secondary)]'
              }`}
            >
              Aroosyada & Hoolalka
            </button>
          </div>

          <button
            onClick={() => {
              onOpenInvitations();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-medium text-left"
          >
            <Heart className="w-4 h-4 text-[var(--accent)]" />
            <span>Naqshadeynta Kaarka Casuumaadda Arooska</span>
          </button>

          <button
            onClick={() => {
              onOpenScanner();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-2.5 p-3 rounded-xl bg-[var(--bg-card-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)] text-xs font-medium text-left"
          >
            <QrCode className="w-4 h-4 text-[var(--text-muted)]" />
            <span>Baaraha Albaabka (QR Scanner)</span>
          </button>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenTickets();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-card-subtle)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border-subtle)]"
            >
              <Ticket className="w-4 h-4 text-[var(--accent)]" />
              <span>Tigidhadeyda ({ticketCount})</span>
            </button>
            <button
              onClick={() => {
                onOpenHostEvent();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent)] text-[var(--accent-text)] text-xs font-bold border border-[var(--border-accent)]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Diiwaangeli Xaflad</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
