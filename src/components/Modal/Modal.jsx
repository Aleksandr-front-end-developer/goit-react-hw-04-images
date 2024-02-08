import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }
  handlePressESC = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  handleClose = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div onClick={this.handleClose} className="overlay">
        <div className="modal">
          <img src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}
