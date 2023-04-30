function SignUp() {
  return (
    <>
      <h3 className={'text-2xl font-bold my-2'}>Sign Up</h3>
      <p>Sign Up to place bookings. Or create venues if you are a manager</p>
      <div className={'mt-12'}>
        <form autoComplete="off" className={'flex flex-col gap-4'}>
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
  );
}

export default SignUp;
