import { Component } from 'react';

import './style.scss';

import * as API from '../services/pixabay';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: '',
    searchText: '',
    page: 1,
    modal: false,
    modalImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchText !== this.state.searchText) {
      this.setState({ images: [], page: 1 });
      this.getImages(this.state.searchText, '1');
    }
    if (prevState.page < this.state.page) {
      this.getImages(this.state.searchText, `${this.state.page}`);
    }
  }
  getImages = (query, page) => {
    this.setState({ isLoading: true });
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
        this.setState(prev => ({
          images: [...prev.images, ...newImages],
          isLoading: false,
          error: '',
        }));
      })
      .catch(error => {
        console.log(error.message);
        this.setState({
          error: error.message,
        });
      });
  };

  handleSearch = value => {
    this.setState({
      searchText: value,
    });
  };
  addImages = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  openModal = srcImage => {
    this.setState({
      modal: true,
      modalImage: srcImage,
    });
  };
  closeModal = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    return (
      <>
        <div className="app">
          <Searchbar onSubmit={this.handleSearch} />
          {this.state.error && <p>{this.state.error}</p>}
          {Boolean(this.state.images.length) && (
            <ImageGallery
              images={this.state.images}
              openModal={this.openModal}
            />
          )}
          {this.state.isLoading && !this.state.error && <Loader />}
          {Boolean(this.state.images.length) && !this.state.isLoading && (
            <Button onClick={this.addImages} />
          )}
        </div>
        {this.state.modal && (
          <Modal image={this.state.modalImage} closeModal={this.closeModal} />
        )}
      </>
    );
  }
}
