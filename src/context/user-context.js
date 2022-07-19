import React, { createContext, useContext } from 'react';

export const UserContext = createContext(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used inside UserProvider');
  }
  return context;
}
