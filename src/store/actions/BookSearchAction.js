import React from 'react';
import {getAllBooks, getBookDetails} from '../../api/Api';

export const SET_FETCHING_BOOK_SEARCH_RESULT = "SET_FETCHING_BOOK_SEARCH_RESULT";
export const SET_BOOK_SEARCH_RESULT = "SET_BOOK_SEARCH_RESULT";
export const SET_BOOK_SEARCH_ERROR = "SET_BOOK_SEARCH_ERROR";

export const SET_FETCHING_BOOK_DETAIL = "SET_FETCHING_BOOK_DETAIL";
export const SET_BOOK_DETAIL = "SET_BOOK_DETAIL";
export const SET_BOOK_DETAIL_ERROR = "SET_BOOK_DETAIL_ERROR";

const setFetchingSearchResultAction = (data) =>{
    return{
        type: SET_FETCHING_BOOK_SEARCH_RESULT,
        data
    }
} 

const setBookSearchResultAction = (data) =>{
    return{
        type: SET_BOOK_SEARCH_RESULT,
        data
    }
} 

const setBookSearchErrorAction = (data) =>{
    return{
        type: SET_BOOK_SEARCH_ERROR,
        data
    }
}

const setFetchingBookDetailAction = (data) =>{
    return{
        type: SET_FETCHING_BOOK_DETAIL,
        data
    }
} 

const setBookDetailAction = (data) =>{
    return{
        type: SET_BOOK_DETAIL,
        data
    }
} 

const setBookDetailErrorAction = (data) =>{
    return{
        type: SET_BOOK_DETAIL_ERROR,
        data
    }
}


export const getBookSearchResult = (text) =>{
    return dispatch => {
        let resultPromise = getAllBooks(text);
        
        resultPromise.then(response => {
            const parser = new DOMParser();
            const xmlResponse = parser.parseFromString(response.data, "application/xml");
            const error = xmlResponse.getElementsByTagName("parsererror");
            if(error.length)
            {
                dispatch(setBookSearchErrorAction('Error in fetching search results'));
            }else{
                dispatch(setBookSearchErrorAction(null));
                const results = new Array(...xmlResponse.getElementsByTagName("work"));
                const books = results.map(result => XMLToJSON(result));
                dispatch(setBookSearchResultAction(books));
                dispatch(setFetchingBookSearchResult(false));
            }
        })
        .catch(error =>{
            dispatch(setFetchingBookSearchResult(false));
            dispatch(setBookSearchErrorAction('Error in fetching search results'));
        });
    }
}

export const setFetchingBookSearchResult = (flag) =>{
    return dispatch => {
        dispatch(setFetchingSearchResultAction(flag));
    }
}

export const getBookDetailsResult = (bookId) =>{
    return dispatch => {
        let resultPromise = getBookDetails(bookId);
        resultPromise
            .then(response => {
                const parser = new DOMParser();
                const xmlResponse = parser.parseFromString(response.data, "application/xml");
                const error = xmlResponse.getElementsByTagName("parsererror");
                
                if(error.length){
                    dispatch(setFetchingBookDetails(false));
                    dispatch(setBookDetailErrorAction('Error in fetching book details'));
                }else{
                    dispatch(setBookDetailErrorAction(null));
                    let description = xmlResponse.getElementsByTagName("description")[0].innerHTML
                    description = description.replace("<![CDATA[", "").replace("]]>", "");
                    let authorName = xmlResponse.getElementsByTagName("author")[0].getElementsByTagName("name")[0].innerHTML;
                    let imgUrl = xmlResponse.getElementsByTagName("image_url")[0].innerHTML;
                    let title = xmlResponse.getElementsByTagName("title")[0].innerHTML;
                    title = title.replace("<![CDATA[", "").replace("]]>", "");
                    let date = xmlResponse.getElementsByTagName("original_publication_day")[0].innerHTML + '/' + xmlResponse.getElementsByTagName("original_publication_month")[0].innerHTML + '/' + xmlResponse.getElementsByTagName("original_publication_year")[0].innerHTML;
                    let avgRating = xmlResponse.getElementsByTagName("average_rating")[0].innerHTML;

                    if(!description){
                        dispatch(setFetchingBookDetails(false));
                        dispatch(setBookDetailErrorAction('Error in fetching book details'));
                    }
                    let details = {
                        title : title,
                        description : description,
                        authorName : authorName,
                        imgUrl : imgUrl,
                        publishDate : date,
                        avgRating : avgRating
                    }
                    dispatch(setFetchingBookDetails(false));
                    dispatch(setBookDetailAction(details));
                }
            })
            .catch(err => {
                dispatch(setFetchingBookDetails(false));
                dispatch(setBookDetailErrorAction('Error in fetching book details'));
            });
    }
}


export const setFetchingBookDetails = (flag) =>{
    return dispatch => {
        dispatch(setFetchingBookDetailAction(flag));
    }
}

const XMLToJSON = (xml) =>{
    const nodes = new Array(...xml.children);
    const json = {};
    nodes.forEach(node => {
        if(node.children.length){
            json[node.nodeName] = XMLToJSON(node);
        }else{
            json[node.nodeName] = node.innerHTML;
        }
    });

    return json;
}


