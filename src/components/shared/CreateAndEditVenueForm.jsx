function CreateAndEditVenueForm({
  form,
  title,
  btnTitle,
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
    formState: { errors },
  } = form;

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
            className={`border-gray-200 border rounded h-40 px-4 pt-2 w-full ${errors.description && 'border-red-700'}`}
            placeholder={'Description'}
          />
        </label>
        {errors.description && <p className={'text-red-700'}>{errors.description?.message}</p>}
        <label className={'w-full'}>
          <input
            {...register('price')}
            className={`border-gray-200 border rounded h-10 indent-4 w-full ${errors.price && 'border-red-700'}`}
            type={'number'}
            placeholder={'Price'}
          />
        </label>
        {errors.price && <p className={'text-red-700'}>{errors.price?.message}</p>}
        <label className={'w-full'}>
          <input
            {...register('maxGuests')}
            className={`border-gray-200 border rounded h-10 indent-4 w-full ${errors.maxGuests && 'border-red-700'}`}
            type={'number'}
            placeholder={'Max guests'}
          />
        </label>
        {errors.maxGuests && <p className={'text-red-700'}>{errors.maxGuests?.message}</p>}
        <label className={'w-full'}>
          <input
            {...register('media')}
            className={`border-gray-200 border rounded h-10 indent-4 w-full ${errors.media && 'border-red-700'}`}
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
          {isLoading ? 'Processing..' : `${btnTitle}`}
        </button>
      </div>
      <div ref={formErrorRef}>{isFormError && <div className={'api-error mt-6 break-words'}>{errorMsg}</div>}</div>
    </form>
  );
}

export default CreateAndEditVenueForm;
