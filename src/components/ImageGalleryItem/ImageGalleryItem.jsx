export const ImageGalleryItem = ({
  openModal,
  largeImageURL,
  webformatURL,
}) => {
  const handleClick = () => {
    openModal(largeImageURL);
  };

  return (
    <li onClick={handleClick} className="image-gallery-item">
      <img className="image-gallery-item-image" src={webformatURL} alt="" />
    </li>
  );
};
