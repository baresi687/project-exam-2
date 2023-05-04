import { Link } from 'react-router-dom';
import { handleImgError } from '../utils/validation.js';
import { PROFILES } from '../settings/api.js';
import { useApi } from '../hooks/useApi.js';
import { getFromStorage } from '../utils/storage.js';
import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';

function ProfileVenueManager() {
  const { data, isLoading, isError, fetchData } = useApi();
  const { name, accessToken } = getFromStorage('user');

  useEffect(() => {
    fetchData(`${PROFILES}/${name}/venues?_bookings=true&_venues=true`, 'GET', accessToken);
  }, [accessToken, fetchData, name]);

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
          data.map(({ id, name, media, bookings }, index) => {
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
                    {name}
                  </h3>
                  {bookings.length ? (
                    <details className={'relative'}>
                      <summary className={'cursor-pointer select-none font-semibold text-red-800 mt-1.5 mb-6'}>
                        View bookings
                      </summary>
                      <ul
                        className={
                          'absolute top-8 left-[-24px] w-fit font-semibold text-sm bg-gray-50 p-6 rounded-xl flex flex-col gap-3'
                        }
                      >
                        {bookings
                          .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
                          .map(({ id, dateFrom, dateTo }) => {
                            return (
                              <li key={id}>
                                {format(parseISO(dateFrom), 'MMMM do')} to {format(parseISO(dateTo), 'MMMM do')}{' '}
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
      {data && data.length === 0 && !isError && (
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
    </div>
  );
}

export default ProfileVenueManager;
