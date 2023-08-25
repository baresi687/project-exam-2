import Header from '../shared/Header.jsx';
import Footer from '../shared/Footer.jsx';
import { Outlet } from 'react-router-dom';
import SignInAndUpModal from '../shared/SignInAndUpModal.jsx';
import DataAndSettingsProvider from '../../context/DataAndSettingsContext.jsx';
import SignInUpModalProvider from '../../context/SignInUpModalContext.jsx';

function Layout() {
  return (
    <>
      <SignInUpModalProvider>
        <Header />
        <SignInAndUpModal />
        <DataAndSettingsProvider>
          <Outlet />
        </DataAndSettingsProvider>
        <Footer />
      </SignInUpModalProvider>
    </>
  );
}

export default Layout;
