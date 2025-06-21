import React from 'react';
import { Theme } from '../types/global';

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
      <label htmlFor="theme-select" className="theme-label">
        Theme:
      </label>
      
      <select 
        id="theme-select"
        value={theme} 
        onChange={handleChange}
        aria-label="Select application theme"
        title="Select color theme"
      >
        {themes.map(t => (
          <option 
            key={t.name} 
            value={t.name}
            aria-label={`${t.label} theme`}
          >
            {t.label}
          </option>
        ))}
      </select>
      
      <div className="theme-preview" aria-hidden="true">
        {themes.map(t => (
          <div 
            key={t.name}
            className={`theme-option ${theme === t.name ? 'active' : ''}`}
            onClick={() => setTheme(t.name as Theme)}
            title={`Select ${t.label} theme`}
            aria-hidden="true"
          >
            <div className={`theme-dot ${t.name}`} />
            <span className="theme-name">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;