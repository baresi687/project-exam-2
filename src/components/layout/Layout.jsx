import Header from '../shared/Header.jsx';
import Footer from '../shared/Footer.jsx';
import { Outlet } from 'react-router-dom';
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
