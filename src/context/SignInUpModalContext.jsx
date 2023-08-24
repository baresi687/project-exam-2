import { createContext, useState } from 'react';

export const SignInUpModalContext = createContext([]);

function SignInUpModalProvider({ children }) {
  const [isSignInUpModal, setIsSignInUpModal] = useState(false);
  const [isSignInElemActive, setIsSignInElemActive] = useState(true);

  return (
    <SignInUpModalContext.Provider
      value={[isSignInUpModal, setIsSignInUpModal, isSignInElemActive, setIsSignInElemActive]}
    >
      {children}
    </SignInUpModalContext.Provider>
  );
}

export default SignInUpModalProvider;
