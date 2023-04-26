import VenueListItem from '../VenueListItem.jsx';
import { useApi } from '../../hooks/useApi.js';
import { GET_VENUES } from '../../settings/api.js';

function Venues() {
  const { data, isLoading, isError } = useApi(GET_VENUES + '?&sort=created');

  return (
    <>
      <main className={'mt-[120px] min-h-screen sm:mt-12'}>
        <section id={'venues'} className={'mt-[88px] mb-12 sm:mt-12'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <h1 className={'text-4xl font-bold mb-10'}>Venues</h1>
            {isLoading && (
              <>
                <div className={'my-0 mx-auto w-fit'}>
                  <div className={'loader'}></div>
                </div>
              </>
            )}
            <div
              id={'venues-container'}
              className={
                'flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4'
              }
            >
              {!isError ? (
                <>
                  {data.map((venue) => (
                    <VenueListItem key={venue.id} {...venue} />
                  ))}
                </>
              ) : (
                <div className={'api-error'}>
                  <p>Something went wrong..</p>
                  <p>Please try again later</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Venues;
