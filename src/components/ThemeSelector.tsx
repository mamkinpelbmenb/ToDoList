import React from 'react';
import { Theme } from '../types/global';

// Стиль для скрытой метки (добавьте в CSS)
// .visually-hidden {
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   border: 0;
// }

interface ThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, setTheme }) => {
  const themes = [
    { name: 'light', label: 'Light' },
    { name: 'dark', label: 'Dark' },
    { name: 'blue', label: 'Blue' },
    { name: 'green', label: 'Green' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value as Theme;
    setTheme(selectedTheme);
  };

  return (
    <div className="theme-selector">
      {/* Скрытая метка для скринридеров */}
      <label htmlFor="theme-select" className="visually-hidden">
        Select application theme
      </label>
      
      <select 
        id="theme-select"
        value={theme} 
        onChange={handleChange}
        aria-label="Select application theme"
      >
        {themes.map(t => (
          <option key={t.name} value={t.name}>{t.label}</option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;