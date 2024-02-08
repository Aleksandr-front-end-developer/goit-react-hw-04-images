const URL = 'https://pixabay.com/api/';
const API_KEY = '8266158-4a1697a03b4440b2b1b0a0b25';

export const getImages = (query, page) => {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
