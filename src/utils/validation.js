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

  media: yup
    .string()
    .trim()
    .required('Image URL is a required field')
    .matches(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/, 'Image URL is not valid'),
});

export { handleImgError, scrollToMessage, filterVenuesWithProperties, createAndEditSchema };
