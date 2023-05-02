import placeHolderImg from '../assets/placeholder-image.svg';

function handleImgError(e) {
  e.target.src = placeHolderImg;
}

function scrollToMessage(elemRef) {
  elemRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

export { handleImgError, scrollToMessage };
