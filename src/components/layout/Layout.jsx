import Header from '../shared/Header.jsx';
import Footer from '../shared/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';
import SignInAndUpModal from '../shared/SignInAndUpModal.jsx';

export const SignInUpModal = createContext([]);
export const VenuePageContext = createContext([]);

function Layout() {
  const [isSignInUpModal, setIsSignInUpModal] = useState(false);
  const [isSignInElemActive, setIsSignInElemActive] = useState(true);
  const [sort, setSort] = useState(true);
  const [sortOrder, setSortOrder] = useState(true);

  return (
    <>
      <SignInUpModal.Provider value={[isSignInUpModal, setIsSignInUpModal, isSignInElemActive, setIsSignInElemActive]}>
        <Header />
        <SignInAndUpModal
          isSignInUpModal={isSignInUpModal}
          setIsSignInUpModal={setIsSignInUpModal}
          isSignInElemActive={isSignInElemActive}
          setIsSignInElemActive={setIsSignInElemActive}
        />
        <VenuePageContext.Provider value={[sort, setSort, sortOrder, setSortOrder]}>
          <Outlet />
        </VenuePageContext.Provider>
        <Footer />
      </SignInUpModal.Provider>
    </>
  );
}

export default Layout;
