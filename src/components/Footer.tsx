import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, Check, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[var(--bg-card)] border-t border-[var(--border-subtle)] text-[var(--text-secondary)] text-xs mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-300 p-0.5 shadow-md">
                <div className="w-full h-full bg-[var(--bg-surface)] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                </div>
              </div>
              <span className="font-serif-luxury text-xl font-bold tracking-widest text-[var(--text-primary)]">
                MARTIQAAD
              </span>
            </div>

            <p className="text-[var(--text-muted)] leading-relaxed max-w-sm text-xs">
              Madasha ugu horreysa ee casriga ah ee loogu talagalay goosashada tigidhada dhijitaalka ah ee munaasabadaha iyo qabanqaabada aroosyada heerka sare ah ee Soomaaliya.
            </p>

            <div className="pt-2 text-[var(--text-secondary)] space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>Mogadishu · Hargeisa · Garowe · Kismayo</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>+252 61 500 0000 / +252 63 400 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                <span>support@martiqaad.so</span>
              </div>
            </div>
          </div>

          {/* Quick Links 1: Munaasabadaha */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-xs">
              Munaasabadaha
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#events" className="hover:text-[var(--accent)] transition-colors">Shirarka Ganacsiga</a></li>
              <li><a href="#events" className="hover:text-[var(--accent)] transition-colors">Bandhigyada Fanka</a></li>
              <li><a href="#events" className="hover:text-[var(--accent)] transition-colors">Ciyaaraha & Koobabka</a></li>
              <li><a href="#events" className="hover:text-[var(--accent)] transition-colors">Carwooyinka Caalamiga ah</a></li>
            </ul>
          </div>

          {/* Quick Links 2: Aroosyada & Hoolalka */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-xs">
              Aroosyada & Hoolalka
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#wedding-hub" className="hover:text-[var(--accent)] transition-colors">Kireynta Hoolalka</a></li>
              <li><a href="#wedding-hub" className="hover:text-[var(--accent)] transition-colors">Sawir-qaadayaasha (4K)</a></li>
              <li><a href="#wedding-hub" className="hover:text-[var(--accent)] transition-colors">Cuntada Martida & Keega</a></li>
              <li><a href="#wedding-hub" className="hover:text-[var(--accent)] transition-colors">Qurxinta Masraxa</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-xs">
              Wargeyska Xafladaha
            </h4>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Iska diiwaangeli si aad u hesho ogeysiisyada tigidhada cusub iyo qiime-dhimista.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[var(--accent-light)] border border-[var(--border-accent)] rounded-xl text-[var(--accent)] text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Waad ku biirtay! Mahadsanid.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Geli email-kaaga..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[var(--bg-card-subtle)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-[var(--accent)] hover:opacity-90 text-[var(--accent-text)] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Ku Biir</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[var(--text-muted)]">© 2026 Martiqaad Inc. Xuquuqda oo dhan way dhowran tahay.</p>
          <div className="flex items-center gap-4 text-[var(--text-muted)]">
            <span className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Shuruudaha Isticmaalka</span>
            <span>·</span>
            <span className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Xeerka Ilaalinta Xogta</span>
            <span>·</span>
            <span className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">Caawinaad & Taageero</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
