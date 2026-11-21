import { useContext } from 'react';
import { GrantsContext } from './GrantsContext';

export const useGrants = () => {
  const context = useContext(GrantsContext);
  if (!context) {
    throw new Error('useGrants must be used within a GrantsProvider');
  }
  return context;
};
