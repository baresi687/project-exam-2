import { useParams } from 'react-router-dom';
import VenueListItem from '../VenueListItem.jsx';
import { GET_VENUES } from '../../settings/api.js';
import { useContext, useEffect } from 'react';
import { filterVenuesWithProperties } from '../../utils/validation.js';
import { DataAndSettingsContext } from '../../context/DataAndSettingsContext.jsx';

function Search() {
  const { value } = useParams();
  const [data, isLoading, isError, fetchData] = useContext(DataAndSettingsContext);
  const searchResults =
    data.length > 0 &&
    data.filter(
      ({ name, description }) =>
        name.toLowerCase().includes(value.toLowerCase()) || description.toLowerCase().includes(value.toLowerCase())
    );

  useEffect(() => {
    fetchData(GET_VENUES + '?&sort=created&sortOrder=desc');
  }, [fetchData, value]);

  return (
    <>
      <main className={'mt-[120px] min-h-[65vh] sm:mt-12'}>
        <section id={'venues'} className={'mt-[88px] mb-12 sm:mt-12'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            <h1 className={'text-4xl font-bold mb-10'}>Search Results</h1>
            {isLoading && (
              <>
                <div className={'absolute left-0 right-0 min-h-screen flex justify-center bg-white'}>
                  <div className={'loader'}></div>
                </div>
              </>
            )}
            {!isError && (
              <h2 className={'text-lg font-normal mb-6'}>
                {searchResults.length > 0 ? 'Results for ' : 'No matches for '}{' '}
                <span className={'italic font-bold'}>{`'${value.trim()}'`}</span>
              </h2>
            )}
            <div
              id={'venues-container'}
              className={
                'flex flex-col gap-14 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4'
              }
            >
              {searchResults.length > 0 &&
                filterVenuesWithProperties(searchResults).map((venue) => <VenueListItem key={venue.id} {...venue} />)}
            </div>
            {isError && (
              <div className={'api-error sm:w-fit'}>
                <p>Something went wrong..</p>
                <p>Please try again later</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Search;
