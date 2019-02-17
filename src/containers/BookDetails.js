import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Loader from '../components/Loader';

class BookDetails extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let {result} = this.props;

        return(
            <div className="container-fluid">
                <div className="header">
                    <h3>
                         Book Detail
                    </h3>
                </div>
                <div className="jumbotron">
                {
                    result.fetchingBookDetails ? 
                        <Loader />
                        :
                        (
                            result.bookDetailError ?
                            <div>
                                <p className="text-danger">{result.bookDetailError }</p>
                                <Link to="/" className="badge badge-info">Back to Search</Link>
                            </div>
                            : result.bookDetail && (
                                <div className="row col-lg-12">
                                    <h3 className="col-lg-12 mb-3 mt-3">
                                        {result.bookDetail.title}
                                    </h3>
                                    <div className="">
                                        <img
                                            src={result.bookDetail.imgUrl}
                                            height="250px"
                                            width="250px"
                                            alt="book cover"/>
                                        <br/>
                                        <br/>
                                        <p>
                                            By:{" "}     
                                            <span className="font-weight-bold">
                                                {result.bookDetail.authorName}
                                            </span>
                                        </p>
                                        <p>Avg. Rating: {result.bookDetail.avgRating}</p>
                                    </div>
                                    <div>
                                        <div>
                                            <div className="">
                                                <p dangerouslySetInnerHTML={{ __html: result.bookDetail.description}} />
                                            </div>
                                            <div>
                                                {
                                                    result.bookDetail.publishDate.length > 7 && 
                                                    <p>
                                                        Published Date:{" "}
                                                        {new Date(result.bookDetail.publishDate).toDateString()}
                                                    </p>
                                                }
                                                
                                            </div>
                                            <Link to="/" className="badge badge-info">Back to Search</Link>
                                        </div>
                                    </div>  
                                </div>
                            )
                        )
                }
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

export default connect(mapStateToProps)(BookDetails);