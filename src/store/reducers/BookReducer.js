import {SET_FETCHING_BOOK_SEARCH_RESULT, SET_BOOK_SEARCH_RESULT, SET_BOOK_SEARCH_ERROR, 
    SET_FETCHING_BOOK_DETAIL, SET_BOOK_DETAIL, SET_BOOK_DETAIL_ERROR} from '../actions/BookSearchAction';

export const defaultState ={
    fetchingSearchResult:null,
    bookResults : [],
    bookSearchError : null,
    fetchingBookDetails : null,
    bookDetail : null,
    bookDetailError : null
}

export const bookReducer = (state = defaultState, action) =>{
    if(!action)
        return state;
    
    switch(action.type){
        case SET_FETCHING_BOOK_SEARCH_RESULT :
            return{
                ...state,
                fetchingSearchResult : action.data
            };
        case SET_BOOK_SEARCH_RESULT :
            return{
                ...state,
                bookResults : [...action.data]
            };
        case SET_BOOK_SEARCH_ERROR :
            return{
                ...state,
                bookSearchError : action.data
            };
        case SET_FETCHING_BOOK_DETAIL :
            return{
                ...state,
                fetchingBookDetails : action.data
            };
        case SET_BOOK_DETAIL :
            return{
                ...state,
                bookDetail : action.data
            };
        case SET_BOOK_DETAIL_ERROR :
            return{
                ...state,
                bookDetailError : action.data
            };
        default:
            return state;
    }
}