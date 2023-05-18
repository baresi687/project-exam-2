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
    const res = await fetch(url.trim(), { method: 'HEAD' });
    const buff = await res.blob();
    return buff.type;
  }

  function handleImgURL(e) {
    setIsImgURLValid(true);
    clearErrors('media');

    if (mediaURL.trim() && (e.key === 'Enter' || e.currentTarget.id === 'media-btn')) {
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
          {fields.length > 0 ? (
            <div className={'mt-4 px-4'}>
              <p className={`text-sm font-semibold`}>Added images</p>
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
                          'ease-out duration-200 z-10 pointer-events-none rounded-full p-1 bg-gray-500/50 group-hover:bg-rose-800 group-hover:p-2'
                        }
                      >
                        <svg
                          className={'fill-white'}
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
            <p className={`mt-4 px-4 text-sm font-light italic`}>Added images will be displayed here</p>
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
