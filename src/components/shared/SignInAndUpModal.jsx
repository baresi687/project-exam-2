import SignUp from './SignUp.jsx';
import SignIn from './SignIn.jsx';
import { useContext, useRef } from 'react';
import { SignInUpModalContext } from '../../context/SignInUpModalContext.jsx';

function SignInAndUpModal() {
  const [isSignInUpModal, setIsSignInUpModal, isSignInElemActive, setIsSignInElemActive] =
    useContext(SignInUpModalContext);
  const formErrorRef = useRef(null);

  return (
    <>
      <div
        id={'sign-in-up-modal'}
        className={`ease-in duration-100 fixed z-40 inset-0 bg-neutral-900/70 overflow-auto modal-scrollbar-remove ${
          isSignInUpModal ? '' : 'invisible opacity-0'
        }`}
      >
        <div id={'modal-content'} className={'bg-white my-28 max-w-xl mx-auto rounded-xl sm:my-36'}>
          <div className={'px-6 pb-6'}>
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
                <SignIn closeModalOnSignIn={setIsSignInUpModal} formErrorRef={formErrorRef} />
              ) : (
                <SignUp signUpSuccess={setIsSignInElemActive} formErrorRef={formErrorRef} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInAndUpModal;
