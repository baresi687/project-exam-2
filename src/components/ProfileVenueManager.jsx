import { Link } from 'react-router-dom';
import { createAndEditSchema, handleImgError, scrollToMessage } from '../utils/validation.js';
import { PROFILES, GET_VENUES as EDIT_DELETE_VENUE } from '../settings/api.js';
import { useApi } from '../hooks/useApi.js';
import { getFromStorage } from '../utils/storage.js';
import { useContext, useEffect, useRef, useState } from 'react';
import { format, parseISO } from 'date-fns';
import CreateAndEditVenueForm from './shared/CreateAndEditVenueForm.jsx';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ProfileCustomer from './ProfileCustomer.jsx';
import { DataAndSettingsContext } from '../context/DataAndSettingsContext.jsx';

function ProfileVenueManager() {
  const [data, isLoading, isError, fetchData, , isVenueSectionActive, setIsVenueSectionActive] =
    useContext(DataAndSettingsContext);
  const [isDoneFetching, setIsDoneFetching] = useState(false);
  const { isError: isDeleteError, isLoading: isLoadingDeleteVenue, isDeleted, fetchData: deleteVenue } = useApi();
  const { name, accessToken } = getFromStorage('user');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [venueIdToBeDeletedOrChanged, setVenueIdToBeDeletedOrChanged] = useState('');
  const [venueNameToBeDeleted, setVenueNameToBeDeleted] = useState('');
  const editSubmitRef = useRef(null);
  const deleteSubmitRef = useRef(null);
  const [venueDeleteError, setVenueDeleteError] = useState(false);
  const editForm = useForm({ resolver: yupResolver(createAndEditSchema) });
  const { control } = editForm;
  const [locationString, setLocationString] = useState('');
  const mediaArray = useFieldArray({
    control,
    name: 'media',
  });
  const [mediaURL, setMediaURL] = useState('');
  const editFormErrorRef = useRef(null);
  const [isFormError, setIsFormError] = useState(false);
  const { setValue, clearErrors } = editForm;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    isLoading: isLoadingEditVenue,
    created: venueEdited,
    isError: isEditError,
    errorMsg: editErrorMsg,
    fetchData: editVenue,
  } = useApi();

  function onEditSubmit(data) {
    setIsDoneFetching(false);
    editVenue(`${EDIT_DELETE_VENUE}/${venueIdToBeDeletedOrChanged}`, 'PUT', accessToken, data);
  }

  function handleEditVenue(e) {
    clearErrors();
    setMediaURL('');
    const locationObject = JSON.parse(e.currentTarget.dataset.location);
    const meta = JSON.parse(e.currentTarget.dataset.meta);
    const mediaArray = JSON.parse(e.currentTarget.dataset.media);

    setValue('name', e.currentTarget.dataset.name);
    setValue('description', e.currentTarget.dataset.description);
    setLocationString(
      `${locationObject.address}, ${locationObject.zip}, ${locationObject.city}, ${locationObject.country} `
    );
    setValue('price', e.currentTarget.dataset.price);
    setValue('maxGuests', e.currentTarget.dataset.maxguests);
    setValue('media', [...mediaArray]);
    setValue('location', { ...locationObject });

    for (const property in meta) {
      setValue(`meta.${property}`, meta[property]);
    }

    setVenueIdToBeDeletedOrChanged(e.currentTarget.dataset.id);
    setIsEditModalOpen(true);
  }

  function handleDeleteModal(id, e) {
    setVenueDeleteError(false);
    setIsDeleteModalOpen(true);
    setVenueNameToBeDeleted(e.currentTarget.dataset.venuename);
    setVenueIdToBeDeletedOrChanged(id);
  }

  function handleDeleteVenue(id) {
    deleteVenue(`${EDIT_DELETE_VENUE}/${id}`, 'DELETE', accessToken);
  }

  useEffect(() => {
    if (isVenueSectionActive) {
      setIsDoneFetching(false);
      fetchData(`${PROFILES}/${name}/venues?_bookings=true&_venues=true`, 'GET', accessToken).then(() =>
        setIsDoneFetching(true)
      );
      setIsDeleteModalOpen(false);
      setIsEditModalOpen(false);
    }
  }, [accessToken, fetchData, name, isDeleted, venueEdited, isVenueSectionActive]);

  useEffect(() => {
    if (isEditError) {
      editSubmitRef.current.focus();
      setIsFormError(true);
      scrollToMessage(editFormErrorRef);
    }
  }, [isEditError]);

  useEffect(() => {
    if (isDeleteError) {
      deleteSubmitRef.current.focus();
      setVenueDeleteError(true);
    }
  }, [isDeleteError]);

  return (
    <>
      <div className={'flex gap-3 items-center mb-5 text-red-800 font-semibold'}>
        <button
          onClick={() => setIsVenueSectionActive(true)}
          className={`ease-out duration-200 decoration-2 px-2 py-1 rounded hover:bg-rose-700 hover:text-white ${
            isVenueSectionActive && 'bg-rose-800 text-white'
          }`}
        >
          Venues
        </button>
        <span className={'text-gray-900'}>|</span>
        <button
          onClick={() => setIsVenueSectionActive(false)}
          className={`ease-out duration-200 decoration-2 px-2 py-1 rounded hover:bg-rose-700 hover:text-white ${
            !isVenueSectionActive && 'bg-rose-800 text-white'
          }`}
        >
          Upcoming bookings
        </button>
      </div>
      {isVenueSectionActive ? (
        <div id={'venues'} className={'relative h-full'}>
          {isLoading && (
            <>
              <div className={'absolute left-0 right-0 h-full flex justify-center bg-white'}>
                <div className={'loader'}></div>
              </div>
            </>
          )}
          <div id={'venue-container'} className={'flex flex-col gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-3'}>
            {data.length > 0 &&
              data.map(
                ({ id, name: venueName, description, location, price, maxGuests, media, bookings, meta }, index) => {
                  return (
                    <div
                      key={index}
                      className={'rounded-xl p-6 border border-neutral-200 shadow-sm shadow-neutral-100'}
                    >
                      <Link to={`/venues/venue-details/${id}`}>
                        <img
                          className={'rounded-xl object-cover h-72 w-full lg:h-44'}
                          src={media[0]}
                          alt={name}
                          onError={handleImgError}
                        />
                      </Link>
                      <div>
                        <h3
                          className={
                            'text-lg font-bold mt-2 capitalize whitespace-nowrap overflow-hidden text-ellipsis'
                          }
                        >
                          {venueName}
                        </h3>
                        {bookings && bookings.length ? (
                          <details className={'relative'}>
                            <summary className={'cursor-pointer select-none font-semibold text-red-800 mt-2.5 mb-6'}>
                              View bookings
                            </summary>
                            <ul
                              className={
                                'absolute top-8 left-0 w-full font-semibold text-sm bg-gray-50 p-6 rounded-xl flex flex-col gap-3 drop-shadow-md border border-gray-100'
                              }
                            >
                              {bookings
                                .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
                                .map(({ id, dateFrom, dateTo }) => {
                                  return (
                                    <li key={id}>
                                      {format(parseISO(dateFrom), 'd MMM')} to {format(parseISO(dateTo), 'd MMM')}{' '}
                                      {format(parseISO(dateTo), 'y')}
                                    </li>
                                  );
                                })}
                            </ul>
                          </details>
                        ) : (
                          <p className={'font-extralight mt-2.5 mb-6 text-gray-900 italic'}>No bookings</p>
                        )}
                      </div>
                      <div className={'flex gap-3'}>
                        <button
                          data-id={id}
                          data-name={venueName}
                          data-description={description}
                          data-location={JSON.stringify(location)}
                          data-price={price}
                          data-maxguests={maxGuests}
                          data-media={JSON.stringify(media)}
                          data-meta={JSON.stringify(meta)}
                          onClick={handleEditVenue}
                          className={
                            'bg-rose-800 text-white rounded h-8 w-full hover:bg-rose-700 ease-out duration-200'
                          }
                        >
                          Edit
                        </button>
                        <button
                          data-cy={venueName}
                          data-venueid={id}
                          data-venuename={venueName}
                          onClick={(e) => handleDeleteModal(id, e)}
                          className={
                            'bg-amber-500 w-28 text-gray-900 text-sm font-semibold rounded h-8 hover:bg-amber-400 ease-out duration-200'
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
          {isDoneFetching && data.length === 0 && !isError && (
            <div className={'rounded-xl p-6 border border-neutral-200 shadow-sm shadow-neutral-100 md:w-fit'}>
              <h3 className={'text-lg font-semibold mb-2'}>You have no venues</h3>
              <p>
                Create{' '}
                <Link
                  className={'text-rose-800 font-semibold underline-offset-4 decoration-2 hover:underline'}
                  to={'/create-venue'}
                >
                  Venue
                </Link>{' '}
              </p>
            </div>
          )}
          {isError && (
            <div className={'api-error md:w-fit'}>
              <p>Something went wrong..</p>
              <p>Please try again later</p>
            </div>
          )}
          <div
            id={'edit-venue-modal'}
            className={`ease-in duration-100 fixed z-40 inset-0 flex bg-neutral-900/70 overflow-auto modal-scrollbar-remove ${
              isEditModalOpen ? '' : 'invisible opacity-0'
            }`}
          >
            <div
              id={'edit-venue-modal-content'}
              className={'relative w-full h-fit bg-white rounded-xl mx-auto my-24 sm:max-w-[568px]'}
            >
              <button
                aria-label={'Close modal'}
                className={'absolute right-6 top-6'}
                onClick={() => setIsEditModalOpen(false)}
              >
                <svg
                  className={'pointer-events-none'}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
                    fill="#111827"
                  />
                </svg>
              </button>
              <CreateAndEditVenueForm
                form={editForm}
                title={'Edit Venue'}
                btnTitle={'Edit Venue'}
                locationString={locationString}
                setLocationString={setLocationString}
                mediaArray={mediaArray}
                mediaURL={mediaURL}
                setMediaURL={setMediaURL}
                onSubmit={onEditSubmit}
                isLoading={isLoadingEditVenue}
                isFormError={isFormError}
                setIsFormError={setIsFormError}
                errorMsg={editErrorMsg}
                submitButtonRef={editSubmitRef}
                formErrorRef={editFormErrorRef}
              />
            </div>
          </div>
          <div
            id={'delete-venue-modal'}
            className={`ease-in duration-100 fixed z-40 inset-0 bg-neutral-900/70 overflow-auto flex justify-center items-center ${
              isDeleteModalOpen ? '' : 'invisible opacity-0'
            }`}
          >
            <div id={'delete-venue-modal-content'} className={'bg-white max-w-md mx-auto rounded-xl'}>
              <div className={'px-6 pb-6'}>
                <header className={'h-[80px] flex items-center justify-center relative border-b-2 border-b-neutral-50'}>
                  <h3 className={'font-bold'}>Delete venue</h3>
                  <button
                    aria-label={'Close modal'}
                    className={'absolute right-0'}
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    <svg
                      className={'pointer-events-none'}
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
                        fill="#111827"
                      />
                    </svg>
                  </button>
                </header>
                <div className={'mt-4'}>
                  <p className={'font-semibold'}>Are you sure you want to delete this venue? </p>
                  <h5 className={'capitalize font-bold text-xl my-6'}>{venueNameToBeDeleted}</h5>
                  <div className={'flex gap-4'}>
                    <button
                      onClick={() => setIsDeleteModalOpen(false)}
                      className={'bg-rose-800 text-white rounded h-10 w-full hover:bg-rose-700 ease-out duration-200'}
                    >
                      Cancel
                    </button>
                    <button
                      data-cy={'delete-venue'}
                      ref={deleteSubmitRef}
                      onClick={() => handleDeleteVenue(venueIdToBeDeletedOrChanged)}
                      className={
                        'relative bg-amber-500 text-gray-900 rounded h-10 w-full font-semibold hover:bg-amber-400 disabled:hover:cursor-none ease-out duration-200'
                      }
                      disabled={isLoadingDeleteVenue}
                    >
                      {isLoadingDeleteVenue && (
                        <span
                          className={
                            'loader absolute top-3 left-3 h-4 w-4 border-2 border-gray-900 border-t-transparent'
                          }
                        ></span>
                      )}
                      {isLoadingDeleteVenue ? 'Processing..' : 'Delete'}
                    </button>
                  </div>
                  {venueDeleteError && (
                    <div className={'api-error mt-6'}>
                      <p>Something went wrong..</p>
                      <p>Please try again later</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ProfileCustomer />
      )}
    </>
  );
}

export default ProfileVenueManager;
