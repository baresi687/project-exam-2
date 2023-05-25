import placeHolderImg from '../assets/placeholder-image.svg';
import * as yup from 'yup';

function handleImgError(e) {
  e.target.src = placeHolderImg;
}

function scrollToMessage(elemRef) {
  elemRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

const filterVenuesWithProperties = (venues) =>
  venues.filter(
    (venue) => venue.media.length && venue.name && venue.description && venue.price > 0 && venue.maxGuests > 0
  );

const createAndEditSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name of venue is a required field')
    .max(90, 'Name of venue can not exceed 90 characters'),

  description: yup
    .string()
    .trim()
    .required('Description is a required field')
    .max(450, 'Description can not exceed 450 characters'),

  location: yup.object({ address: yup.string().required() }).required().nullable().default(null),

  price: yup
    .number()
    .typeError('Price must be a number')
    .min(1, 'Price must be at least 1')
    .max(50000, 'Price can not exceed 50.000 kr NOK'),

  maxGuests: yup
    .number()
    .typeError('Max guests must be a number')
    .min(1, 'Max guests must be at least 1')
    .max(100, 'Max guests can not exceed 100'),

  media: yup.array().min(1, 'Image URL must have at least one image'),
});

export { handleImgError, scrollToMessage, filterVenuesWithProperties, createAndEditSchema };
