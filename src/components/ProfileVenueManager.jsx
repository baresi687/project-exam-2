import { Link } from 'react-router-dom';
import { handleImgError } from '../utils/validation.js';
import { PROFILES, GET_VENUES as EDIT_DELETE_VENUE } from '../settings/api.js';
import { useApi } from '../hooks/useApi.js';
import { getFromStorage } from '../utils/storage.js';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';

function ProfileVenueManager() {
  const { data, isLoading, created, isError, fetchData } = useApi();
  const { isError: isDeleteError, isLoading: isLoadingDeleteVenue, isDeleted, fetchData: deleteVenue } = useApi();
  const { name, accessToken } = getFromStorage('user');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [venueIdToBeDeleted, setVenueIdToBeDeleted] = useState('');
  const [venueNameToBeDeleted, setVenueNameToBeDeleted] = useState('');
  const [venueDeleteError, setVenueDeleteError] = useState(false);

  function handleDeleteModal(id, e) {
    setVenueDeleteError(false);
    setIsDeleteModalOpen(true);
    setVenueNameToBeDeleted(e.currentTarget.dataset.venuename);
    setVenueIdToBeDeleted(id);
  }

  function handleDeleteVenue(id) {
    deleteVenue(`${EDIT_DELETE_VENUE}/${id}`, 'DELETE', accessToken);
  }

  useEffect(() => {
    fetchData(`${PROFILES}/${name}/venues?_bookings=true&_venues=true`, 'GET', accessToken);
    setIsDeleteModalOpen(false);
  }, [accessToken, fetchData, name, isDeleted]);

  useEffect(() => {
    if (isDeleteError) {
      setVenueDeleteError(true);
    }
  }, [isDeleteError]);

  return (
    <div>
      <h2 className={'text-xl font-bold mb-6'}>Venues</h2>
      {isLoading && (
        <>
          <div className={'my-0 mx-auto w-fit min-h-screen'}>
            <div className={'loader'}></div>
          </div>
        </>
      )}
      <div id={'venue-container'} className={'flex flex-col gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-3'}>
        {data &&
          data.map(({ id, name: venueName, media, bookings }, index) => {
            return (
              <div key={index} className={'rounded-xl p-6 border border-gray-100 shadow-sm shadow-gray-100'}>
                <Link to={`/venues/venue-details/${id}`}>
                  <img
                    className={'rounded-xl object-cover h-72 w-full lg:h-44'}
                    src={media[0]}
                    alt={name}
                    onError={handleImgError}
                  />
                </Link>
                <div>
                  <h3 className={'text-lg font-bold mt-2 capitalize whitespace-nowrap overflow-hidden text-ellipsis'}>
                    {venueName}
                  </h3>
                  {bookings.length ? (
                    <details className={'relative'}>
                      <summary className={'cursor-pointer select-none font-semibold text-red-800 mt-1.5 mb-6'}>
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
                    <p className={'font-extralight mt-1.5 mb-6 text-gray-900 italic'}>No bookings</p>
                  )}
                </div>
                <div className={'flex gap-3'}>
                  <button
                    className={'bg-rose-800 text-white rounded h-8 w-full hover:bg-rose-700 ease-out duration-200'}
                  >
                    Edit
                  </button>
                  <button
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
          })}
      </div>
      {data && data.length === 0 && !isError && created && (
        <div className={'rounded-xl p-6 border border-gray-100 shadow-sm shadow-gray-100 md:w-fit'}>
          <h4 className={'text-lg font-semibold mb-2'}>You have no venues</h4>
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
        id={'delete-venue-modal'}
        className={`ease-in duration-100 fixed z-40 inset-0 bg-neutral-900/70 overflow-auto flex justify-center items-center ${
          isDeleteModalOpen ? '' : 'invisible opacity-0'
        }`}
      >
        <div id={'delete-venue-modal-content'} className={'bg-white max-w-md mx-auto rounded-xl mb-36 sm:mb-0'}>
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
                  onClick={() => handleDeleteVenue(venueIdToBeDeleted)}
                  className={
                    'relative bg-amber-500 text-gray-900 text-sm rounded h-10 w-full font-semibold hover:bg-amber-400 ease-out duration-200'
                  }
                >
                  {isLoadingDeleteVenue && <span className={'loader absolute top-2 left-2 h-6 w-6'}></span>}
                  {isLoadingDeleteVenue ? 'Processing..' : 'Delete'}
                </button>
              </div>
              {venueDeleteError && (
                <div className={'api-error mt-6'}>Something went wrong.. please try again later</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileVenueManager;
