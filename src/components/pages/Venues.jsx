import VenueListItem from '../VenueListItem.jsx';
import { useApi } from '../../hooks/useApi.js';
import { GET_VENUES } from '../../settings/api.js';
import { useContext, useEffect } from 'react';
import { filterVenuesWithProperties } from '../../utils/validation.js';
import { VenuePageContext } from '../layout/Layout.jsx';

function Venues() {
  const { data, isLoading, isError, fetchData } = useApi();
  const [sort, setSort, sortOrder, setSortOrder] = useContext(VenuePageContext);

  useEffect(() => {
    fetchData(`${GET_VENUES}?&sort=${sort ? 'created' : 'name'}&sortOrder=${sortOrder ? 'desc' : 'asc'}`);
  }, [fetchData, sort, sortOrder]);

  return (
    <>
      <main className={'mt-[120px] min-h-screen sm:mt-12'}>
        <section id={'venues'} className={'mt-[88px] mb-12 sm:mt-12'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <h1 className={'text-4xl font-bold mb-10'}>Venues</h1>
            <div id={'sort-venues'} className={'mb-10'}>
              <h2 className={'mb-3 text-base font-bold sm:mr-3 sm:inline'}>Sort by</h2>
              <span className={'block text-xs text-white font-semibold sm:inline sm:text-sm'}>
                <button
                  onClick={() => setSort(true)}
                  aria-label={'Sort venues by date'}
                  className={`rounded py-1 px-2 mr-2 ease-out duration-200 hover:bg-rose-700 ${
                    sort ? 'bg-rose-800' : 'text-rose-800 hover:text-white'
                  }`}
                >
                  Created
                </button>
                <button
                  onClick={() => setSort(false)}
                  aria-label={'Sort venues by name'}
                  className={`rounded py-1 px-2 mr-2 ease-out duration-200 hover:bg-rose-700 ${
                    !sort ? 'bg-rose-800' : 'text-rose-800 hover:text-white'
                  }`}
                >
                  Name
                </button>
                <span className={'text-gray-900 mr-4'}>|</span>
                <button
                  onClick={() => setSortOrder(true)}
                  aria-label={'Sort venues descending'}
                  className={`rounded py-1 px-2 mr-2 ease-out duration-200 hover:bg-rose-700 ${
                    sortOrder ? 'bg-rose-800' : 'text-rose-800 hover:text-white'
                  }`}
                >
                  Descending
                </button>
                <button
                  onClick={() => setSortOrder(false)}
                  aria-label={'Sort venues ascending'}
                  className={`rounded py-1 px-2 ease-out duration-200 hover:bg-rose-700 ${
                    !sortOrder ? 'bg-rose-800' : 'text-rose-800 hover:text-white'
                  }`}
                >
                  Ascending
                </button>
              </span>
            </div>
            {isLoading && (
              <>
                <div className={'my-0 mx-auto w-fit min-h-screen'}>
                  <div className={'loader'}></div>
                </div>
              </>
            )}
            <div
              id={'venues-container'}
              className={`flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4              
                 ${
                   isError ? 'h-auto' : 'min-h-[2409.5rem] sm:min-h-[1184.5rem] md:min-h-[757.5rem] lg:min-h-[553rem]'
                 }`}
            >
              {!isError ? (
                <>
                  {filterVenuesWithProperties(data)
                    .slice(0, 76)
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

export default Venues;
