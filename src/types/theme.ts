export type ThemeId = 'pearl-gold' | 'royal-emerald' | 'sapphire-night';

export interface ThemeConfig {
  id: ThemeId;
  nameSomali: string;
  nameEnglish: string;
  description: string;
  previewBg: string;
  previewAccent: string;
  isDark: boolean;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'pearl-gold',
    nameSomali: 'Luul & Dahab (Pearl & Gold)',
    nameEnglish: 'Pearl White & Champagne',
    description: 'Muuqaal cad, iftiin leh oo aroosyada iyo xafladaha u gaar ah',
    previewBg: '#FAF9F6',
    previewAccent: '#B45309',
    isDark: false
  },
  {
    id: 'royal-emerald',
    nameSomali: 'Cagaarka Boqortooyada (Emerald)',
    nameEnglish: 'Royal Emerald & Mint',
    description: 'Xarrago casri ah oo cagaar iyo caddaan nadiif ah leh',
    previewBg: '#F3F8F5',
    previewAccent: '#059669',
    isDark: false
  },
  {
    id: 'sapphire-night',
    nameSomali: 'Bulugga Habeenka (Midnight Sapphire)',
    nameEnglish: 'Deep Navy & Gold',
    description: 'Muuqaal mugdi ah oo bulug boqortooyo iyo dahab leh',
    previewBg: '#0B132B',
    previewAccent: '#F59E0B',
    isDark: true
  }
];
