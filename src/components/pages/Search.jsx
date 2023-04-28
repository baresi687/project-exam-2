import { useParams } from 'react-router-dom';
import VenueListItem from '../VenueListItem.jsx';
import { useApi } from '../../hooks/useApi.js';
import { GET_VENUES } from '../../settings/api.js';

function Search() {
  const { value } = useParams();
  const { data, isLoading, isError } = useApi(GET_VENUES + '?&sort=created&sortOrder=desc');
  const searchResults = data.filter(
    ({ name, description }) =>
      name.toLowerCase().includes(value.toLowerCase().trim()) ||
      description.toLowerCase().includes(value.toLowerCase().trim())
  );

  return (
    <>
      <main className={'mt-[120px] min-h-[60vh] sm:mt-12'}>
        <section id={'venues'} className={'mt-[88px] mb-12 sm:mt-12'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <h1 className={'text-4xl font-bold mb-10'}>Search Results</h1>
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
                  {searchResults.length ? (
                    searchResults
                      .filter((venue) => venue.media.length)
                      .map((venue) => <VenueListItem key={venue.id} {...venue} />)
                  ) : (
                    <h2 className={'text-lg font-normal'}>
                      No matches for <span className={'italic font-bold'}>{value.trim()}</span>
                    </h2>
                  )}
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

export default Search;
