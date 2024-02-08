import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className="search-bar">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <button type="submit" className=" search-form-button">
            <FaSearch />
            <span className="search-form-button-label">Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className="input search-form-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
