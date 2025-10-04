import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import '../pages/css/home.css';
import UMaineModeContext from '../context/UMaineModeContext';

const AppLayout = () => {
  const [isUMaineMode, setIsUMaineMode] = useState(false);

  const contextValue = useMemo(() => ({
    isUMaineMode,
    setIsUMaineMode,
    toggleUMaineMode: () => setIsUMaineMode((prev) => !prev)
  }), [isUMaineMode]);

  return (
    <UMaineModeContext.Provider value={contextValue}>
      <div className={`App ${isUMaineMode ? 'umaine-theme' : 'global-theme'}`}>
        <Navigation />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </UMaineModeContext.Provider>
  );
};

export default AppLayout;
