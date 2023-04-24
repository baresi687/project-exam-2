import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import profileSmall from '../../assets/profile-small.svg';
import { useEffect, useRef, useState } from 'react';

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
                <NavLink className={'text-rose-800 font-semibold text-sm sm:text-base'} to={'/venues'}>
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
                    <button className={'border border-rose-700 text-rose-700 font-semibold py-1.5 px-3 rounded'}>
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
                        <img className={'pointer-events-none'} src={profileSmall} alt={'Profile icon'} />
                      </button>
                      <div
                        id={'profile-nav'}
                        className={`${
                          isProfileMenuOpen ? 'block' : 'hidden'
                        } absolute bottom-10 right-0 w-max p-3 bg-zinc-100 rounded text-sm sm:top-8 sm:h-fit`}
                      >
                        <strong className={'block pb-1.5 border-b-2 border-b-neutral-100'}>Steve453</strong>
                        <nav className={'flex flex-col gap-2'}>
                          <Link to={'/profile'}>Profile</Link>
                          {isManager && <Link to={'/create-venue'}>Create Venue</Link>}
                          <Link to={'/profile'}>Sign Out</Link>
                        </nav>
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setIsSignInUpModal(true)}
                    id={'sign-in-up'}
                    className={'bg-rose-700 text-white rounded h-10 w-full sm:w-[88px]'}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          id={'sign-in-up-modal'}
          className={`ease-in duration-100 fixed inset-0 bg-neutral-900/40 overflow-auto ${
            isSignInUpModal ? '' : 'invisible opacity-0'
          }`}
        >
          <div id={'modal-content'} className={'bg-white mt-24 max-w-xl mx-auto rounded-xl'}>
            <div className={'px-6'}>
              <header className={'h-[80px] flex items-center justify-center relative border-b-2 border-b-neutral-50'}>
                <h3 className={'font-bold'}>Sign In or Up</h3>
                <button
                  aria-label={'Close modal'}
                  className={'absolute right-0'}
                  onClick={() => setIsSignInUpModal(false)}
                >
                  <svg
                    className={'pointer-events-none'}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
                      fill="#111827"
                    />
                  </svg>
                </button>
              </header>
              <div className={'mt-8'}>
                <button
                  onClick={() => setIsSignInElemActive(true)}
                  className={`font-semibold w-[88px] h-10 border border-rose-700 bg-rose-700  ${
                    !isSignInElemActive ? 'bg-transparent text-rose-700' : 'text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignInElemActive(false)}
                  className={`font-semibold w-[88px] h-10 border border-rose-700 bg-rose-700  ${
                    isSignInElemActive ? 'bg-transparent text-rose-700' : 'text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>
              <div className={'mt-12'}>
                {isSignInElemActive ? (
                  <>
                    <h3 className={'text-2xl font-bold my-2'}>Sign In</h3>
                    <p>Sign In to place bookings. Or create venues if you are a manager</p>
                    <div className={'mt-12'}>
                      <form className={'flex flex-col gap-4'}>
                        <label className={'w-full'}>
                          <input
                            className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                            type={'email'}
                            placeholder={'Email address'}
                          />
                        </label>
                        <label className={'w-full'}>
                          <input
                            className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                            type={'password'}
                            placeholder={'Password'}
                          />
                        </label>
                        <button className={'font-semibold rounded mt-3 mb-6 bg-rose-700 text-white h-10 w-full'}>
                          Sign In
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <>
                    <>
                      <h3 className={'text-2xl font-bold my-2'}>Sign Up</h3>
                      <p>Sign Up to place bookings. Or create venues if you are a manager</p>
                      <div className={'mt-12'}>
                        <form className={'flex flex-col gap-4'}>
                          <label className={'w-full'}>
                            <input
                              className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                              type={'text'}
                              placeholder={'Name'}
                            />
                          </label>
                          <label className={'w-full'}>
                            <input
                              className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                              type={'email'}
                              placeholder={'Email address'}
                            />
                          </label>
                          <label className={'w-full'}>
                            <input
                              className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                              type={'password'}
                              placeholder={'Password'}
                            />
                          </label>
                          <label className={'w-full'}>
                            <input
                              className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                              type={'password'}
                              placeholder={'Password'}
                            />
                          </label>
                          <label className={'w-full'}>
                            <input
                              className={'border-gray-200 border rounded h-10 indent-4 w-full'}
                              type={'password'}
                              placeholder={'Confirm password'}
                            />
                          </label>
                          <div className={'flex items-center gap-2'}>
                            <p className={'font-semibold'}>I am a Venue manager</p>
                            <input type={'checkbox'} />
                          </div>
                          <button className={'font-semibold rounded mt-3 mb-6 bg-rose-700 text-white h-10 w-full'}>
                            Sign In
                          </button>
                        </form>
                      </div>
                    </>
                  </>
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
