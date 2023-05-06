import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApi } from '../../hooks/useApi.js';
import { GET_VENUES as CREATE_VENUE } from '../../settings/api.js';
import { useEffect, useRef, useState } from 'react';
import { scrollToMessage } from '../../utils/validation.js';
import { useNavigate } from 'react-router-dom';
import { getFromStorage } from '../../utils/storage.js';

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Venue name is a required field')
    .max(90, 'Venue name can not exceed 90 characters'),

  description: yup
    .string()
    .trim()
    .required('Description is a required field')
    .max(450, 'Description can not exceed 450 characters'),

  price: yup
    .number()
    .typeError('Price must be a number')
    .min(1, 'Price must be at least 1')
    .max(50000, 'Price can not exceed 50.000 kr NOK'),

  maxGuests: yup
    .number()
    .typeError('Max guests must be a number')
    .min(1, 'Max guests must be at least 1')
    .max(200, 'Max guests can not exceed 200'),

  media: yup
    .string()
    .trim()
    .required('Image URL is a required field')
    .matches(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/, 'Image URL is not valid'),
});

function CreateVenue() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { venueManager, accessToken } = getFromStorage('user');
  const { data, created, isLoading, isError, errorMsg, fetchData } = useApi();
  const [isFormError, setIsFormError] = useState(false);
  const formErrorRef = useRef(null);
  const navigate = useNavigate();

  function onSubmit(data) {
    data.media = [data.media];
    fetchData(CREATE_VENUE, 'POST', accessToken, data);
  }

  useEffect(() => {
    if (!accessToken || !venueManager) {
      navigate('/', { replace: true });
    }
  }, [accessToken, navigate, venueManager]);

  useEffect(() => {
    if (created) {
      navigate(`/venues/venue-details/${data.id}`);
    }
  }, [created, data, navigate]);

  useEffect(() => {
    if (isError) {
      setIsFormError(true);
      scrollToMessage(formErrorRef);
    }
  }, [isError]);

  return (
    <>
      <main className={'mt-[120px] min-h-[50vh] sm:mt-12'}>
        <section id={'profile'} className={'mt-[88px] mb-12 sm:mt-12 md:mb-28'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <form
              onBlur={() => setIsFormError(false)}
              onSubmit={handleSubmit(onSubmit)}
              className={
                'rounded-xl px-6 pt-10 pb-8 border border-gray-100 shadow-sm shadow-gray-100 md:max-w-[568px] md:my-0 md:mx-auto'
              }
            >
              <h1 className={'text-4xl font-bold text-center mb-10'}>Create Venue</h1>
              <div className={'flex flex-col gap-4'}>
                <label className={'w-full'}>
                  <input
                    {...register('name')}
                    className={`border-gray-200 border rounded h-10 indent-4 w-full ${errors.name && 'border-red-700'}`}
                    type={'text'}
                    placeholder={'Name of venue'}
                  />
                </label>
                {errors.name && <p className={'text-red-700'}>{errors.name?.message}</p>}
                <label className={'w-full'}>
                  <textarea
                    {...register('description')}
                    className={`border-gray-200 border rounded h-40 indent-4 pt-2 w-full ${
                      errors.description && 'border-red-700'
                    }`}
                    placeholder={'Description'}
                  />
                </label>
                {errors.description && <p className={'text-red-700'}>{errors.description?.message}</p>}
                <label className={'w-full'}>
                  <input
                    {...register('price')}
                    className={`border-gray-200 border rounded h-10 indent-4 w-full ${
                      errors.price && 'border-red-700'
                    }`}
                    type={'number'}
                    placeholder={'Price'}
                  />
                </label>
                {errors.price && <p className={'text-red-700'}>{errors.price?.message}</p>}
                <label className={'w-full'}>
                  <input
                    {...register('maxGuests')}
                    className={`border-gray-200 border rounded h-10 indent-4 w-full ${
                      errors.maxGuests && 'border-red-700'
                    }`}
                    type={'number'}
                    placeholder={'Max guests'}
                  />
                </label>
                {errors.maxGuests && <p className={'text-red-700'}>{errors.maxGuests?.message}</p>}
                <label className={'w-full'}>
                  <input
                    {...register('media')}
                    className={`border-gray-200 border rounded h-10 indent-4 w-full ${
                      errors.media && 'border-red-700'
                    }`}
                    type={'text'}
                    placeholder={'Image URL'}
                  />
                </label>
                {errors.media && <p className={'text-red-700'}>{errors.media?.message}</p>}
                <div id={'meta-checkboxes'} className={'text-sm flex gap-4 my-4 mx-auto md:ml-4'}>
                  <div className={'flex items-center gap-1.5'}>
                    <label htmlFor={'wifi'} className={'font-semibold select-none'}>
                      Wifi
                    </label>
                    <input {...register('meta.wifi')} name={'meta.wifi'} id={'wifi'} type={'checkbox'} />
                  </div>
                  <div className={'flex items-center gap-1.5'}>
                    <label htmlFor={'parking'} className={'font-semibold select-none'}>
                      Parking
                    </label>
                    <input {...register('meta.parking')} name={'meta.parking'} id={'parking'} type={'checkbox'} />
                  </div>
                  <div className={'flex items-center gap-1.5'}>
                    <label htmlFor={'breakfast'} className={'font-semibold select-none'}>
                      Breakfast
                    </label>
                    <input {...register('meta.breakfast')} name={'meta.breakfast'} id={'breakfast'} type={'checkbox'} />
                  </div>
                  <div className={'flex items-center gap-1.5'}>
                    <label htmlFor={'pets'} className={'font-semibold select-none'}>
                      Pets
                    </label>
                    <input {...register('meta.pets')} name={'meta.pets'} id={'pets'} type={'checkbox'} />
                  </div>
                </div>
                <button
                  type={'submit'}
                  className={
                    'relative font-semibold rounded bg-rose-800 text-white h-10 w-full hover:bg-rose-700 ease-out duration-200'
                  }
                >
                  {isLoading && <span className={'loader absolute top-2 left-6 h-6 w-6'}></span>}
                  {isLoading ? 'Processing..' : 'Create Venue'}
                </button>
              </div>
              <div ref={formErrorRef}>{isFormError && <div className={'api-error mt-6'}>{errorMsg}</div>}</div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default CreateVenue;
