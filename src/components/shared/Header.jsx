import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import profileSmall from '../../assets/profile-small.svg';
import { useEffect, useRef, useState } from 'react';
import SignInAndUp from './SignInAndUp.jsx';

function Header() {
  const isSignedIn = false;
  const isManager = false;

  const [isSignInUpModal, setIsSignInUpModal] = useState(false);
  const [isSignInElemActive, setIsSignInElemActive] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { pathname } = useLocation();

  function handleProfileMenu() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  function handleProfileMenuClickOutside(e) {
    if (!profileMenuRef.current.contains(e.target) && isProfileMenuOpen) {
      setIsProfileMenuOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleProfileMenuClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleProfileMenuClickOutside);
    };
  });

  useEffect(() => {
    setIsProfileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={'sm:border-b-2 sm:border-b-neutral-50'}>
        <div id={'header'}>
          <div className={'container mx-auto fixed bottom-0 bg-white sm:static sm:max-w-7xl sm:px-4'}>
            <div className={'flex items-center justify-center gap-6 h-[72px] border-t-2 border-t-neutral-50 sm:gap-8'}>
              <Link to={'/'} className={'sm:shrink-0'}>
                <img className={'w-[96px] pointer-events-none sm:w-[128px]'} src={logo} alt={'Holidaze home'} />
              </Link>
              <nav>
                <NavLink
                  className={
                    'text-rose-800 font-semibold text-sm ease-out duration-200 hover:text-rose-700 sm:text-base'
                  }
                  to={'/venues'}
                >
                  Venues
                </NavLink>
              </nav>
              <div
                id={'search'}
                className={
                  'w-full fixed top-0 bg-white border-b-2 border-b-neutral-50 h-[72px] flex items-center sm:static sm:max-w-[600px] mx-auto sm:border-0'
                }
              >
                <div className={'container mx-auto px-4'}>
                  <div className={'flex gap-2 max-w-[600px]'}>
                    <label className={'w-full'}>
                      <input
                        className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                        type={'text'}
                        placeholder={'Search for venues'}
                      />
                    </label>
                    <button
                      className={
                        'border border-rose-800 text-rose-800 font-semibold py-1.5 px-3 rounded hover:bg-rose-800 hover:text-white ease-out duration-200'
                      }
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div ref={profileMenuRef} id={'sign-in-up-profile'} className={'w-[88px] sm:shrink-0 sm:w-auto'}>
                {isSignedIn ? (
                  <>
                    <div className={'flex items-center gap-2 relative'}>
                      <small className={'leading-none'}>Profile</small>
                      <button id={'profile-menu'} onClick={handleProfileMenu}>
                        <img className={'pointer-events-none'} src={profileSmall} alt={'Profile menu'} />
                      </button>
                      <div
                        id={'profile-nav'}
                        className={`${
                          isProfileMenuOpen ? 'block' : 'hidden'
                        } absolute bottom-10 w-32 right-0 pb-1 bg-gray-50 shadow shadow-slate-200 rounded sm:top-8 sm:h-fit`}
                      >
                        <div className={'pb-2 p-3 border-b-2 border-b-gray-100'}>
                          <strong className={'block'}>Steve453</strong>
                          <span className={'text-xs'}>{isManager ? 'Venue manager' : 'Customer'}</span>
                        </div>
                        <nav className={'flex flex-col mt-2 gap-2 text-sm'}>
                          <Link to={'/profile'} className={'px-3 py-1.5 hover:bg-rose-800 hover:text-white'}>
                            Profile
                          </Link>
                          {isManager && (
                            <Link to={'/create-venue'} className={'px-3 py-1.5 hover:bg-rose-800 hover:text-white'}>
                              Create Venue
                            </Link>
                          )}
                          <Link to={'/profile'} className={'px-3 py-1.5 hover:bg-rose-800 hover:text-white'}>
                            Sign Out
                          </Link>
                        </nav>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setIsSignInUpModal(true)}
                    id={'sign-in-up'}
                    className={
                      'bg-rose-800 text-white rounded h-10 w-full hover:bg-rose-700 ease-out duration-200 sm:w-[88px]'
                    }
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <SignInAndUp
        isSignInUpModal={isSignInUpModal}
        setIsSignInUpModal={setIsSignInUpModal}
        isSignInElemActive={isSignInElemActive}
        setIsSignInElemActive={setIsSignInElemActive}
      />
    </>
  );
}

export default Header;
