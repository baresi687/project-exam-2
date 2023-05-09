import { useApi } from '../hooks/useApi.js';
import { PROFILES } from '../settings/api.js';
import { useEffect } from 'react';
import { getFromStorage } from '../utils/storage.js';
import { handleImgError } from '../utils/validation.js';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

function ProfileCustomer() {
  const { data, isLoading, isError, fetchData } = useApi();
  const { name, accessToken } = getFromStorage('user');
  const upComingBookings = data.bookings
    ? data.bookings
        .filter((booking) => new Date(new Date().setHours(0, 0, 0, 0)) <= new Date(booking.dateFrom))
        .sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom))
    : [];

  useEffect(() => {
    fetchData(`${PROFILES}/${name}?_bookings=true&_venues=true`, 'GET', accessToken);
  }, [accessToken, fetchData, name]);

  return (
    <>
      {isLoading && (
        <>
          <div className={'my-0 mx-auto w-fit min-h-screen'}>
            <div className={'loader'}></div>
          </div>
        </>
      )}
      <div id={'bookings-container'} className={'flex flex-col gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-3'}>
        {upComingBookings.length > 0 &&
          upComingBookings.map(({ created, dateFrom, dateTo, venue }, index) => {
            const dateCreated = format(parseISO(created), 'd MMM');
            const fromDate = format(parseISO(dateFrom), 'd MMM');
            const toDate = format(parseISO(dateTo), 'd MMM');

            return (
              <div
                key={index}
                className={'flex flex-col gap-3 rounded-xl p-6 border border-neutral-200 shadow-sm shadow-neutral-100'}
              >
                <Link to={`/venues/venue-details/${venue.id}`}>
                  <img
                    className={'rounded-xl object-cover h-72 w-full lg:h-44'}
                    src={venue.media[0]}
                    alt={venue.name}
                    onError={handleImgError}
                  />
                </Link>
                <div>
                  <h3 className={'text-lg font-bold capitalize whitespace-nowrap overflow-hidden text-ellipsis'}>
                    {venue.name}
                  </h3>
                  <p className={'text-xs font-light'}>Booked on {dateCreated}</p>
                </div>
                <h4 className={'text-base font-semibold mt-auto'}>
                  From {fromDate} to {toDate}
                </h4>
              </div>
            );
          })}
      </div>
      {!upComingBookings.length && !isError && (
        <div className={'rounded-xl p-6 border border-neutral-200 shadow-sm shadow-neutral-100 md:w-fit'}>
          <h4 className={'text-lg font-semibold mb-2'}>No upcoming bookings</h4>
          <p>
            Have a look at{' '}
            <Link
              className={'text-rose-800 font-semibold underline-offset-4 decoration-2 hover:underline'}
              to={'/venues'}
            >
              Venues
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
    </>
  );
}

export default ProfileCustomer;
