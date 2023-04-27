import { useApi } from '../../hooks/useApi.js';
import { GET_VENUES } from '../../settings/api.js';
import { useParams } from 'react-router-dom';

function VenueDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useApi(`${GET_VENUES}/${id}?_owner=true&_bookings=true`);
  const { name, description, media, owner, maxGuests, meta, price } = data;

  return (
    <>
      <main className={'mt-[120px] sm:mt-12'}>
        <section id={'venue-details'} className={'mt-[88px] mb-12 sm:mt-12 lg:mb-36'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            {isLoading && (
              <>
                <div className={'my-0 mx-auto w-fit min-h-screen'}>
                  <div className={'loader'}></div>
                </div>
              </>
            )}
            {!isError ? (
              <>
                <h1 className={'text-2xl font-bold capitalize mb-10 sm:text-4xl'}>{name}</h1>
                <div id={'venue-content'} className={'flex flex-col gap-6 lg:flex-row lg:max-h-[460px]'}>
                  <div className={'h-72 sm:h-auto lg:flex-1'}>
                    <img className={'rounded-xl object-cover h-full w-full'} src={media && media[0]} alt={name} />
                  </div>
                  <div className={'rounded-xl p-6 border border-gray-100 shadow-sm shadow-gray-100 lg:flex-1'}>
                    <h2 className={'pb-2 text-lg font-semibold border-b border-b-zinc-100 '}>
                      {description && description.substring(0, 120)} {description && description.length > 120 && '..'}
                    </h2>
                    <div className={'flex flex-col gap-4 mt-4 pb-2 border-b border-b-zinc-100'}>
                      <p>
                        Up to <span className={'font-semibold'}>{maxGuests}</span> guests
                      </p>
                      <p>
                        Hosted by <span className={'font-semibold'}>{owner && owner.name}</span>
                      </p>
                      <div id={'venue-meta-values'} className={'flex gap-1 text-xs font-semibold sm:text-base'}>
                        {meta &&
                          Object.keys(meta).map((item, index, array) => {
                            let interPunct = <span className={'ml-1'}>·</span>;
                            if (array.length - 1 === index) {
                              interPunct = '';
                            }
                            return (
                              <p key={index} className={'capitalize'}>
                                {item}:
                                <span className={meta[item] ? 'text-green-700' : ''}>
                                  {meta[item] ? ' Yes' : ' No'}
                                </span>
                                {interPunct}
                              </p>
                            );
                          })}
                      </div>
                      <h3 className={'text-lg mt-2'}>
                        <span className={'font-bold'}>{price} kr NOK</span> a night
                      </h3>
                    </div>
                    <div id={'booking'} className={'flex flex-col gap-5 mt-6'}>
                      <div className={'flex flex-col gap-4 sm:flex-row sm: sm:gap-8'}>
                        <div className={'flex flex-col gap-2'}>
                          <label htmlFor={'dates'}>Available dates:</label>
                          <input
                            name={'dates'}
                            className={'border-gray-200 border rounded h-10 indent-2 max-w-[152px]'}
                            type={'date'}
                            placeholder={'Available dates'}
                          />
                        </div>
                        <div className={'flex flex-col gap-2'}>
                          <label htmlFor={'guests'}>Guests:</label>
                          <input
                            defaultValue={1}
                            min={1}
                            max={maxGuests}
                            name={'guests'}
                            className={
                              'w-24 border-gray-200 border rounded h-10 indent-4 invalid:border-2 invalid:border-rose-800'
                            }
                            type={'number'}
                            onKeyDown={(e) => e.preventDefault()}
                          />
                        </div>
                      </div>
                      <button
                        className={
                          'bg-rose-800 text-white rounded h-10 w-full mt-2 sm:w-40 hover:bg-rose-700 ease-out duration-200'
                        }
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={'min-h-[50vh]'}>
                  <h2 className={'text-2xl font-bold capitalize mb-10 sm:text-4xl'}>Venue details</h2>
                  <div className={'api-error w-fit'}>
                    <p>Something went wrong..</p>
                    <p>Please try again later</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default VenueDetails;
