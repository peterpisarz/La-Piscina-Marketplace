import React from 'react';
import { createContext } from 'react';

// Create a Context for the account
const AccountContext = createContext({
  isError: false,
  setIsError: () => {},
  message: null,
  setMessage: () => {},
});

export default AccountContext;
 