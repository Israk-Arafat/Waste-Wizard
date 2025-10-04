import { createContext, useContext } from 'react';

const UMaineModeContext = createContext({
  isUMaineMode: false,
  toggleUMaineMode: () => {},
  setIsUMaineMode: () => {}
});

export const useUMaineMode = () => useContext(UMaineModeContext);

export default UMaineModeContext;
