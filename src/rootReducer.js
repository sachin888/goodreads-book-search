import {combineReducers} from 'redux';
import {bookReducer} from './store/reducers/BookReducer';

export default combineReducers({
    bookReducer: bookReducer
});