import React, { useState, useEffect } from 'react';
import { Theme } from '../types/global';

interface ThemeCustomizerProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  onSaveCustomTheme?: (themeData: any) => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ 
  currentTheme, 
  onThemeChange,
  onSaveCustomTheme
}) => {
  const [customPrimary, setCustomPrimary] = useState('#4CAF50');
  const [customSecondary, setCustomSecondary] = useState('#2196F3');
  const [customBg, setCustomBg] = useState('#f8f9fa');
  const [customSurface, setCustomSurface] = useState('#ffffff');
  const [customText, setCustomText] = useState('#212121');
  
  // Расширим список тем с учетом новых значений
  const predefinedThemes: Theme[] = ['light', 'dark', 'blue', 'green', 'sunset', 'midnight'];

  useEffect(() => {
    // При монтировании, если тема не предустановленная, применить кастомные цвета
    if (!predefinedThemes.includes(currentTheme)) {
      applyCustomTheme();
    }
  }, []);

  const applyCustomTheme = () => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', customPrimary);
    root.style.setProperty('--primary-light', lightenColor(customPrimary, 30));
    root.style.setProperty('--primary-dark', darkenColor(customPrimary, 20));
    root.style.setProperty('--secondary-color', customSecondary);
    root.style.setProperty('--background-color', customBg);
    root.style.setProperty('--surface-color', customSurface);
    root.style.setProperty('--text-color', customText);
    root.style.setProperty('--text-secondary', lightenColor(customText, 40));
    
    onThemeChange('custom' as Theme);
    
    if (onSaveCustomTheme) {
      onSaveCustomTheme({
        primary: customPrimary,
        secondary: customSecondary,
        bg: customBg,
        surface: customSurface,
        text: customText
      });
    }
  };

  // Упрощенные функции для осветления и затемнения
  const lightenColor = (color: string, percent: number): string => {
    // В реальной реализации здесь должна быть логика осветления
    return color; 
  };

  const darkenColor = (color: string, percent: number): string => {
    // В реальной реализации здесь должна быть логика затемнения
    return color; 
  };

  const handleSaveCustomTheme = () => {
    if (onSaveCustomTheme) {
      onSaveCustomTheme({
        primary: customPrimary,
        secondary: customSecondary,
        bg: customBg,
        surface: customSurface,
        text: customText
      });
      alert('Custom theme saved!');
    }
  };

  return (
    <div className="theme-customizer">
      <h3>Customize Theme</h3>
      
      <div className="predefined-themes">
        {predefinedThemes.map(theme => (
          <button
            key={theme}
            className={`theme-btn ${currentTheme === theme ? 'active' : ''}`}
            onClick={() => onThemeChange(theme)}
            aria-label={`${theme} theme`}
          >
            {theme}
          </button>
        ))}
      </div>
      
      <div className="custom-theme-form">
        <div className="form-group">
          <label htmlFor="primary-color">Primary Color</label>
          <div className="color-picker">
            <input 
              id="primary-color"
              type="color" 
              value={customPrimary} 
              onChange={(e) => setCustomPrimary(e.target.value)}
              aria-label="Primary color"
            />
            <span>{customPrimary}</span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="secondary-color">Secondary Color</label>
          <div className="color-picker">
            <input 
              id="secondary-color"
              type="color" 
              value={customSecondary} 
              onChange={(e) => setCustomSecondary(e.target.value)}
              aria-label="Secondary color"
            />
            <span>{customSecondary}</span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="bg-color">Background Color</label>
          <div className="color-picker">
            <input 
              id="bg-color"
              type="color" 
              value={customBg} 
              onChange={(e) => setCustomBg(e.target.value)}
              aria-label="Background color"
            />
            <span>{customBg}</span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="surface-color">Surface Color</label>
          <div className="color-picker">
            <input 
              id="surface-color"
              type="color" 
              value={customSurface} 
              onChange={(e) => setCustomSurface(e.target.value)}
              aria-label="Surface color"
            />
            <span>{customSurface}</span>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="text-color">Text Color</label>
          <div className="color-picker">
            <input 
              id="text-color"
              type="color" 
              value={customText} 
              onChange={(e) => setCustomText(e.target.value)}
              aria-label="Text color"
            />
            <span>{customText}</span>
          </div>
        </div>
        
        <div className="actions">
          <button onClick={applyCustomTheme}>Apply Custom Theme</button>
          <button onClick={handleSaveCustomTheme} className="secondary">Save Theme</button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;