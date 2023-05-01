import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi.js';
import { SIGN_IN } from '../../settings/api.js';

const schema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Email must be in valid format')
    .required('Email is a required field')
    .max(50, 'Email can not exceed 50 characters')
    .matches(/^[\w\-.]+@stud.noroff.no$/, 'Email must be a @stud.noroff address'),
  password: yup
    .string()
    .trim()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
});

function SignIn({ closeModalonSignIn }) {
  const [isFormError, setIsFormError] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { data: response, isLoading, isError, errorMsg, fetchData } = useApi();

  const useSubmit = (data) => {
    fetchData(SIGN_IN, 'POST', null, data);
  };

  useEffect(() => {
    if (isError) {
      setIsFormError(true);
    }
  }, [isError]);

  useEffect(() => {
    if (response.name) {
      console.log(response);
      closeModalonSignIn(false);
    }
  }, [closeModalonSignIn, response]);

  return (
    <>
      <h3 className={'text-2xl font-bold my-2'}>Sign In</h3>
      <p>Sign In to place bookings. Or create venues if you are a manager</p>
      <div className={'mt-12'}>
        <form onBlur={() => setIsFormError(false)} onSubmit={handleSubmit(useSubmit)} className={'flex flex-col gap-4'}>
          <label className={'w-full'}>
            <input
              {...register('email')}
              className={`border-gray-200 border rounded h-10 indent-4 w-full ${errors.email && 'border-red-700'}`}
              type={'email'}
              placeholder={'Email address'}
            />
          </label>
          {errors.email && <p className={'text-red-700'}>{errors.email?.message}</p>}
          <label className={'w-full'}>
            <input
              {...register('password')}
              className={`border-gray-200 border rounded h-10 indent-4 w-full ${errors.password && 'border-red-700'}`}
              type={'password'}
              placeholder={'Password'}
            />
          </label>
          {errors.password && <p className={'text-red-700'}>{errors.password?.message}</p>}
          <button
            className={
              'relative font-semibold rounded mt-3 bg-rose-800 text-white h-10 w-full hover:bg-rose-700 ease-out duration-200'
            }
          >
            {isLoading && <span className={'loader absolute top-2 left-6 h-6 w-6'}></span>}
            {isLoading ? 'Processing..' : 'Sign In'}
          </button>
        </form>
        {isFormError && <div className={'api-error mt-6'}>{errorMsg}</div>}
      </div>
    </>
  );
}

export default SignIn;
