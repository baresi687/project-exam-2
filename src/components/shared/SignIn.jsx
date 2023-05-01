function SignIn() {
  return (
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
  );
}

export default SignIn;
