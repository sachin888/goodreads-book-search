import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Books from '../components/Books';
import Loader from '../components/Loader';
import {getBookSearchResult, setFetchingBookSearchResult, getBookDetailsResult, setFetchingBookDetails} from '../store/actions/BookSearchAction';

class BookSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText: ""
        }; 
    }

    onTextChange = (e) => {
        this.setState({
            searchText : e.target.value 
        });
    }

    onButtonClick = (e) => {
        if(!this.state.searchText)
            return;
        this.props.setFetchingBookSearchResult(true);
        this.props.getBookSearchResult(this.state.searchText);
    }

    onBookDetailsClick = (e, bookId) => {
        this.props.setFetchingBookDetails(true);
        this.props.getBookDetailsResult(bookId);
    }

    render(){
        let {result} = this.props;
        if(result.fetchingBookDetails)
            return <Redirect to='/bookdetail' />

        return(
            <div className="container-fluid">
                <div className="header">
                    <h3>
                    {
                        this.state.bookDetail ? "Book Detail" : "Book Search"
                    }
                    </h3>
                </div>
                <div className="jumbotron">
                    <div>
                        <div className="form-group row">
                            <input
                                className="mr-5 col-sm-8 form-control form-control-lg"
                                type="text"
                                placeholder="Search books by title..."
                                name="searchByText"
                                onChange={this.onTextChange}
                                value={this.state.searchText}></input>
                            <button 
                                className="col-sm-2 btn btn-primary"
                                onClick={this.onButtonClick}>
                                    Search
                            </button>
                        </div>
                        {
                            result.fetchingSearchResult !== null && 
                            (
                                result.fetchingSearchResult ?
                                <Loader/>
                                :
                                (
                                    result.bookSearchError ? 
                                        (
                                            <p className="text-danger">{result.bookSearchError}</p>
                                        ):
                                        (
                                            result.bookResults.length > 0 &&
                                            <Books
                                                books = {result.bookResults}
                                                click = {this.onBookDetailsClick}/>
                                        )
                                )
                            ) 
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = state =>{
    return{
        result: state.bookReducer
    }
};

export const mapDispatchToProps = dispatch => bindActionCreators({getBookSearchResult, setFetchingBookSearchResult,
    getBookDetailsResult, setFetchingBookDetails}, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(BookSearch);