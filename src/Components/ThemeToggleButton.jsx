import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function ThemeToggleButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button className="button" onClick={toggleTheme} style={{ margin: '10px' }}>
             Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
}
