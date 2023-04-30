import { useApi } from '../../hooks/useApi.js';
import { GET_VENUES } from '../../settings/api.js';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import en_gb from 'date-fns/locale/en-GB';
registerLocale('en-GB', en_gb);

function VenueDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, fetchData } = useApi();
  const { id: venueId, name, description, media, owner, maxGuests, meta, price, bookings } = data;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isValidDateRange, setIsValidDateRange] = useState(true);
  const bookingsArray = [];

  useEffect(() => {
    fetchData(`${GET_VENUES}/${id}?_owner=true&_bookings=true`);
  }, []);

  if (bookings && bookings.length) {
    bookings.forEach((booking) => {
      bookingsArray.push({ start: new Date(booking.dateFrom), end: new Date(booking.dateTo) });
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: guests,
      venueId: venueId,
    };

    console.log(body);
  }

  function handleGuests(e) {
    const id = e.currentTarget.id;

    switch (id) {
      case 'guest-increment':
        if (maxGuests === guests) {
          break;
        } else {
          setGuests(guests + 1);
          break;
        }
      case 'guest-decrement':
        if (guests === 1) {
          break;
        } else {
          setGuests(guests - 1);
          break;
        }
    }
  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setIsValidDateRange(true);
    setStartDate(start);

    if (bookingsArray.length > 0) {
      for (let i = 0; i < bookingsArray.length; i++) {
        if (start < new Date(bookingsArray[i].start) && end > new Date(bookingsArray[i].end)) {
          setStartDate(null);
          setEndDate(null);
          setIsValidDateRange(false);
          break;
        } else {
          setEndDate(end);
        }
      }
    } else {
      setEndDate(end);
    }
  };

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
                <div id={'venue-content'} className={'flex flex-col gap-6 lg:flex-row lg:h-[460px]'}>
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
                    <form
                      autoComplete="off"
                      onSubmit={handleSubmit}
                      id={'booking'}
                      className={'flex flex-col gap-5 mt-6'}
                    >
                      <div className={'flex flex-col gap-4 sm:flex-row sm: sm:gap-8'}>
                        <div className={'flex flex-col gap-2'}>
                          <label htmlFor={'dates'}>Available dates:</label>
                          <DatePicker
                            name={'dates'}
                            locale={'en-GB'}
                            selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            required
                            id={'dates'}
                            className={`text-sm border-gray-200 border rounded h-10 indent-3 w-52 active:border-0 ${
                              !isValidDateRange && 'text-xs indent-2 border-2 border-red-700 placeholder:text-red-700'
                            }`}
                            dateFormat={'dd.MM.yyyy'}
                            minDate={new Date()}
                            placeholderText={!isValidDateRange ? 'Please select valid available dates' : 'Select dates'}
                            excludeDateIntervals={bookingsArray}
                          />
                        </div>
                        <div className={'flex flex-col gap-2'}>
                          <label htmlFor={'guests'}>Guests: </label>
                          <div className={'flex items-center'}>
                            <button
                              aria-label={'Decrement guests'}
                              id={'guest-decrement'}
                              type={'button'}
                              onClick={(e) => handleGuests(e)}
                              className={`rounded-full p-2 border border-neutral-400 ${
                                guests === 1 && 'opacity-30 cursor-not-allowed'
                              }`}
                            >
                              <svg
                                className={'pointer-events-none'}
                                width="12"
                                height="12"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M0 6H16V10H0V6Z" fill="#737373" />
                              </svg>
                            </button>
                            <input
                              aria-label={'Current number of guests'}
                              name={'guests'}
                              id={'guests'}
                              value={guests}
                              min={1}
                              max={maxGuests}
                              className={'text-center h-10 font-semibold'}
                              type={'number'}
                              readOnly
                            />
                            <button
                              aria-label={'Increment guests'}
                              id={'guest-increment'}
                              type={'button'}
                              onClick={(e) => handleGuests(e)}
                              className={`rounded-full p-2 border border-neutral-400 ${
                                guests === maxGuests && 'opacity-30 cursor-not-allowed'
                              }`}
                            >
                              <svg
                                className={'pointer-events-none'}
                                width="12"
                                height="12"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.6 6.4V0H6.4V6.4H0V9.6H6.4V16H9.6V9.6H16V6.4H9.6Z" fill="#737373" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        type={'submit'}
                        className={
                          'bg-rose-800 text-white rounded h-10 w-full mt-2 sm:w-40 hover:bg-rose-700 ease-out duration-200'
                        }
                      >
                        Reserve
                      </button>
                    </form>
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
