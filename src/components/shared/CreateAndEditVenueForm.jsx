import { useState } from 'react';

function CreateAndEditVenueForm({
  form,
  title,
  btnTitle,
  mediaArray,
  onSubmit,
  isLoading,
  isFormError,
  setIsFormError,
  errorMsg,
  formErrorRef,
  borderAndShadow,
}) {
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    formState: { errors },
  } = form;
  const { fields, append, remove } = mediaArray;
  const [mediaURL, setMediaURL] = useState('');
  const [isImgURLValid, setIsImgURLValid] = useState(true);

  async function validateImgURL(url) {
    const res = await fetch(url, { method: 'HEAD' });
    const buff = await res.blob();
    return buff.type;
  }

  function handleImgURL(e) {
    setIsImgURLValid(true);
    clearErrors('media');

    switch (e.currentTarget.id) {
      case 'media':
        if (e.key === 'Enter') {
          e.preventDefault();
          if (e.currentTarget.value) {
            validateImgURL(e.currentTarget.value)
              .then((res) => {
                if (res === 'image/jpeg') {
                  append(mediaURL);
                  setMediaURL('');
                } else {
                  setIsImgURLValid(false);
                }
              })
              .catch(() => setIsImgURLValid(false));
          }
        }
        break;
      case 'media-btn':
        if (mediaURL) {
          validateImgURL(mediaURL)
            .then((res) => {
              if (res === 'image/jpeg') {
                append(mediaURL);
                setMediaURL('');
              } else {
                setIsImgURLValid(false);
              }
            })
            .catch(() => setIsImgURLValid(false));
        } else if (mediaURL || !mediaURL) {
          setIsImgURLValid(false);
        }
    }
  }

  return (
    <form
      onBlur={() => setIsFormError(false)}
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
            } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs font-medium text-gray-400 px-2 bg-white`}
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
            } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs font-medium text-gray-400 px-2 bg-white`}
          >
            Description
          </label>
          {errors.description && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>{errors.description?.message}</p>}
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
            } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs font-medium text-gray-400 px-2 bg-white`}
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
            } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs font-medium text-gray-400 px-2 bg-white`}
          >
            Max guests
          </label>
          {errors.maxGuests && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>{errors.maxGuests?.message}</p>}
        </div>
        <div className={'w-full relative'}>
          <div className={'flex gap-2'}>
            <input
              aria-label={'Add Image URL'}
              value={mediaURL}
              onChange={(e) => setMediaURL(e.target.value)}
              onKeyDown={handleImgURL}
              id={'media'}
              className={`font-medium peer placeholder-transparent border-gray-200 border rounded h-10 indent-4 w-full`}
              type={'text'}
              placeholder={'Image URL'}
            />
            <button
              aria-label={'Add Image URL'}
              onClick={handleImgURL}
              type={'button'}
              id={'media-btn'}
              className={'rounded bg-rose-800 text-white h-10 w-24  hover:bg-rose-700 ease-out duration-200'}
            >
              Add
            </button>
            <label
              htmlFor={'media'}
              className={`${
                errors.media && 'text-red-700'
              } absolute transition-all duration-100 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs -top-2 left-2 text-xs font-medium text-gray-400 px-2 bg-white`}
            >
              Image URL
            </label>
          </div>
          {errors.media && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>{errors.media?.message}</p>}
          {!isImgURLValid && <p className={'text-red-700 ml-4 mt-2 mb-3 text-sm'}>Image URL is not valid or empty</p>}
          {fields.length > 0 && (
            <div className={'grid grid-cols-5 gap-2 mt-6'}>
              {fields.map((item, i) => {
                return (
                  <button type={'button'} onClick={() => remove(i)} key={i} {...register(`media.${i}`)}>
                    <img
                      className={'h-20 w-full rounded object-cover'}
                      src={getValues(`media.${i}`)}
                      alt={'Image to add'}
                    />
                  </button>
                );
              })}
            </div>
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
          type={'submit'}
          className={'relative rounded bg-rose-800 text-white h-10 w-full hover:bg-rose-700 ease-out duration-200'}
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
