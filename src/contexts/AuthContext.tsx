import React from 'react';

export const AuthContext = React.createContext({
  authorized: false,
  login: (_email: string, _password: string) => false as boolean,
});
