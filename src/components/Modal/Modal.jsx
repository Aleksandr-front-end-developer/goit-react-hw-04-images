import { useEffect } from 'react';

export const Modal = ({ closeModal, image }) => {
  useEffect(() => {
    const handlePressESC = e => {
      if (e.code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handlePressESC);

    return () => {
      window.removeEventListener('keydown', handlePressESC);
    };
  }, [handlePressESC]);

  const handleClose = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div onClick={handleClose} className="overlay">
      <div className="modal">
        <img src={image} alt="" />
      </div>
    </div>
  );
};
