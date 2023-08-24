import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/profile.svg';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getFromStorage } from '../../utils/storage.js';
import { useApi } from '../../hooks/useApi.js';
import { PROFILES } from '../../settings/api.js';
import { scrollToMessage } from '../../utils/validation.js';
import ProfileCustomer from '../ProfileCustomer.jsx';
import ProfileVenueManager from '../ProfileVenueManager.jsx';

const schema = yup.object({
  avatar: yup
    .string()
    .trim()
    .required('This is a required field')
    .matches(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/, 'Image URL is not valid'),
});

function Profile() {
  const [, setAuth] = useContext(AuthContext);
  const { name, avatar, venueManager, accessToken } = getFromStorage('user');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { data, isLoading, errorMsg, isError, fetchData } = useApi();
  const [isFormError, setIsFormError] = useState(false);
  const avatarErrorRef = useRef(null);
  const avatarSubmitButtonRef = useRef(null);

  function onAvatarSubmit(data) {
    fetchData(`${PROFILES}/${name}/media`, 'PUT', accessToken, data);
    reset();
  }

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setAuth(JSON.parse(localStorage.getItem('user')));
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate, setAuth]);

  useEffect(() => {
    if (isError) {
      avatarSubmitButtonRef.current.focus();
      setIsFormError(true);
      scrollToMessage(avatarErrorRef);
    }
  }, [isError]);

  useEffect(() => {
    if (data.avatar) {
      const updatedUser = data;

      updatedUser.accessToken = accessToken;
      setAuth(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [accessToken, data, data.avatar, setAuth]);

  return (
    <>
      <main className={'mt-[120px] min-h-[50vh] sm:mt-12'}>
        <section id={'profile'} className={'mt-[88px] mb-12 sm:mt-12'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <h1 className={'text-4xl font-bold mb-10'}>Profile</h1>
            <div id={'profile-container'} className={'flex flex-col gap-14 sm:flex-row sm:gap-8'}>
              <div id={'avatar-container'} className={'sm:w-[18rem] shrink-0'}>
                <h2 className={'text-xl font-bold mb-6'}>Avatar</h2>
                <div className={'rounded-xl px-6 pt-12 pb-6 border border-neutral-200 shadow-sm shadow-neutral-100'}>
                  <img
                    className={'h-32 w-32 object-cover rounded-full my-0 mx-auto'}
                    src={avatar ? avatar : profileImg}
                    alt={'Profile avatar'}
                  />
                  <h3 className={'text-center text-xl font-semibold mt-8 overflow-hidden'}>{name}</h3>
                  <h4 className={'text-center text-xl font-light italic mt-4'}>
                    {venueManager ? 'Venue Manager' : 'Customer'}
                  </h4>
                  <div id={'avatar-update'} className={'mt-12'}>
                    <form onSubmit={handleSubmit(onAvatarSubmit)} onBlur={() => setIsFormError(false)}>
                      <label className={'block font-semibold mb-4'} htmlFor={'avatar'}>
                        Update avatar
                      </label>
                      <input
                        {...register('avatar')}
                        id={'avatar'}
                        className={`border-gray-200 border rounded h-10 indent-4 w-full font-medium placeholder:text-zinc-500 placeholder:font-normal ${
                          errors.avatar && 'border-red-700'
                        }`}
                        type={'text'}
                        placeholder={'Avatar URL'}
                      />
                      {errors.avatar && <p className={'text-red-700 mt-4'}>{errors.avatar?.message}</p>}
                      <button
                        ref={avatarSubmitButtonRef}
                        type={'submit'}
                        className={
                          'relative rounded mt-4 bg-rose-800 text-white h-10 w-full hover:bg-rose-700 disabled:hover:cursor-none ease-out duration-200'
                        }
                        disabled={isLoading}
                      >
                        {isLoading && (
                          <span
                            className={'loader absolute top-2.5 left-4 h-5 w-5 border-2 border-t-transparent'}
                          ></span>
                        )}
                        {isLoading ? 'Processing..' : 'Update avatar'}
                      </button>
                      <div ref={avatarErrorRef}>
                        {isFormError && <div className={'api-error mt-6 break-words'}>{errorMsg}</div>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div id={'customer-manager'} className={'sm:grow'}>
                {venueManager ? (
                  <ProfileVenueManager />
                ) : (
                  <div>
                    <h2 className={'text-xl font-bold mb-6'}>Upcoming bookings</h2>
                    <ProfileCustomer />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Profile;
