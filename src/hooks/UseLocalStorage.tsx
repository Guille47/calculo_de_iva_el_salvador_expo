import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useReadFromLocalStorage = <T,>(key: T) => {
  const [storedValue, setStoredValue] = useState(null);
  const [error, setError] = useState(null);

  const fetchStorage = async () => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setStoredValue(JSON.parse(value));
      }
    } catch (err: unknown) {
      setError(err as any);
    }
  };

  return {storedValue, error, fetchStorage};
};

export const useSaveToLocalStorage = () => {
  const [error, setError] = useState(null);

  const saveToStorage = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err: unknown) {
      setError(err as any);
    }
  };

  return {saveToStorage, error};
};
