import React from 'react';

const ToggleButton = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      className="p-2 rounded-md bg-gray-300 dark:bg-gray-700"
      onClick={toggleDarkMode}
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ToggleButton;
