import { Component } from 'react';

export class ImageGalleryItem extends Component {
  handleClick = () => {
    this.props.openModal(this.props.largeImageURL);
  };

  render() {
    return (
      <li onClick={this.handleClick} className="image-gallery-item">
        <img
          className="image-gallery-item-image"
          src={this.props.webformatURL}
          alt=""
        />
      </li>
    );
  }
}

// {
//   webformatURL,
//   largeImageURL,
//   openModal,
// }) =>
