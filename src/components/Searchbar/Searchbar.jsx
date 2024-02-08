import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <header className="search-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <button type="submit" className=" search-form-button">
          <FaSearch />
          <span className="search-form-button-label">Search</span>
        </button>

        <input
          onChange={handleChange}
          className="input search-form-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
      </form>
    </header>
  );
};
