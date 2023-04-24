function SignInAndUp({ isSignInUpModal, setIsSignInUpModal, isSignInElemActive, setIsSignInElemActive }) {
  return (
    <>
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
                className={`font-semibold w-[88px] h-10 border border-rose-800 bg-rose-800 ease-out duration-200 hover:bg-rose-800 hover:text-white ${
                  !isSignInElemActive ? 'bg-transparent text-rose-800' : 'text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignInElemActive(false)}
                className={`font-semibold w-[88px] h-10 border border-rose-800 bg-rose-800 ease-out duration-200 hover:bg-rose-800 hover:text-white ${
                  isSignInElemActive ? 'bg-transparent text-rose-800' : 'text-white'
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
                      <button
                        className={
                          'font-semibold rounded mt-3 mb-6 bg-rose-800 text-white h-10 w-full hover:bg-rose-700 ease-out duration-200'
                        }
                      >
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
                        <div className={'flex items-center gap-2 mt-3'}>
                          <label htmlFor={'venue-manager'} className={'font-semibold select-none'}>
                            I am a Venue manager
                          </label>
                          <input id={'venue-manager'} type={'checkbox'} />
                        </div>
                        <button
                          className={
                            'font-semibold rounded mt-3 mb-6 bg-rose-800 text-white h-10 w-full hover:bg-rose-700 ease-out duration-200'
                          }
                        >
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
    </>
  );
}

export default SignInAndUp;
