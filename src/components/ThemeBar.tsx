import React from 'react';
import { THEMES, ThemeId } from '../types/theme';
import { Palette, Check } from 'lucide-react';

interface ThemeBarProps {
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export const ThemeBar: React.FC<ThemeBarProps> = ({ currentTheme, onSelectTheme }) => {
  return (
    <div className="bg-[var(--bg-page-secondary)] border-b border-[var(--border-subtle)] py-2 px-4 text-xs transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium">
          <Palette className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            Dooro Midabka aad Jeceshahay (Color Palette):
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`py-1 px-3 rounded-full text-[11px] font-medium transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--accent)] shadow-sm font-semibold'
                    : 'bg-transparent text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-subtle)]'
                }`}
                title={theme.description}
              >
                {/* Circular color swatch preview */}
                <span
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: theme.previewAccent }}
                />
                <span>{theme.nameSomali}</span>
                {isSelected && <Check className="w-3 h-3 text-[var(--accent)]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
