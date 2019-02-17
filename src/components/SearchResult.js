import React from "react";
import PropTypes from "prop-types";

const SearchResult = ({ bookData, clickHandler }) => {
    const bookTitle = bookData.best_book.title;
    let displayTitle = bookTitle.split(" ").slice(0, 4).join(" ");
    
    if (bookTitle.length > displayTitle.length) {
        displayTitle += "...";
    }

  return (
    <div className="col-lg-2 col-sm-4 col-md-3">
      <div className="card" style={{"width": "12rem", "height":"450px", "margin-bottom": "10px"}}>
        <div style={{"height":"50%"}}>
            <img
                className="card-img-top"
                src={bookData.best_book.image_url}
                alt="Book cover"
                style={{maxHeight:"100%"}}
                />
        </div>
        
        <div className="card-body">
            <p
                className="text-sm-left card-title font-weight-bold"
                data-toggle="tooltip"
                data-placement="bottom"
                title={bookTitle}>
                {bookTitle}
            </p>
            <p className="text-sm-left card-text">
                {bookData.best_book.author.name}
            </p>
            <p style={{"cursor":"pointer", "color":"blue"}} onClick={(e) => clickHandler(e, bookData.best_book.id)}>
                More Details
            </p>
        </div>
      </div>
    </div>
  );
};

SearchResult.propTypes = {
    bookData: PropTypes.object,
    clickHandler: PropTypes.func
};

export default SearchResult;
