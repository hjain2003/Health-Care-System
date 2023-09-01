import { createContext, useContext, useState } from 'react';

const EditContext = createContext();

export const EditContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const contextValues = {
    userData,
    setUserData,
  };

  return (
    <EditContext.Provider value={contextValues}>
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);