import { useState, useEffect, useRef } from 'react';

import './style.scss';

import * as API from '../services/pixabay';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    if (!searchText) return;

    getImages(searchText, `${page}`);
  }, [searchText, page]);

  const getImages = (query, page) => {
    setIsLoading(true);
    API.getImages(query, page)
      .then(responce => {
        if (responce.ok) {
          return responce.json();
        } else {
          throw new Error('Щось пішло не так :-( спробуйте ще раз!');
        }
      })
      .then(data => {
        const newImages = data.hits.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })
        );
        setImages(prevImages => [...prevImages, ...newImages]);
        setIsLoading(false);
        setError('');
      })
      .catch(error => {
        console.log(error.message);
        setError(error.message);
      });
  };

  const handleSearch = value => {
    if (searchText !== value) {
      setSearchText(value);
      setPage(1);
      setImages([]);
    }
  };
  const addImages = () => {
    setPage(prev => prev + 1);
  };

  const openModal = srcImage => {
    setModal(true);
    setModalImage(srcImage);
  };
  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className="app">
        <Searchbar onSubmit={handleSearch} />
        {error && <p>{error}</p>}
        {Boolean(images.length) && (
          <ImageGallery images={images} openModal={openModal} />
        )}
        {isLoading && !error && <Loader />}
        {Boolean(images.length) && !isLoading && <Button onClick={addImages} />}
      </div>
      {modal && <Modal image={modalImage} closeModal={closeModal} />}
    </>
  );
};
