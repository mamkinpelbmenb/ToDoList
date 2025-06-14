// @ts-check
import React from 'react';
import PropTypes from 'prop-types';


/** 
 * @typedef {import('../types/global').Theme} Theme 
 */

/**
 * @param {{
 *   theme: Theme,
 *   setTheme: (theme: Theme) => void
 * }} props
 */
export default function ThemeSelector({ theme, setTheme }) {
  const themes = [
    { name: 'light', label: 'Light' },
    { name: 'dark', label: 'Dark' },
    { name: 'blue', label: 'Blue' },
    { name: 'green', label: 'Green' }
  ];

  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} e
   */
  const handleChange = (e) => {
    // Приводим значение к типу Theme
    const selectedTheme = /** @type {Theme} */ (e.target.value);
    setTheme(selectedTheme);
  };

  return (
    <div className="theme-selector">
      <label>Theme:</label>
      <select 
        value={theme} 
        onChange={handleChange}
      >
        {themes.map(t => (
          <option key={t.name} value={t.name}>{t.label}</option>
        ))}
      </select>
    </div>
  );
}

ThemeSelector.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark', 'blue', 'green']).isRequired,
  setTheme: PropTypes.func.isRequired
};