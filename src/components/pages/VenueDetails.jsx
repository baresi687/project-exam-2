import { useApi } from '../../hooks/useApi.js';
import { CREATE_BOOKING, GET_VENUES } from '../../settings/api.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import en_gb from 'date-fns/locale/en-GB';
import { AuthContext } from '../../context/AuthContext.js';
import { SignInUpModal } from '../layout/Layout.jsx';
import { handleImgError, scrollToMessage } from '../../utils/validation.js';
registerLocale('en-GB', en_gb);

function VenueDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, fetchData } = useApi();
  const {
    data: postBooking,
    created,
    isLoading: isLoadingBooking,
    isError: isErrorBooking,
    errorMsg,
    fetchData: fetchBooking,
  } = useApi();
  const { id: venueId, name, description, media, owner, maxGuests, meta, price, bookings } = data;
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isValidDateRange, setIsValidDateRange] = useState(true);
  const bookingsArray = [];
  const [isFormError, setIsFormError] = useState(false);
  const [auth] = useContext(AuthContext);
  const [, setIsSignInUpModal] = useContext(SignInUpModal);
  const bookingErrorRef = useRef(null);
  const [isVenueOwnedByUser, setIsVenueOwnedByUSer] = useState(false);
  const navigate = useNavigate();

  if (bookings && bookings.length) {
    bookings.forEach((booking) => {
      if (new Date(booking.dateFrom) < new Date(booking.dateTo)) {
        bookingsArray.push({ start: new Date(booking.dateFrom), end: new Date(booking.dateTo) });
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (auth && owner && auth.name !== owner.name) {
      const body = {
        dateFrom: startDate.toISOString(),
        dateTo: endDate.toISOString(),
        guests: guests,
        venueId: venueId,
      };

      fetchBooking(CREATE_BOOKING, 'POST', auth.accessToken, body);
    } else if (auth && owner && auth.name === owner.name) {
      setIsVenueOwnedByUSer(true);
    } else {
      setIsSignInUpModal(true);
    }
  }

  function handleGuests(e) {
    const id = e.currentTarget.id;

    switch (id) {
      case 'guest-increment':
        setGuests(guests + 1);
        break;
      case 'guest-decrement':
        setGuests(guests - 1);
        break;
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

  useEffect(() => {
    fetchData(`${GET_VENUES}/${id}?_owner=true&_bookings=true`);
  }, [fetchData, id, postBooking]);

  useEffect(() => {
    if (isErrorBooking) {
      setIsFormError(true);
      scrollToMessage(bookingErrorRef);
    }
  }, [isErrorBooking]);

  useEffect(() => {
    if (created) {
      navigate('/profile', { state: { ifManagerHasBooked: true } });
    }
  }, [created, navigate]);

  return (
    <>
      <main className={'mt-[120px] sm:mt-12'}>
        <section id={'venue-details'} className={'mt-[88px] mb-12 sm:mt-12 lg:mb-36'}>
          <div className={'container mx-auto px-4 max-w-7xl'}>
            {isLoading && (
              <>
                <div className={'flex justify-center min-h-screen mt-48 lg:mt-32'}>
                  <div className={'loader'}></div>
                </div>
              </>
            )}
            {!isError ? (
              <>
                <h1 className={'text-2xl font-bold capitalize mb-10 sm:text-4xl'}>{name}</h1>
                <div id={'venue-content'} className={'flex flex-col gap-6 lg:flex-row lg:h-[460px]'}>
                  <div className={'h-72 sm:h-96 md:h-[28rem] lg:h-auto lg:basis-1/2'}>
                    <img
                      className={'rounded-xl object-cover h-full w-full'}
                      src={media && media[0]}
                      alt={name}
                      onError={handleImgError}
                    />
                  </div>
                  <div
                    className={
                      'relative rounded-xl py-6 border border-neutral-200 shadow-sm shadow-neutral-100 lg:basis-1/2'
                    }
                  >
                    <div
                      className={`left-0 px-6 bg-white lg:absolute ${
                        showMoreDesc && 'z-20 rounded-xl venue-desc-shadow'
                      }`}
                    >
                      <div className={`border-b border-b-zinc-100 pb-3 ${showMoreDesc && 'lg:pb-9'}`}>
                        <h2
                          onClick={() => description && description.length > 120 && setShowMoreDesc(!showMoreDesc)}
                          className={`text-base font-semibold ${showMoreDesc && 'whitespace-pre-line'}`}
                        >
                          {description && description.substring(0, 120)}
                          <span
                            className={`${description && description.length > 120 ? 'inline' : 'hidden'} ${
                              !showMoreDesc ? 'inline' : 'hidden'
                            }`}
                          >
                            ...
                          </span>
                          {showMoreDesc && <span>{description && description.substring(120)}</span>}
                        </h2>
                        {description && description.length > 120 && (
                          <button
                            aria-label={'Show more or less description toggle'}
                            onClick={() => setShowMoreDesc(!showMoreDesc)}
                            className={`underline-offset-4 w-fit mt-2 ${
                              showMoreDesc && 'mt-4'
                            } text-sm font-light bottom-[14px] right-[32px] bg-white lg:absolute lg:mt-0 hover:underline`}
                          >
                            {showMoreDesc ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className={'flex flex-col gap-4 mt-4 px-6 lg:mt-20'}>
                      <p>
                        Up to <span className={'font-semibold'}>{maxGuests}</span> guests
                      </p>
                      <div className={'flex items-center gap-2'}>
                        {owner && (
                          <>
                            <p>
                              Hosted by <span className={'font-semibold'}>{owner.name}</span>
                            </p>
                            {owner.avatar && (
                              <img
                                loading={'lazy'}
                                className={'object-cover rounded-full h-6 w-6'}
                                src={owner.avatar}
                                alt={owner.name}
                                onError={(e) => e.currentTarget.remove()}
                              />
                            )}
                          </>
                        )}
                      </div>
                      <div
                        id={'venue-meta-values'}
                        className={'flex flex-wrap text-sm gap-4 leading-6 font-semibold sm:text-base'}
                      >
                        {meta &&
                          Object.keys(meta).map((item, index) => {
                            return (
                              <div key={index} className={'flex gap-1.5 items-center capitalize'}>
                                <p>{item}</p>
                                {meta[item] ? (
                                  <span aria-label={`This venue has ${item}`} className={'checkmark'}></span>
                                ) : (
                                  <span aria-label={`This venues does not have ${item}`}>
                                    <svg
                                      className={'pointer-events-none'}
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="14"
                                      height="14"
                                      fill="none"
                                    >
                                      <path
                                        fill="#a3a3a3"
                                        d="M7 0C5.068 0 3.418.684 2.05 2.05.685 3.419 0 5.069 0 7c0 1.932.684 3.582 2.05 4.95C3.419 13.315 5.069 14 7 14c1.932 0 3.582-.684 4.95-2.05C13.315 10.581 14 8.931 14 7c0-1.932-.684-3.582-2.05-4.95C10.581.685 8.931 0 7 0ZM1.176 7c0-1.604.57-2.976 1.709-4.115 1.14-1.14 2.51-1.71 4.115-1.71 1.44 0 2.661.447 3.664 1.34l-8.148 8.15C1.622 9.66 1.176 8.44 1.176 7ZM7 12.824c-1.44 0-2.661-.446-3.664-1.34l8.148-8.148c.894 1.003 1.34 2.224 1.34 3.664 0 1.604-.57 2.976-1.709 4.115-1.14 1.14-2.51 1.71-4.115 1.71Z"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                            );
                          })}
                      </div>
                      <h3 className={'text-lg mt-2 pb-2 border-b border-b-zinc-100'}>
                        <span className={'font-bold'}>{price && price.toLocaleString()} kr NOK</span> a night
                      </h3>
                    </div>
                    <form
                      onBlur={() => setIsFormError(false)}
                      autoComplete="off"
                      onSubmit={handleSubmit}
                      id={'booking'}
                      className={'flex flex-col gap-5 px-6 mt-8'}
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
                            onClickOutside={() => startDate && !endDate && setStartDate(null)}
                            selectsRange
                            required={auth}
                            id={'dates'}
                            className={`text-sm border-gray-200 border rounded h-10 indent-3 w-52 ${
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
                              disabled={guests === 1}
                              onClick={(e) => handleGuests(e)}
                              className={`rounded-full p-2 border border-neutral-400 ${
                                guests === 1 && 'opacity-30 cursor-not-allowed'
                              }`}
                            >
                              <svg
                                className={'pointer-events-none'}
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="none"
                              >
                                <g clipPath="url(#a)">
                                  <path stroke="#737373" strokeWidth="2" d="M0 6h16" />
                                </g>
                                <defs>
                                  <clipPath id="a">
                                    <path fill="#fff" d="M0 0h12v12H0z" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                            <input
                              aria-label={'Current number of guests'}
                              name={'guests'}
                              id={'guests'}
                              value={guests}
                              min={1}
                              max={maxGuests}
                              className={'text-center h-10 w-10 font-semibold'}
                              type={'number'}
                              readOnly
                            />
                            <button
                              aria-label={'Increment guests'}
                              id={'guest-increment'}
                              type={'button'}
                              disabled={guests === maxGuests}
                              onClick={(e) => handleGuests(e)}
                              className={`rounded-full p-2 border border-neutral-400 ${
                                guests === maxGuests && 'opacity-30 cursor-not-allowed'
                              }`}
                            >
                              <svg
                                className={'pointer-events-none'}
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                fill="none"
                              >
                                <g stroke="#737373" strokeWidth="2" clipPath="url(#a)">
                                  <path d="M0 6h16M6 12V-4" />
                                </g>
                                <defs>
                                  <clipPath id="a">
                                    <path fill="#fff" d="M0 0h12v12H0z" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className={'flex flex-col gap-4 sm:flex-row sm:items-center'}>
                        <button
                          type={'submit'}
                          className={`relative bg-rose-800 text-white rounded h-10 w-full sm:w-40 hover:bg-rose-700 ease-out duration-200`}
                        >
                          {isLoadingBooking && (
                            <span
                              className={
                                'loader absolute top-2.5 left-4 h-5 w-5 border-2 border-t-transparent sm:left-2.5 '
                              }
                            ></span>
                          )}
                          {isLoadingBooking ? 'Processing..' : 'Reserve'}
                        </button>
                        {isVenueOwnedByUser && (
                          <span
                            className={'rounded py-2 px-4 font-semibold text-sm text-red-800 border border-red-700'}
                          >
                            You can not reserve your own venue
                          </span>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <div ref={bookingErrorRef}>
                  {isFormError && <div className={'api-error my-8 w-full lg:w-2/4 lg:pl-6 lg:ml-auto'}>{errorMsg}</div>}
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
