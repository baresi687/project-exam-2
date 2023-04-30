import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is a required field')
    .max(20, 'Name cannot be greater than 20 characters')
    .matches(/^\w+$/, 'Name must not contain punctuation symbols apart from underscore'),
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
  confirmPassword: yup
    .string()
    .trim()
    .required('Confirm password is a required field')
    .oneOf([yup.ref('password')], 'Password do not match'),
});

function SignUp() {
  const [isVenueManager, setIsVenueManager] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const body = data;
    delete body.confirmPassword;
    body.venueManager = isVenueManager;

    console.log(body);
  };

  function handleVenueManager() {
    setIsVenueManager(!isVenueManager);
  }

  return (
    <>
      <h3 className={'text-2xl font-bold my-2'}>Sign Up</h3>
      <p>Sign Up to place bookings. Or create venues if you are a manager</p>
      <div className={'mt-12'}>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className={'flex flex-col gap-4'}>
          <label className={'w-full'}>
            <input
              {...register('name')}
              className={`border-gray-200 border rounded h-10 indent-4 w-full ${errors.name && 'border-red-700'}`}
              type={'text'}
              placeholder={'Name'}
            />
          </label>
          {errors.name && <p className={'text-red-700'}>{errors.name?.message}</p>}
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
          <label className={'w-full'}>
            <input
              {...register('confirmPassword')}
              className={`border-gray-200 border rounded h-10 indent-4 w-full ${
                errors.confirmPassword && 'border-red-700'
              }`}
              type={'password'}
              placeholder={'Confirm password'}
            />
          </label>
          {errors.confirmPassword && <p className={'text-red-700'}>{errors.confirmPassword?.message}</p>}
          <div className={'flex items-center gap-2 mt-3'}>
            <label htmlFor={'venue-manager'} className={'font-semibold select-none'}>
              I am a Venue manager
            </label>
            <input id={'venue-manager'} type={'checkbox'} onChange={handleVenueManager} />
          </div>
          <button
            type={'submit'}
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
