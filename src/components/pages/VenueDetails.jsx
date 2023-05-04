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

    if (auth) {
      const body = {
        dateFrom: startDate.toISOString(),
        dateTo: endDate.toISOString(),
        guests: guests,
        venueId: venueId,
      };

      fetchBooking(CREATE_BOOKING, 'POST', auth.accessToken, body);
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
      navigate('/profile');
    }
  }, [created, navigate]);

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
                  <div className={'h-72 sm:h-96 md:h-[28rem] lg:h-auto lg:basis-1/2'}>
                    <img
                      className={'rounded-xl object-cover h-full w-full'}
                      src={media && media[0]}
                      alt={name}
                      onError={handleImgError}
                    />
                  </div>
                  <div
                    className={'relative rounded-xl py-6 border border-gray-100 shadow-sm shadow-gray-100 lg:basis-1/2'}
                  >
                    <div
                      className={`left-0 px-6 bg-white lg:absolute ${
                        showMoreDesc && 'z-20 rounded-xl venue-desc-shadow'
                      }`}
                    >
                      <div className={`border-b border-b-zinc-100 pb-3`}>
                        <h2
                          onClick={() => description && description.length > 120 && setShowMoreDesc(!showMoreDesc)}
                          className={'mb-1 text-base font-semibold'}
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
                            onClick={() => setShowMoreDesc(!showMoreDesc)}
                            className={
                              'underline-offset-4 text-sm font-light bottom-[18px] right-[32px] bg-white lg:absolute hover:underline'
                            }
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
                      <h3 className={'text-lg mt-2 pb-2 border-b border-b-zinc-100'}>
                        <span className={'font-bold'}>{price} kr NOK</span> a night
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
                              className={'text-center h-10 font-semibold'}
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
                      <button
                        type={'submit'}
                        className={`relative bg-rose-800 text-white rounded h-10 w-full sm:w-40 hover:bg-rose-700 ease-out duration-200`}
                      >
                        {isLoadingBooking && (
                          <span
                            className={
                              'loader absolute top-2 left-6 h-6 w-6 sm:left-3 sm:h-4 sm:w-4 sm:border-2 sm:top-3'
                            }
                          ></span>
                        )}
                        {isLoadingBooking ? 'Processing..' : 'Reserve'}
                      </button>
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
