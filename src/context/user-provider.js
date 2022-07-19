import React, { useCallback, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from './user-context';

const USER_PERSISTENCE_KEY = 'user';

const initialState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  pngmePermissionWasSelected: false,
};

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(initialState);

  const rehydrateUser = async () => {
    try {
      const user = await AsyncStorage.getItem(USER_PERSISTENCE_KEY);
      if (user) {
        setUserState(JSON.parse(user));
      }
    } catch (e) {
      console.error('error rehydrating user from storage');
    }
  };

  useEffect(() => {
    rehydrateUser();
  }, []);

  const setUser = (updatedUser) => {
    const userToSave = {
      ...user,
      ...updatedUser,
    };
    AsyncStorage.setItem(USER_PERSISTENCE_KEY, JSON.stringify(userToSave));
    setUserState(userToSave);
  };

  const clearUser = useCallback(() => {
    setUserState(null);
  }, []);

  const context = {
    user,
    setUser,
    clearUser,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};
