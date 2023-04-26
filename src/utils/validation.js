import placeHolderImg from '../assets/placeholder-image.svg';

function handleImgError(e) {
  e.target.src = placeHolderImg;
}

export { handleImgError };
