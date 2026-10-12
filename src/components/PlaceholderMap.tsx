import React, { useState } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers, ExternalLink, Compass } from 'lucide-react';

interface PlaceholderMapProps {
  venue: string;
  city: string;
  variant?: 'compact' | 'expanded';
  className?: string;
}

// City landmark coordinates and simulated road names for authenticity
const CITY_LANDMARKS: Record<string, { mainRoad: string; district: string; distanceAirport: string; near: string }> = {
  Muqdisho: {
    mainRoad: 'Wadada Maka Al-Mukarama / KM4',
    district: 'Degmada Hodan / Wadajir',
    distanceAirport: '4.8 km ka xigta Garoonka Aadan Cadde',
    near: 'U dhow Isgoyska KM4 & Jazeera'
  },
  Hargeysa: {
    mainRoad: 'Wadada 26-ka Juun / Jigjiga Yar',
    district: 'Degmada Ibraahim Koodbuur',
    distanceAirport: '6.2 km ka xigta Garoonka Cigaal',
    near: 'U dhow Beerta Xorriyadda & Hotel Mansoor'
  },
  Garoowe: {
    mainRoad: 'Wadada Halgan / Wadada Madaxtooyada',
    district: 'Xaafadda Hanti-wadaag',
    distanceAirport: '5.1 km ka xigta Garoonka Gen. Maxamed Abshir',
    near: 'U dhow Masaajidka Al-Huda & Madaxtooyada'
  },
  Kismaayo: {
    mainRoad: 'Wadada Dekedda / Calanley',
    district: 'Degmada Calanley & Guulwade',
    distanceAirport: '7.0 km ka xigta Garoonka Kismaayo',
    near: 'U dhow Xeebta & Dekedda Kismaayo'
  }
};

export const PlaceholderMap: React.FC<PlaceholderMapProps> = ({
  venue,
  city,
  variant = 'compact',
  className = ''
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapType, setMapType] = useState<'streets' | 'satellite'>('streets');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const cityInfo = CITY_LANDMARKS[city] || {
    mainRoad: 'Wadada Dhexe ee Magaalada',
    district: 'Badhtamaha Magaalada',
    distanceAirport: '3.5 km ka xigta bartamaha',
    near: 'Goob caan ah oo laga wada garanayo magaalada'
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 1.75));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${venue}, ${city}, Somalia`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venue}, ${cityInfo.mainRoad}, ${city}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isCompact = variant === 'compact';

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card-subtle)] shadow-inner select-none ${
        isCompact ? 'h-48 w-full' : 'h-64 sm:h-72 w-full'
      } ${className}`}
    >
      {/* Interactive Simulated Vector Map Grid */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Background Map Canvas Tiles */}
        {mapType === 'streets' ? (
          <div className="absolute inset-0 bg-[#e5e9ec] dark:bg-[#0d1524]">
            {/* Waterway / Coastal curve SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 dark:opacity-25"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              viewBox="0 0 400 200"
            >
              <path
                d="M-20,180 Q100,120 220,160 T420,130 L420,220 L-20,220 Z"
                fill="#93c5fd"
                className="dark:fill-[#1e3a5f]"
              />
              <path
                d="M120,-10 Q160,80 180,210"
                stroke="#60a5fa"
                strokeWidth="12"
                fill="none"
                opacity="0.3"
              />
            </svg>

            {/* Street Grid SVG Pattern */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 300"
              preserveAspectRatio="none"
            >
              {/* Secondary roads */}
              <line x1="0" y1="50" x2="600" y2="50" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />
              <line x1="0" y1="110" x2="600" y2="110" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />
              <line x1="0" y1="240" x2="600" y2="240" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />

              <line x1="80" y1="0" x2="80" y2="300" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />
              <line x1="180" y1="0" x2="180" y2="300" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />
              <line x1="280" y1="0" x2="280" y2="300" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />
              <line x1="380" y1="0" x2="380" y2="300" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />
              <line x1="480" y1="0" x2="480" y2="300" stroke="#cbd5e1" strokeWidth="2.5" className="dark:stroke-[#1e293b]" />

              {/* Major arterial highway / Avenue */}
              <path
                d="M0,140 Q250,150 600,100"
                stroke="#f59e0b"
                strokeWidth="7"
                fill="none"
                opacity="0.85"
                strokeLinecap="round"
              />
              <path
                d="M200,0 Q320,160 380,300"
                stroke="#ffffff"
                strokeWidth="6"
                fill="none"
                opacity="0.9"
                className="dark:stroke-[#334155]"
              />

              {/* Park green zone */}
              <rect x="420" y="20" width="130" height="70" rx="8" fill="#86efac" opacity="0.35" className="dark:fill-[#064e3b] dark:opacity-40" />
              <rect x="30" y="190" width="110" height="80" rx="8" fill="#86efac" opacity="0.3" className="dark:fill-[#064e3b] dark:opacity-30" />
            </svg>
          </div>
        ) : (
          /* Satellite Terrain Simulation */
          <div className="absolute inset-0 bg-[#1e293b] dark:bg-[#070b12] bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-800/60 to-slate-900/90" />
            <svg className="absolute inset-0 w-full h-full opacity-35" viewBox="0 0 600 300">
              <path d="M0,140 Q250,150 600,100" stroke="#fbbf24" strokeWidth="4" fill="none" />
              <path d="M200,0 Q320,160 380,300" stroke="#94a3b8" strokeWidth="3" fill="none" />
            </svg>
          </div>
        )}

        {/* Street Label Overlays */}
        <div className="absolute top-4 left-6 text-[9px] font-mono font-bold tracking-wider text-slate-600 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 backdrop-blur px-2 py-0.5 rounded border border-black/5 dark:border-white/5 pointer-events-none">
          {cityInfo.mainRoad}
        </div>

        <div className="absolute bottom-4 left-6 text-[9px] font-mono text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-900/70 backdrop-blur px-2 py-0.5 rounded border border-black/5 dark:border-white/5 pointer-events-none">
          {city} · {cityInfo.district}
        </div>
      </div>

      {/* Central Interactive Pulsing Location Pin Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10">
        {/* Venue Information Tooltip above Pin */}
        <div className="mb-1.5 px-3 py-1 rounded-xl bg-slate-900/95 dark:bg-slate-950/95 text-white border border-[var(--border-accent)] shadow-xl flex items-center gap-1.5 backdrop-blur max-w-[210px] text-center pointer-events-auto">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 animate-bounce" />
          <div className="truncate">
            <p className="text-[11px] font-bold text-white truncate leading-tight">{venue}</p>
            <p className="text-[9px] text-[var(--accent)] leading-tight">{city}</p>
          </div>
        </div>

        {/* Pin with Animated Radar Wave Pulse */}
        <div className="relative flex items-center justify-center">
          <span className="absolute w-8 h-8 rounded-full bg-[var(--accent)] opacity-75 animate-ping pointer-events-none" />
          <span className="absolute w-6 h-6 rounded-full bg-[var(--accent)]/30 pointer-events-none" />
          <div className="w-5 h-5 rounded-full bg-[var(--accent)] text-[var(--accent-text)] flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-current" />
          </div>
        </div>
      </div>

      {/* Top Right Map Controls (Zoom & Layer) */}
      <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-20">
        <button
          type="button"
          onClick={handleZoomIn}
          className="w-7 h-7 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] flex items-center justify-center shadow-md active:scale-90 transition-all"
          title="Soo dhaweey (Zoom in)"
          aria-label="Zoom in map"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          className="w-7 h-7 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur border border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface)] flex items-center justify-center shadow-md active:scale-90 transition-all"
          title="Kala fogee (Zoom out)"
          aria-label="Zoom out map"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setMapType((prev) => (prev === 'streets' ? 'satellite' : 'streets'))}
          className={`w-7 h-7 rounded-lg backdrop-blur border text-[var(--text-primary)] flex items-center justify-center shadow-md active:scale-90 transition-all ${
            mapType === 'satellite'
              ? 'bg-[var(--accent)] text-[var(--accent-text)] border-[var(--border-accent)]'
              : 'bg-[var(--bg-surface)]/90 border-[var(--border-subtle)] hover:bg-[var(--bg-surface)]'
          }`}
          title="Baddal nooca khariidadda (Toggle satellite/streets)"
          aria-label="Toggle map view"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Bar Details & Directions Button */}
      <div className="absolute bottom-2 right-3 flex items-center gap-2 z-20">
        <button
          type="button"
          onClick={handleCopyAddress}
          className="px-2.5 py-1 rounded-lg bg-[var(--bg-surface)]/90 backdrop-blur border border-[var(--border-subtle)] text-[10px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-sm transition-all"
        >
          {isCopied ? 'Waa La Koobiyay!' : 'Koobiye Ciwaanka'}
        </button>

        <button
          type="button"
          onClick={handleOpenGoogleMaps}
          className="px-2.5 py-1 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] text-[10px] font-bold shadow-md flex items-center gap-1 active:scale-95 transition-all"
          title="Ka fur Google Maps toos ah"
        >
          <Navigation className="w-3 h-3" />
          <span>Tilmaamaha</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
        </button>
      </div>

      {/* Compass indicator */}
      <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-[9px] font-mono text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur px-2 py-0.5 rounded border border-black/5 dark:border-white/5 z-20">
        <Compass className="w-3 h-3 text-[var(--accent)]" />
        <span>GPS: Goob Xaqiijisan</span>
      </div>
    </div>
  );
};
