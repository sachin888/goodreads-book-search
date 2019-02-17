import axios from 'axios';

import {API_SETTINGS_CONFIG, GOODREADS_API_KEY} from './Config';


export const getAllBooks = (searchText) => axios.get(
    `https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/search/index.xml?key=${GOODREADS_API_KEY}&q=${searchText}`,
      API_SETTINGS_CONFIG
)

export const getBookDetails = (bookId) => axios.get(
    `https://cors-anywhere.herokuapp.com/` +
      `https://www.goodreads.com/book/show/${bookId}?key=${GOODREADS_API_KEY}`
) 

