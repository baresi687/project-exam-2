import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';

function Header() {
  return (
    <>
      <header className={'sm:border-b-2 sm:border-b-neutral-50'}>
        <div className={''}>
          <div id={'logo-nav'}>
            <div className={'container mx-auto fixed bottom-0 bg-white sm:static sm:max-w-7xl sm:px-4'}>
              <div
                className={'flex items-center justify-center gap-6 h-[72px] border-t-2 border-t-neutral-50 sm:gap-8'}
              >
                <Link to={'/'} className={'sm:shrink-0'}>
                  <img className={'w-[96px] sm:w-[128px]'} src={logo} alt={'Holidaze logo'} />
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
                <button className={'bg-rose-700 text-white rounded h-10 w-[88px] sm:shrink-0'}>Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
