import { Link } from 'react-router-dom';
import { handleImgError } from '../utils/validation.js';

function VenueListItem({ id, name, media, maxGuests, price }) {
  return (
    <Link key={id} to={`/venues/venue-details/${id}`} className={'group'}>
      <img
        className={'rounded-xl object-cover h-72 w-full md:h-64'}
        src={media[0]}
        alt={name}
        onError={handleImgError}
      />
      <div className={'flex flex-col gap-2 mt-4'}>
        <h3 className={'text-lg font-bold capitalize whitespace-nowrap overflow-hidden text-ellipsis'}>{name}</h3>
        <p>
          Up to <span className={'font-bold'}>{maxGuests}</span> guests
        </p>
        <p className={'font-bold'}>
          {price} kr NOK <span className={'font-normal'}>a night</span>
        </p>
      </div>
      <button
        className={'bg-rose-800 text-white rounded h-10 w-full mt-4 group-hover:bg-rose-700 ease-out duration-200'}
      >
        View details
      </button>
    </Link>
  );
}

export default VenueListItem;
