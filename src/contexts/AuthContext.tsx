import React from 'react';

export const AuthContext = React.createContext({
  authorized: false,
  setAuthorized: (_authorized: boolean) => undefined as void,
});
