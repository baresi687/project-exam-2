import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import profileSmall from '../../assets/profile-small.svg';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import { SignInUpModal } from '../layout/Layout.jsx';

function Header() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const { pathname } = useLocation();
  const [isNotSignedIn, setIsNotSignedIn] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [, setIsSignInUpModal] = useContext(SignInUpModal);

  function handleSearch() {
    if (searchValue) {
      navigate(`/search/${searchValue}`);
    }
  }

  function handleSearchEnterPress(e) {
    if (e.key === 'Enter' && searchValue) {
      handleSearch();
    }
  }

  function handleProfileMenu() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  function handleProfileMenuClickOutside(e) {
    if (!profileMenuRef.current.contains(e.target) && isProfileMenuOpen) {
      setIsProfileMenuOpen(false);
    }
  }

  function handleSignOut() {
    setAuth(null);
    setIsNotSignedIn(true);
    localStorage.clear();
    navigate('/', { replace: true });
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleProfileMenuClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleProfileMenuClickOutside);
    };
  });

  useEffect(() => {
    setIsProfileMenuOpen(false);

    if (!pathname.includes('/search')) {
      setSearchValue('');
    }
  }, [pathname]);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setAuth(JSON.parse(localStorage.getItem('user')));
    } else {
      setIsNotSignedIn(true);
    }
  }, [setAuth]);

  return (
    <>
      <header className={'sm:border-b-2 sm:border-b-neutral-50'}>
        <div id={'header'}>
          <div className={'container mx-auto fixed z-10 bottom-0 bg-white sm:static sm:max-w-7xl sm:px-4'}>
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
                    <label className={'w-full relative'}>
                      <input
                        aria-label={'Search for venues'}
                        className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                        type={'text'}
                        placeholder={'Search for venues'}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyUp={handleSearchEnterPress}
                      />
                      <button
                        aria-label={'Clear search value'}
                        onClick={() => setSearchValue('')}
                        className={`${searchValue ? 'absolute' : 'hidden'} right-3 top-2`}
                      >
                        <svg
                          className={'pointer-events-none'}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                        >
                          <path
                            fill="#A9A9A9"
                            d="M24 12c0 6.628-5.372 12-12 12S0 18.628 0 12 5.372 0 12 0s12 5.372 12 12Z"
                            opacity=".5"
                          />
                          <path
                            fill="#fff"
                            d="M8.365 8.364a.9.9 0 0 1 1.272 0L12 10.728l2.364-2.364a.9.9 0 1 1 1.271 1.272L13.274 12l2.364 2.364a.9.9 0 0 1-1.273 1.272L12 13.272l-2.363 2.364a.9.9 0 0 1-1.272-1.272L10.729 12 8.364 9.636a.9.9 0 0 1 0-1.272Z"
                          />
                        </svg>
                      </button>
                    </label>
                    <button
                      onClick={handleSearch}
                      aria-label={'Submit search'}
                      className={
                        'border border-rose-800 text-rose-800 font-semibold py-1.5 px-3 rounded hover:bg-rose-800 hover:text-white ease-out duration-200'
                      }
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div ref={profileMenuRef} id={'sign-in-up-profile'} className={'w-[88px] sm:shrink-0'}>
                {auth && (
                  <>
                    <div className={'flex items-center gap-2 relative sm:justify-end'}>
                      <small className={'leading-none'}>Profile</small>
                      <button id={'profile-menu'} onClick={handleProfileMenu}>
                        <img className={'pointer-events-none'} src={profileSmall} alt={'Profile menu'} />
                      </button>
                      <div
                        id={'profile-nav'}
                        className={`${
                          isProfileMenuOpen ? 'block' : 'hidden'
                        } absolute bottom-10 min-w-[8rem] max-w-[11rem] right-0 /*pb-1*/ bg-gray-50 border border-gray-100 shadow-sm shadow-slate-200 rounded-md sm:top-8 sm:h-fit`}
                      >
                        <div className={'py-2.5 px-3 border-b-2 border-b-gray-100'}>
                          <p className={'text-sm font-light mb-1'}>
                            {auth.venueManager ? 'Venue manager' : 'Customer'}
                          </p>
                          <p className={'text-sm font-semibold break-words'}>{auth.name}</p>
                        </div>
                        <nav className={'flex flex-col mt-1.5 text-sm'}>
                          <Link to={'/profile'} className={'px-3 py-1.5 hover:bg-rose-800 hover:text-white'}>
                            Profile
                          </Link>
                          {auth.venueManager && (
                            <Link to={'/create-venue'} className={'px-3 py-1.5 hover:bg-rose-800 hover:text-white'}>
                              Create Venue
                            </Link>
                          )}
                          <button
                            onClick={handleSignOut}
                            className={
                              'text-left mt-1.5 px-3 py-2 border-t-2 border-gray-100 hover:bg-rose-800 hover:text-white'
                            }
                          >
                            Sign Out
                          </button>
                        </nav>
                      </div>
                    </div>
                  </>
                )}
                {isNotSignedIn && !auth && (
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
    </>
  );
}

export default Header;
