import { useApi } from '../../hooks/useApi.js';
import { GET_VENUES } from '../../settings/api.js';
import VenueListItem from '../VenueListItem.jsx';
import { useEffect } from 'react';

function Home() {
  const { data, isLoading, isError, fetchData } = useApi();

  useEffect(() => {
    fetchData(GET_VENUES + '?&sort=created');
  }, [fetchData]);

  return (
    <>
      <main className={'mt-[120px] min-h-screen sm:mt-12'}>
        <section id={'headline'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <div className={'bg-cover bg-headline py-16 px-6 text-white'}>
              <div id={'headline-content'} className={'sm:m-auto w-fit'}>
                <h1 className={'text-4xl font-bold mb-4'}>Welcome to Holidaze</h1>
                <p className={'mt-2 text-lg'}>Book your dream venue at affordable prices</p>
                <p className={'mt-2 text-lg'}>Or turn your property into venue and rent it out</p>
              </div>
            </div>
          </div>
        </section>
        <section id={'latest-venues'} className={'mt-[88px] mb-12'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <h2 className={'text-3xl font-bold mb-12'}>Latest venues</h2>
            {isLoading && (
              <>
                <div className={'my-0 mx-auto w-fit min-h-screen'}>
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
                  {data
                    .filter((venue) => venue.media.length)
                    .slice(0, 12)
                    .map((venue) => (
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

export default Home;
