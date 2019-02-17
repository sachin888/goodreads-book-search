import React from "react";
import SearchResult from "./SearchResult";
import PropTypes from "prop-types";


const books = ({books, click}) => {
    return (
        <div className="row">
            {
                books.map( book => (
                    <SearchResult 
                        bookData = {book} 
                        key = {book.id}
                        clickHandler = {click} />
                ))
            }
        </div>
    )
}

books.propTypes = {
    books: PropTypes.array,
    click: PropTypes.func
};
  
export default books;