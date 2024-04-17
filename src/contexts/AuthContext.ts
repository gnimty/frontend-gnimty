import constate from 'constate';
import { useState } from 'react';

export const [AuthContextProvider, useAuthContext] = constate(() => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return { isAuthenticated, setIsAuthenticated };
});
