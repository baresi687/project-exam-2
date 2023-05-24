import { useEffect, useRef, useState } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';

function CreateAndEditVenueForm({
  form,
  title,
  btnTitle,
  locationString,
  setLocationString,
  mediaArray,
  mediaURL,
  setMediaURL,
  onSubmit,
  isLoading,
  isFormError,
  setIsFormError,
  errorMsg,
  submitButtonRef,
  formErrorRef,
  borderAndShadow,
}) {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = form;
  const { fields, append, remove } = mediaArray;
  const [location, setLocation] = useState(null);
  const [imgURLLoading, setImgURLLoading] = useState(false);
  const [isImgURLValid, setIsImgURLValid] = useState(true);
  const mediaInputRef = useRef(null);

  function handleRetrieve(e) {
    const locationObject = {
      address: e.features[0].properties.address_line1,
      city: e.features[0].properties.place,
      zip: e.features[0].properties.postcode,
      country: e.features[0].properties.country,
      lat: e.features[0].geometry.coordinates[1],
      lng: e.features[0].geometry.coordinates[0],
    };
    setLocation({ ...locationObject });
    setLocationString(e.features[0].properties.place_name);
  }

  function handleLocationString(e) {
    setLocationString(e.target.value);
    setLocation({});
    clearErrors('location');
  }

  async function validateImgURL(url) {
    try {
      setImgURLLoading(true);
      const res = await fetch(url.trim(), { method: 'HEAD' });
      const buff = await res.blob();

      return buff.type;
    } finally {
      setImgURLLoading(false);
    }
  }

  function handleImgURL(e) {
    setIsImgURLValid(true);
    clearErrors('media');

    if (mediaURL.trim() && fields.length < 5 && (e.key === 'Enter' || e.currentTarget.id === 'media-btn')) {
      e.preventDefault();

      validateImgURL(mediaURL)
        .then((res) => {
          if (res === 'image/jpeg') {
            append(mediaURL.trim());
            setMediaURL('');
          } else {
            setIsImgURLValid(false);
          }
        })
        .catch(() => setIsImgURLValid(false));
    } else if (!mediaURL.trim() && (e.key === 'Enter' || e.currentTarget.id === 'media-btn')) {
      e.preventDefault();
      setIsImgURLValid(false);
    }
  }

  function handleFormOnBlur() {
    setIsFormError(false);
    setIsImgURLValid(true);
    clearErrors('location');
  }

  useEffect(() => {
    if (location) {
      setValue('location', location);
    }
  }, [location, setValue]);

  useEffect(() => {
    if (!isImgURLValid) {
      mediaInputRef.current.focus();
    }
  }, [mediaInputRef, isImgURLValid]);

  return (
    <form
      onBlur={handleFormOnBlur}
      onSubmit={handleSubmit(onSubmit)}
      className={`rounded-xl px-6 pt-10 pb-6 ${
        borderAndShadow && 'border shadow-sm'
      } border-neutral-200 shadow-neutral-100 md:max-w-[568px] md:my-0 md:mx-auto`}
    >
      <h1 className={'text-4xl font-bold text-center mb-10'}>{title}</h1>
      <div className={'flex flex-col gap-4'}>
        <div className={'w-full relative'}>
          <input
            {...register('name')}
            id={'name'}
            className={`font-medium peer placeholder-transparent border-gray-200 border rounded h-10 indent-4 w-full`}
            type={'text'}
            placeholder={'Name of venue'}
          />
          <label
            htmlFor={'name'}
            className={`${
              errors.name && 'text-red-700'
            } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs text-zinc-500 px-2 bg-white`}
          >
            Name of venue
          </label>
          {errors.name && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>{errors.name?.message}</p>}
        </div>
        <div className={'w-full relative'}>
          <textarea
            {...register('description')}
            id={'description'}
            className={`create-edit-description font-medium peer placeholder-transparent rounded h-40 px-4 pb-4 w-full`}
            placeholder={'Description'}
          />
          <label
            htmlFor={'description'}
            className={`${
              errors.description && 'text-red-700'
            } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs text-zinc-500 px-2 bg-white`}
          >
            Description
          </label>
          {errors.description && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>{errors.description?.message}</p>}
        </div>
        <div className={'w-full relative'}>
          <AddressAutofill onRetrieve={handleRetrieve} accessToken={import.meta.env.VITE_ACCESS_TOKEN}>
            <input
              value={locationString}
              onChange={handleLocationString}
              id={'address'}
              type={'text'}
              className={`font-medium peer placeholder-transparent border-gray-200 border rounded h-10 indent-4 w-full`}
              placeholder={'Address'}
              autoComplete="shipping sex"
            />
            <input type={'hidden'} {...register('location', { value: location ? location : {} })} />
            <label
              htmlFor={'address'}
              className={`${
                errors.location && 'text-red-700'
              } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs text-zinc-500 px-2 bg-white`}
            >
              Address <span className={'text-xs'}>( Type in and select from menu )</span>
            </label>
            {errors.location && (
              <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>Please type in your address and select from menu</p>
            )}
          </AddressAutofill>
        </div>
        <div className={'w-full relative'}>
          <input
            {...register('price')}
            id={'price'}
            className={`font-medium peer placeholder-transparent border-gray-200 border rounded h-10 indent-4 w-full`}
            type={'number'}
            placeholder={'Price'}
          />
          <label
            htmlFor={'price'}
            className={`${
              errors.price && 'text-red-700'
            } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs text-zinc-500 px-2 bg-white`}
          >
            Price
          </label>
          {errors.price && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>{errors.price?.message}</p>}
        </div>
        <div className={'w-full relative'}>
          <input
            {...register('maxGuests')}
            id={'maxGuests'}
            className={`font-medium peer placeholder-transparent border-gray-200 border rounded h-10 indent-4 w-full`}
            type={'number'}
            placeholder={'Max guests'}
          />
          <label
            htmlFor={'maxGuests'}
            className={`${
              errors.maxGuests && 'text-red-700'
            } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs text-zinc-500 px-2 bg-white`}
          >
            Max guests
          </label>
          {errors.maxGuests && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>{errors.maxGuests?.message}</p>}
        </div>
        <div className={'w-full relative'}>
          <div className={'flex gap-2'}>
            <input
              ref={mediaInputRef}
              aria-label={'Add Image URL'}
              value={mediaURL}
              onChange={(e) => setMediaURL(e.target.value)}
              onKeyDown={handleImgURL}
              id={'media'}
              className={`font-medium peer placeholder-transparent border-gray-200 border rounded h-10 indent-4 w-full`}
              type={'text'}
              placeholder={'Image URL'}
              disabled={imgURLLoading || fields.length === 5}
            />
            <button
              aria-label={'Add Image URL'}
              onClick={handleImgURL}
              type={'button'}
              id={'media-btn'}
              className={`relative rounded bg-rose-800 text-white h-10 w-24 hover:bg-rose-700 ease-out duration-200 ${
                !imgURLLoading && 'disabled:bg-gray-200'
              } `}
              disabled={imgURLLoading || fields.length === 5}
            >
              {imgURLLoading ? (
                <span className={'loader absolute top-2.5 left-7 h-5 w-5 border-2 border-t-transparent'}></span>
              ) : (
                'Add'
              )}
            </button>
            <label
              htmlFor={'media'}
              className={`${
                errors.media && 'text-red-700'
              } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs text-zinc-500 px-2 bg-white`}
            >
              {fields.length === 5 ? 'Max 5 images' : 'Image URL'}
            </label>
          </div>
          {errors.media && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>{errors.media?.message}</p>}
          {!isImgURLValid && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>Image URL is not valid or empty</p>}
          {fields.length > 0 ? (
            <div className={'mt-4 px-4'}>
              <h2 className={`text-sm font-semibold`}>
                Added images {fields.length === 5 && <span className={`text-xs italic`}>( max 5 )</span>}
              </h2>
              <div className={'mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5'}>
                {fields.map((item, i) => {
                  return (
                    <button
                      aria-label={'Added image. Click to remove'}
                      className={
                        'group relative flex items-center justify-center h-20 sm:h-20 w-full rounded overflow-hidden'
                      }
                      type={'button'}
                      onClick={() => remove(i)}
                      key={item.id}
                      {...register(`media.${i}`)}
                    >
                      <img
                        className={'object-cover absolute top-0 w-full h-full z-0 pointer-events-none'}
                        src={getValues(`media.${i}`)}
                        alt={'Image to add'}
                      />
                      <span
                        className={
                          'ease-out duration-200 z-10 pointer-events-none rounded-full p-1 bg-gray-500/50 group-hover:bg-amber-500 group-hover:p-2'
                        }
                      >
                        <svg
                          className={'fill-white group-hover:fill-gray-900'}
                          width="8"
                          height="8"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
                            fill="#none"
                          />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <h2 className={`mt-4 px-4 text-sm font-light italic`}>Added images will be displayed here</h2>
          )}
        </div>
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
          ref={submitButtonRef}
          type={'submit'}
          className={
            'relative rounded bg-rose-800 text-white h-10 w-full hover:bg-rose-700 disabled:hover:cursor-none ease-out duration-200'
          }
          disabled={isLoading}
        >
          {isLoading && (
            <span className={'loader absolute top-2.5 left-4 h-5 w-5 border-2 border-t-transparent'}></span>
          )}
          {isLoading ? 'Processing..' : `${btnTitle}`}
        </button>
      </div>
      <div ref={formErrorRef}>{isFormError && <div className={'api-error mt-6 break-words'}>{errorMsg}</div>}</div>
    </form>
  );
}

export default CreateAndEditVenueForm;
