import React from 'react';

export const AuthContext = React.createContext({
  authorized: false,
  login: (_email: string, _password: string) => Promise.resolve(),
  register: (
    _name: string,
    _surname: string,
    _email: string,
    _password: string
  ) => Promise.resolve(),
});
